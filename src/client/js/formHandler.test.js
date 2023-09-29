import { handleSubmit } from "./formHandler";
import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderError, renderResults } from "./render";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

jest.mock("../utils/domReader");
jest.mock("../utils/checker");
jest.mock("./fetchService");
jest.mock("./render");

describe("handleSubmit function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call renderError if is invalid URL", () => {
    getEl.mockReturnValue({ value: "invalid_url" });
    isFormatUrlValid.mockReturnValue(false);
    handleSubmit({ preventDefault: jest.fn() });
    expect(renderError).toHaveBeenCalled();
  });

  test("should call postData if is valid URL", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValue(data);
    await handleSubmit({ preventDefault: jest.fn() });
    expect(postData).toHaveBeenCalled();
  });

  test("should call renderResults if postData resolves", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValueOnce({ json: () => data });
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    expect(renderResults).toHaveBeenCalled();
  });

  test("should call renderError if postData rejects", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockImplementation(() => Promise.reject(new Error()));
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderError).toHaveBeenCalledTimes(1);
  });

  test("should call postData with localhost and received url", () => {
    const validUrl = "valid_url";
    getEl.mockReturnValue({ value: validUrl });
    isFormatUrlValid.mockReturnValue(true);
    handleSubmit({ preventDefault: jest.fn() });
    expect(postData).toHaveBeenCalledWith(process.env.API_URL, {
      url: validUrl,
    });
  });

  test("should call renderResult with received data from postData", async () => {
    const validUrl = "valid_url";
    getEl.mockReturnValue({ value: validUrl });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValue({ json: () => data });
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    expect(renderResults).toHaveBeenCalledWith(data);
  });

  test("should Validate url received", async () => {
    const url = "url";
    getEl.mockReturnValue({ value: url });
    handleSubmit({ preventDefault: jest.fn() });
    expect(isFormatUrlValid).toHaveBeenCalledWith(url);
  });
});
