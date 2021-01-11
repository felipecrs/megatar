import { getBinPathSync } from "get-bin-path";
import * as execa from "execa";
import { stripIndent } from "common-tags";

const bin = getBinPathSync();
const command = "chart:list-images";
const runCommand = async (line: string, options?: execa.Options) =>
  await execa.command(`${bin} ${command} ${line}`, {
    ...options,
    reject: false,
  });

beforeAll(async () => {
  await execa.command("helm repo add jenkins https://charts.jenkins.io");
  await execa.command("helm repo update");
});

describe(command, () => {
  it("lists the images of a chart", async () => {
    const result = await runCommand("jenkins/jenkins");
    expect(result.stdout).toBe(stripIndent`
      bats/bats:1.2.1
      jenkins/jenkins:2.263.1
      kiwigrid/k8s-sidecar:0.1.275
      `);
    expect(result.exitCode).toBe(0);
  });
});
