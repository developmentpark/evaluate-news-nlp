import { postData } from "./fetchService";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ key: "pass" }),
  }),
);

describe("postData function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("should return JSON data when the request is successful", async () => {
    const url = "http://localhost:8080/test";
    const data = {};
    const result = await postData(url, data);
    expect(result).toEqual({ key: "pass" });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("should throw an error when the request fails", async () => {
    const url = "http://localhost:8080/test";
    const data = {};
    const error = "error";
    fetch.mockRejectedValue(new Error(error));
    await expect(postData(url, data)).rejects.toThrow(error);
  });

  test("should make a POST request with the correct URL and data in the body", async () => {
    const url = "http://localhost:8080/test";
    const response = { key: "pass" };
    const data = "message";
    fetch.mockResolvedValue({
      json: () => Promise.resolve(response),
    });
    await postData(url, data);
    expect(fetch).toHaveBeenCalledTimes(1);
    const urlArg = fetch.mock.calls[0][0];
    expect(urlArg).toEqual(url);
    const optionsArg = fetch.mock.calls[0][1];
    expect(typeof optionsArg).toBe("object");
    expect(Object.prototype.hasOwnProperty.call(optionsArg, "body")).toBe(true);
    expect(optionsArg.body).toEqual(JSON.stringify(data));
    expect(Object.prototype.hasOwnProperty.call(optionsArg, "method")).toBe(
      true,
    );
    expect(optionsArg.method.toLowerCase()).toEqual("post");
  });
});
