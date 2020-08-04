import { Command, flags } from "@oclif/command";
import * as execa from "execa";
import * as Listr from "listr";

export default class SaveImage extends Command {
  static description = "save a docker image to a tgz file";

  static examples = ["$ megatar save-image hello-world"];

  static flags = {
    help: flags.help({ char: "h" }),
    "new-tag": flags.string({
      char: "t",
      description: "the new tag to write in the image",
    }),
    "discard-parents": flags.boolean({
      allowNo: true,
      description:
        "whether to discard the repository and registry fields or not",
      default: true,
    }),
  };

  static args = [
    { name: "image", required: true, description: "the docker image to save" },
  ];

  async run() {
    const { args, flags } = this.parse(SaveImage);

    const imageName: string = args.image.split(":")[0];
    const imageTag: string = args.image.split(":")[1] || "latest";
    const image = `${imageName}:${imageTag}`;
    const baseImageName = imageName.split("/").reverse()[0];
    const newImageName: string = flags["discard-parents"]
      ? baseImageName
      : imageName;
    const newImageTag: string = flags["new-tag"] || imageTag;
    const newImage = `${newImageName}:${newImageTag}`;
    const newImageFile = `${baseImageName}-${newImageTag}.tgz`;

    const tasks = new Listr([
      {
        title: `pulling image \`${image}\``,
        task: () => execa.command(`docker pull ${args.image}`),
      },
      {
        title: `tagging with \`${newImage}\``,
        enabled: () => image !== newImage,
        task: () => execa.command(`docker tag ${image} ${newImage}`),
      },
      {
        title: `saving \`${newImage}\` and compressing to \`${newImageFile}\``,
        task: () =>
          execa.command(`docker save ${newImage} | gzip > ${newImageFile}`, {
            shell: "bash",
          }),
      },
    ]);

    try {
      await tasks.run();
    } catch (error) {
      this.exit(1);
    }
  }
}
