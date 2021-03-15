import * as execa from "execa";
import * as shell from "shelljs";
import * as tmp from "tmp";
import { runCommand } from "./utils";

const command = "save-image";

beforeAll(() => {
  process.env = Object.assign(process.env, { FORCE_COLOR: 0 });
});

describe(command, () => {
  let dir: tmp.DirResult;

  beforeEach(() => {
    dir = tmp.dirSync({ unsafeCleanup: true });
    shell.cd(dir.name);
  });

  afterEach(() => {
    dir.removeCallback();
    shell.cd("-");
  });

  it("saves an image without tag", () => {
    const image = "hello-world";

    const result = runCommand(`${command} ${image}`);
    expect(result.stdout).toContain(
      `saving ${image}:latest and compressing to ${image}-latest.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = execa.commandSync(`docker load -i ${image}-latest.tgz`);
    expect(loadResult.stdout).toContain(`Loaded image: ${image}:latest`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("saves an image with a different tag", () => {
    const image = "hello-world";
    const newTag = "test";

    const result = runCommand(`${command} ${image} --new-tag ${newTag}`);
    expect(result.stdout).toContain(
      `saving ${image}:${newTag} and compressing to ${image}-${newTag}.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = execa.commandSync(
      `docker load -i ${image}-${newTag}.tgz`
    );
    expect(loadResult.stdout).toContain(`Loaded image: ${image}:${newTag}`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("saves an image not discarding repository", () => {
    const image = "docker.io/library/hello-world";

    const result = runCommand(`${command} ${image} --no-discard-repository`);
    expect(result.stdout).not.toContain(`tagging with`);
    expect(result.stdout).toContain(
      `saving ${image}:latest and compressing to hello-world-latest.tgz`
    );
    expect(result.exitCode).toBe(0);

    const loadResult = execa.commandSync(
      `docker load -i hello-world-latest.tgz`
    );
    expect(loadResult.stdout).toContain(`Loaded image: hello-world:latest`);
    expect(loadResult.exitCode).toBe(0);
  });

  it("fails when saving an unexisting image", () => {
    const image = "hello-world:123456";

    const result = runCommand(`${command} ${image}`, { reject: false });

    expect(result.stdout).toContain(
      `Error response from daemon: manifest for ${image} not found: manifest unknown: manifest unknown`
    );
    expect(result.exitCode).toBe(1);
  });
});
