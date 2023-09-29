import { handleSubmit } from "./formHandler";
import { getEl } from "../utils/domReader";
import { isFormatUrlValid } from "../utils/checker";
import { postData } from "./fetchService";
import { renderAlert, renderResults } from "./render";
import dotenv from "dotenv";
import { messages } from "./messages";

dotenv.config({ path: ".env.test" });

jest.mock("../utils/domReader");
jest.mock("../utils/checker");
jest.mock("./fetchService");
jest.mock("./render");

describe("handleSubmit function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call renderAlert if is invalid URL", () => {
    getEl.mockReturnValue({ value: "invalid_url" });
    isFormatUrlValid.mockReturnValue(false);
    handleSubmit({ preventDefault: jest.fn() });
    expect(renderAlert).toHaveBeenCalled();
  });

  test("should call postData if is valid URL", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValue(data);
    await handleSubmit({ preventDefault: jest.fn() });
    expect(postData).toHaveBeenCalled();
  });

  test("should call renderResults if postData resolves with status 200", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValueOnce({ json: () => data, ok: true, status: 200 });
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    expect(renderResults).toHaveBeenCalled();
  });

  test("should call renderAlert if postData rejects", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockImplementation(() => Promise.reject(new Error()));
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledTimes(1);
  });

  test("should handle non status 200 with a error network message", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockImplementation(() => Promise.resolve({ status: 404 }));
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledWith(messages.NETWORK_ERROR);
  });

  test("should display success message on successful resolution", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    const data = { res: "test-data" };
    postData.mockResolvedValue({ json: () => data, ok: true, status: 200 });
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledTimes(1);
    expect(renderAlert).toHaveBeenCalledWith(messages.SUCCESS);
  });

  test("should render a network error message on non-200 response", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockImplementation(() =>
      Promise.resolve({ ok: true, status: 404 }),
    );
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledWith(messages.NETWORK_ERROR);
  });

  test("should render server error message on status 500", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockResolvedValue({ ok: false, status: 500 });
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledTimes(1);
    expect(renderAlert).toHaveBeenCalledWith(messages.SERVER_ERROR);
  });

  test("should render an network error message when an exception is thrown", async () => {
    getEl.mockReturnValue({ value: "valid_url" });
    isFormatUrlValid.mockReturnValue(true);
    postData.mockRejectedValueOnce(new Error());
    handleSubmit({ preventDefault: jest.fn() });
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(renderAlert).toHaveBeenCalledTimes(1);
    expect(renderAlert).toHaveBeenCalledWith(messages.NETWORK_ERROR);
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
    postData.mockResolvedValue({ json: () => data, ok: true, status: 200 });
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
