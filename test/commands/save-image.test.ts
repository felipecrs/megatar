import { expect, test } from "@oclif/test";
import * as execa from "execa";

describe("save-image", () => {
  test
    .stdout()
    .stderr()
    .command(["save-image", "hello-world"])
    .it("saves hello-world image", (ctx) => {
      expect(ctx.stderr).to.contain(
        "Saving 'hello-world:latest' and compressing to 'hello-world-latest.tgz'... done"
      );
      expect(
        execa.commandSync("docker load -i hello-world-latest.tgz").stdout
      ).to.contain("Loaded image: hello-world:latest");
    });

  test
    .stdout()
    .stderr()
    .command(["save-image", "hello-world:123456"])
    .exit(1)
    .catch((error) =>
      expect(error.message).to.contain(
        "Command failed with exit code 1: docker pull hello-world:123456"
      )
    )
    .it("fails with a unexisting image");
});
