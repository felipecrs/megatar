import { Command, flags } from "@oclif/command";
import * as execa from "execa";
import * as yaml from "js-yaml";
import * as _ from "lodash";
import { JSONPath } from "jsonpath-plus";
import Image from "../../model/image";

export default class SaveImage extends Command {
  static description = "list the docker images found in a helm chart";

  static examples = ["$ megatar chart list-images jenkins/jenkins"];

  static flags = {
    help: flags.help({ char: "h" }),
  };

  static args = [
    {
      name: "charts",
      required: true,
      description: "the charts to find the images from",
    },
  ];

  static strict = false;

  async run(): Promise<void> {
    const { argv: charts } = this.parse(SaveImage);

    const templates: string[] = [];

    for (const chart of charts) {
      templates.push(
        ...(await execa.command(`helm template ${chart}`)).stdout.split("---")
      );
    }

    const imagesString: string[] = [];

    for (const item of templates) {
      const template = yaml.load(item);
      if (template && typeof template === "object") {
        const result: string[] = JSONPath({
          path: "$..image",
          json: template,
        });
        imagesString.push(...result);
      }
    }

    const images = _.sortedUniq(imagesString.sort()).map((item) =>
      Image.inferFromString(item)
    );

    this.log(images.join("\n"));
  }
}
