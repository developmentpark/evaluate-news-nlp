import { isFormatUrlValid } from "./checker";

describe("isFormatUrlValid function", () => {
  it('should return true for a valid URL with "http://"', () => {
    const validUrl = "http://example.com";
    const result = isFormatUrlValid(validUrl);
    expect(result).toBe(true);
  });

  it('should return true for a valid URL with "https://"', () => {
    const validUrl = "https://example.com";
    const result = isFormatUrlValid(validUrl);
    expect(result).toBe(true);
  });

  it("should return false for an invalid URL", () => {
    const invalidUrl = "ftp://example.com";
    const result = isFormatUrlValid(invalidUrl);
    expect(result).toBe(false);
  });

  it("should return false for an empty URL", () => {
    const emptyUrl = "";
    const result = isFormatUrlValid(emptyUrl);
    expect(result).toBe(false);
  });

  it("should return false for a URL without a protocol", () => {
    const urlWithoutProtocol = "example.com";
    const result = isFormatUrlValid(urlWithoutProtocol);
    expect(result).toBe(false);
  });
});
