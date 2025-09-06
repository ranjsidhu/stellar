/**
 * @jest-environment jsdom
 */

import {
  calculateHours,
  pluralise,
  downloadFile,
  openNotification,
} from "@/app/utils";
import { NotificationInstance } from "antd/es/notification/interface";

beforeAll(() => {
  if (!window.URL) {
    (window as any).URL = {};
  }
  if (!window.URL.createObjectURL) {
    window.URL.createObjectURL = jest.fn(() => "blob:url");
  }
  if (!window.URL.revokeObjectURL) {
    window.URL.revokeObjectURL = jest.fn();
  }
});

describe("utils", () => {
  describe("pluralise", () => {
    it("adds 's' when count is not 1", () => {
      expect(pluralise(0, "cat")).toBe("0 cats");
      expect(pluralise(2, "dog")).toBe("2 dogs");
    });
    it("does not add 's' when count is 1", () => {
      expect(pluralise(1, "bird")).toBe("1 bird");
    });
  });

  describe("calculateHours", () => {
    const noun = "Posted";

    function generateDate(hoursAgo: number): Date {
      return new Date(Date.now() - hoursAgo * 60 * 60 * 1000);
    }

    it("returns minutes if less than 1 hour", () => {
      const date = generateDate(0.0167); // ~1 minute ago
      const result = calculateHours(date, noun);
      expect(result).toMatch(/Posted about \d+ minute(s)? ago/);
    });

    it("returns hours if less than 24 hours", () => {
      const date = generateDate(5); // 5 hours ago
      const result = calculateHours(date, noun);
      expect(result).toBe("Posted about 5 hours ago");
    });

    it("returns days if less than 30 days", () => {
      const date = generateDate(24 * 5); // 5 days ago
      const result = calculateHours(date, noun);
      expect(result).toBe("Posted 5 days ago");
    });

    it("returns months if 30 days or more", () => {
      const date = generateDate(24 * 30 * 2); // 2 months ago
      const result = calculateHours(date, noun);
      expect(result).toBe("Posted 2 months ago");
    });
  });

  describe("downloadFile", () => {
    beforeAll(() => {
      if (!window.URL) {
        (window as any).URL = {};
      }
      if (!window.URL.createObjectURL) {
        window.URL.createObjectURL = jest.fn(() => "blob:url");
      }
      if (!window.URL.revokeObjectURL) {
        window.URL.revokeObjectURL = jest.fn();
      }
    });

    it("creates a link and triggers download", () => {
      const blob = new Blob(["test content"], { type: "text/plain" });
      const filename = "test.txt";

      const createObjectURLSpy = jest
        .spyOn(window.URL, "createObjectURL")
        .mockReturnValue("blob:url");
      const revokeObjectURLSpy = jest.spyOn(window.URL, "revokeObjectURL");

      // Create a real anchor element
      const link = document.createElement("a");

      // Spy on its click and remove methods
      const clickSpy = jest.spyOn(link, "click");
      const removeSpy = jest.spyOn(link, "remove");

      // Spy on appendChild to call the real method
      const appendChildSpy = jest.spyOn(document.body, "appendChild");

      // Mock createElement to return our real anchor element
      jest.spyOn(document, "createElement").mockReturnValue(link);

      downloadFile(blob, filename);

      expect(createObjectURLSpy).toHaveBeenCalledWith(blob);
      expect(appendChildSpy).toHaveBeenCalledWith(link);
      expect(clickSpy).toHaveBeenCalled();
      expect(removeSpy).toHaveBeenCalled();
      expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:url");

      // Restore mocks
      createObjectURLSpy.mockRestore();
      revokeObjectURLSpy.mockRestore();
      appendChildSpy.mockRestore();
      clickSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });

  describe("openNotification", () => {
    it("calls the correct notification method", () => {
      const mockApi: NotificationInstance = {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        warning: jest.fn(),
        open: jest.fn(),
      } as any;

      openNotification("success", "Title", "Desc", mockApi);
      expect(mockApi.success).toHaveBeenCalledWith({
        message: "Title",
        description: "Desc",
      });

      openNotification("error", "Error", "Desc", mockApi);
      expect(mockApi.error).toHaveBeenCalledWith({
        message: "Error",
        description: "Desc",
      });

      openNotification("info", "Info", "Desc", mockApi);
      expect(mockApi.info).toHaveBeenCalledWith({
        message: "Info",
        description: "Desc",
      });

      openNotification("warning", "Warn", "Desc", mockApi);
      expect(mockApi.warning).toHaveBeenCalledWith({
        message: "Warn",
        description: "Desc",
      });
    });
  });
});
