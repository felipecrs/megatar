import { expect, test } from "@oclif/test";
import * as execa from "execa";

describe("save-image", () => {
  test
    .stdout()
    .command(["save-image", "hello-world"])
    .it("saves hello-world image", (ctx) => {
      expect(ctx.stdout).to.contain(
        "saving 'hello-world:latest' and compressing to 'hello-world-latest.tgz'"
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
    .it("fails with a unexisting image", (ctx) => {
      expect(ctx.stdout).to.contain('Error response from daemon: manifest for hello-world:123456 not found: manifest unknown: manifest unknown')
    });
});
