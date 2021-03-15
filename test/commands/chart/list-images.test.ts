import { stripIndent } from "common-tags";
import { runCommand } from "../utils";

const command = "chart:list-images";

describe(command, () => {
  it("lists the images of a chart", () => {
    const result = runCommand(
      `${command} https://github.com/jenkinsci/helm-charts/releases/download/jenkins-3.2.4/jenkins-3.2.4.tgz`
    );
    expect(result.stdout).toBe(stripIndent`
      bats/bats:1.2.1
      jenkins/jenkins:2.277.1
      kiwigrid/k8s-sidecar:0.1.275
      `);
    expect(result.exitCode).toBe(0);
  });

  it("lists the images of multiple charts", () => {
    const result = runCommand(
      `${command} https://github.com/jenkinsci/helm-charts/releases/download/jenkins-3.2.4/jenkins-3.2.4.tgz https://releases.rancher.com/server-charts/latest/rancher-2.5.7.tgz`
    );
    expect(result.stdout).toBe(stripIndent`
      bats/bats:1.2.1
      jenkins/jenkins:2.277.1
      kiwigrid/k8s-sidecar:0.1.275
      rancher/rancher:v2.5.7
      `);
    expect(result.exitCode).toBe(0);
  });
});
