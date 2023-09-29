const { renderAlert } = require("./render");
import { getEl } from "../utils/domReader";
import { messages } from "./messages";

jest.mock("../utils/domReader");

describe("renderAlert", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, "clearTimeout");
    jest.spyOn(global, "setTimeout");
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("should remove the alert style before displaying a new alert", () => {
    const el = {
      classList: {
        contains: () => false,
        remove: jest.fn(),
        add: jest.fn(),
      },
      textContent: "",
    };
    getEl.mockImplementation(() => el);

    renderAlert(messages.SUCCESS);
    expect(el.classList.remove).toHaveBeenCalledTimes(1);
    const args = el.classList.remove.mock.calls[0];
    const anyClassNameNotIncludes = ["alert_success", "alert_danger"].some(
      (className) => !args.includes(className),
    );
    expect(anyClassNameNotIncludes).toEqual(false);
    expect(el.classList.add).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });

  test("should not remove the alert style at the end of each alert", async () => {
    const el = {
      classList: {
        contains: () => false,
        remove: jest.fn(),
        add: jest.fn(),
      },
      textContent: "",
    };
    getEl.mockImplementation(() => el);

    renderAlert(messages.SUCCESS);

    let removeCalledTime = 1;
    expect(el.classList.remove).toHaveBeenCalledTimes(removeCalledTime);
    let args = el.classList.remove.mock.calls[removeCalledTime - 1];
    const anyClassNameNotIncludes = ["alert_success", "alert_danger"].some(
      (className) => !args.includes(className),
    );
    expect(anyClassNameNotIncludes).toEqual(false);
    expect(setTimeout).toHaveBeenCalledTimes(1);

    await jest.runAllTimers();
    removeCalledTime = 2;
    expect(el.classList.remove).toHaveBeenCalledTimes(removeCalledTime);
    args = el.classList.remove.mock.calls[removeCalledTime - 1];
    const anyClassNameIncludes = ["alert_success", "alert_danger"].some(
      (className) => args.includes(className),
    );
    expect(anyClassNameIncludes).toEqual(false);
  });

  test("should style the alert based on the message type", () => {
    const el = {
      classList: {
        contains: () => false,
        remove: jest.fn(),
        add: jest.fn(),
      },
      textContent: "",
    };
    getEl.mockImplementation(() => el);
    const message = messages.SUCCESS;

    renderAlert(messages.SUCCESS);
    expect(el.classList.add).toHaveBeenCalledTimes(1);
    const args = el.classList.add.mock.calls[0];
    const anyClassNameNotIncludes = [`alert_${message.type}`, "open"].some(
      (className) => !args.includes(className),
    );
    expect(el.textContent).toEqual(message.text);
    expect(anyClassNameNotIncludes).toEqual(false);
  });

  test("should close the alert after 4 seconds", async () => {
    const el = {
      classList: {
        contains: () => false,
        remove: jest.fn(),
        add: jest.fn(),
      },
      textContent: "",
    };
    getEl.mockImplementation(() => el);
    const message = messages.SUCCESS;
    const timeout = 4000;

    renderAlert(message);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
    expect(el.classList.remove).not.toBeCalledWith("open");

    await jest.runAllTimers();

    expect(el.classList.remove).toBeCalledWith("open");
  });

  test("should close a previous alert immediately before opening a new one", async () => {
    const el = {
      classList: {
        contains: () => true,
        remove: jest.fn(),
        add: jest.fn(),
      },
      textContent: "",
    };
    getEl.mockImplementation(() => el);

    const message = messages.SUCCESS;
    renderAlert(messages.SUCCESS);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
    expect(el.classList.remove).toHaveBeenCalledWith("open");
    expect(el.classList.add).toHaveBeenCalledTimes(1);
    expect(el.textContent).toEqual(message.text);
    expect(setTimeout).toHaveBeenCalledTimes(1);
  });
});
