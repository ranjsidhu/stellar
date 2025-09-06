// __tests__/createPlaceholder.test.js
const fs = require("fs");
const sharp = require("sharp");

beforeEach(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

jest.mock("fs");
jest.mock("sharp");

const { createPlaceholders } = require("../createPlaceholders");

describe("createPlaceholders", () => {
  const sourceDir = "public/images";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should process images and skip placeholders and existing ones", async () => {
    // Mock directory listing with some images and placeholders
    fs.readdirSync.mockReturnValue([
      "image1.jpg",
      "image2.png",
      "image1-placeholder.jpg",
      "not-an-image.txt",
    ]);

    // For each file, simulate placeholder already existing for image2.png
    fs.existsSync.mockImplementation((filePath) => {
      return filePath.endsWith("image2-placeholder.png");
    });

    // Setup sharp mocks
    const metadataMock = { width: 100, height: 50 };

    const resizeMock = jest.fn(() => chain);
    const blurMock = jest.fn(() => chain);
    const jpegMock = jest.fn(() => chain);
    const toFileMock = jest.fn(() => Promise.resolve());

    const chain = {
      resize: resizeMock,
      blur: blurMock,
      jpeg: jpegMock,
      toFile: toFileMock,
      metadata: jest.fn(() => Promise.resolve(metadataMock)),
    };

    sharp.mockImplementation(() => chain);

    await createPlaceholders();

    // Check readdirSync called
    expect(fs.readdirSync).toHaveBeenCalledWith(sourceDir);

    // It should skip 'image1-placeholder.jpg' and 'not-an-image.txt'
    // It should skip 'image2.png' because placeholder exists
    // Only 'image1.jpg' should be processed

    // sharp should be called twice for image1.jpg: metadata and processing
    expect(sharp).toHaveBeenCalledTimes(2); // 1 for metadata, 2 for processing (see below)

    // toFile should be called once (for image1.jpg placeholder)
    expect(toFileMock).toHaveBeenCalledTimes(1);

    // Check resize and blur chain called correctly
    expect(resizeMock).toHaveBeenCalledWith(20, expect.any(Number));
    expect(blurMock).toHaveBeenCalledWith(3);
    expect(resizeMock).toHaveBeenCalledWith(
      metadataMock.width,
      metadataMock.height
    );
    expect(jpegMock).toHaveBeenCalledWith({ quality: 60 });
  });

  it("should catch and log errors", async () => {
    console.error = jest.fn();

    fs.readdirSync.mockImplementation(() => {
      throw new Error("fail");
    });

    await createPlaceholders();

    expect(console.error).toHaveBeenCalledWith(
      "Error creating placeholders:",
      expect.any(Error)
    );
  });
});
