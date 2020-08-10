import * as execa from "execa";

export default class Image {
  readonly filename: string;

  constructor(
    public readonly name: string,
    public readonly tag: string,
    public readonly repository?: string
  ) {
    this.filename = `${this.name}-${this.tag}.tgz`;
  }

  static inferFromString(image: string): Image {
    const imageWithoutTag = image.split(":")[0];
    const tag = image.split(":")[1] || "latest";
    const name = imageWithoutTag.substring(
      imageWithoutTag.lastIndexOf("/") + 1
    );
    const repository =
      imageWithoutTag.substring(0, imageWithoutTag.lastIndexOf("/")) ||
      undefined;
    return new Image(name, tag, repository);
  }

  toString = (): string => {
    return `${this.repository ? `${this.repository}/` : ""}${this.name}:${
      this.tag
    }`;
  };

  pull = async (): Promise<execa.ExecaReturnValue> =>
    execa.command(`docker pull ${this}`);

  runTag = async (newImage: Image): Promise<execa.ExecaReturnValue> =>
    execa.command(`docker tag ${this} ${newImage}`);

  save = async (): Promise<execa.ExecaReturnValue> =>
    execa.command(`docker save ${this} | gzip > ${this.filename}`, {
      shell: "bash",
    });
}
