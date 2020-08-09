import * as execa from "execa";

const bin = `${process.cwd()}/bin/run`;

describe("save-image", () => {
  it("saves an image without tag", async () => {
    const image = "hello-world";

    const result = await execa.command(`${bin} save-image ${image}`);
    expect(result.stdout).toContain(
      `saving ${image}:latest and compressing to ${image}-latest.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = await execa.command(
      `docker load -i ${image}-latest.tgz`
    );
    expect(loadResult.stdout).toContain(`Loaded image: ${image}:latest`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("fails when saving an unexisting image", async () => {
    const image = "hello-world:123456";

    const result = await execa.command(`${bin} save-image ${image}`, {
      reject: false,
    });

    expect(result.stdout).toContain(
      `Error response from daemon: manifest for ${image} not found: manifest unknown: manifest unknown`
    );
    expect(result.exitCode).toBe(1);
  });
});
