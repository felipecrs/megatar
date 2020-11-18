import { getBinPathSync } from "get-bin-path";
import * as execa from "execa";
import * as shell from "shelljs";
import * as tmp from "tmp";

const bin = getBinPathSync();

const runBinary = async (args: string) =>
  execa.command(`${bin} ${args}`, {
    reject: false,
  });

beforeAll(() => {
  process.env = Object.assign(process.env, { FORCE_COLOR: 0 });
});

describe("save-image", () => {
  let dir: tmp.DirResult;

  beforeEach(async () => {
    dir = tmp.dirSync({ unsafeCleanup: true });
    shell.cd(dir.name);
  });

  afterEach(async () => {
    dir.removeCallback();
  });

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

  it("saves an image with a different tag", async () => {
    const image = "hello-world";
    const newTag = "test";

    const result = await execa.command(
      `${bin} save-image ${image} --new-tag ${newTag}`
    );
    expect(result.stdout).toContain(
      `saving ${image}:${newTag} and compressing to ${image}-${newTag}.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = await execa.command(
      `docker load -i ${image}-${newTag}.tgz`
    );
    expect(loadResult.stdout).toContain(`Loaded image: ${image}:${newTag}`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("saves an image not discarding repository", async () => {
    const image = "docker.io/library/hello-world";

    const result = await execa.command(
      `${bin} save-image ${image} --no-discard-repository`
    );
    expect(result.stdout).not.toContain(`tagging with`);
    expect(result.stdout).toContain(
      `saving ${image}:latest and compressing to hello-world-latest.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = await execa.command(
      `docker load -i hello-world-latest.tgz`
    );
    expect(loadResult.stdout).toContain(`Loaded image: hello-world:latest`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("fails when saving an unexisting image", async () => {
    const image = "hello-world:123456";

    const result = await runBinary(`save-image ${image}`);

    expect(result.stdout).toContain(
      `Error response from daemon: manifest for ${image} not found: manifest unknown: manifest unknown`
    );
    expect(result.exitCode).toBe(1);
  });
});