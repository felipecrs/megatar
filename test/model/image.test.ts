import Image from "../../src/model/image";

describe("Image", () => {
  it("creates an Image object from string without tag and without repository", async () => {
    const image = Image.inferFromString("hello-world");

    expect(image.name).toBe("hello-world");
    expect(image.repository).toBeUndefined();
    expect(image.tag).toBe("latest");
    expect(image.filename).toBe("hello-world-latest.tgz");
    expect(image.toString()).toBe("hello-world:latest");
  });

  it("creates an Image object from string with tag and repository", async () => {
    const image = Image.inferFromString("docker.io/library/hello-world:test");

    expect(image.name).toBe("hello-world");
    expect(image.repository).toBe("docker.io/library");
    expect(image.tag).toBe("test");
    expect(image.filename).toBe("hello-world-test.tgz");
    expect(image.toString()).toBe("docker.io/library/hello-world:test");
  });
});
