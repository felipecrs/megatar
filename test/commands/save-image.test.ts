import { expect, test } from "@oclif/test";
import * as execa from "execa";

describe("save-image", () => {
  const imageWithoutTag = "hello-world";
  test
    .stdout()
    .command(["save-image", imageWithoutTag])
    .it("saves an image without tag", (ctx) => {
      expect(ctx.stdout).to.contain(
        `saving ${imageWithoutTag}:latest and compressing to ${imageWithoutTag}-latest.tgz`
      );
      expect(
        execa.commandSync(`docker load -i ${imageWithoutTag}-latest.tgz`).stdout
      ).to.contain(`Loaded image: ${imageWithoutTag}:latest`);
    });

  const unexistingImage = "hello-world:123456";
  test
    .stdout()
    .stderr()
    .command(["save-image", unexistingImage])
    .exit(1)
    .it("fails when saving an unexisting image", (ctx) => {
      expect(ctx.stdout).to.contain(
        `Error response from daemon: manifest for ${unexistingImage} not found: manifest unknown: manifest unknown`
      );
    });
});
