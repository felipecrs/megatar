import { Command, flags } from "@oclif/command";
import * as Listr from "listr";
import * as chalk from "chalk";
import Image from "../model/image";

export default class SaveImage extends Command {
  static description = "save a docker image to a tgz file";

  static examples = [
    "$ megatar save-image hello-world",
    "$ megatar save-image hello-world --new-tag test",
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    "new-tag": flags.string({
      char: "t",
      description: "the new tag to write in the image",
    }),
    "discard-repository": flags.boolean({
      allowNo: true,
      description:
        "whether to discard the repository and registry fields or not",
      default: true,
    }),
  };

  static args = [
    { name: "image", required: true, description: "the docker image to save" },
  ];

  async run(): Promise<void> {
    const { args, flags } = this.parse(SaveImage);

    const originalImage = Image.inferFromString(args.image);
    const newImage = new Image(
      originalImage.name,
      flags["new-tag"] || originalImage.tag,
      flags["discard-repository"] ? undefined : originalImage.repository
    );

    const tasks = new Listr([
      {
        title: `pulling image ${chalk.blue(originalImage)}`,
        task: async () => originalImage.pull(),
      },
      {
        title: `tagging with ${chalk.blue(newImage)}`,
        enabled: () => originalImage.toString() !== newImage.toString(),
        task: async () => originalImage.runTag(newImage),
      },
      {
        title: `saving ${chalk.blue(newImage)} and compressing to ${chalk.blue(
          newImage.filename
        )}`,
        task: async () => newImage.save(),
      },
    ]);

    try {
      await tasks.run();
    } catch (error) {
      this.exit(1);
    }
  }
}
