import { ZodError } from "zod";
import { randomCourseImage, randomUserImage } from "./constant";
import * as VideoThumbnails from "expo-video-thumbnails";

import { v4 as uuidv4 } from "uuid";

export const zodErrorSimplify = <T>(error: ZodError) => {
  const errors = error.errors
    .map((err) => {
      return {
        field: err.path.join("."),
      };
    })
    .reduce((acc, curr, idx) => {
      const acct = acc as T;
      const field = curr.field as T as keyof T;
      const isAlreadyHaveError = Boolean(acct?.[field]);
      if (isAlreadyHaveError) {
        return acc;
      }
      return {
        ...acc,
        [field]: `${error.errors[idx]?.message ?? ""}`,
      };
    }, {});
  return errors as T;
};

export const getFirstName = (fullName?: string) => {
  if (!fullName) {
    return fullName;
  }
  return fullName.split(" ")?.[0]?.trim();
};

export const getRandomImage = (index: number) => {
  return randomCourseImage + "?" + Date.now() + index;
};

export const getRandomUserImage = (index: number) => {
  return randomUserImage + "?" + Date.now() + index;
};

export function extractFirstErrors(error: ZodError): Record<string, string> {
  console.log("error", error);
  const fieldErrors = error.formErrors.fieldErrors;

  const result: Record<string, string> = {};

  for (const key in fieldErrors) {
    const value = fieldErrors[key];

    if (Array.isArray(value) && value.length) {
      // Direct error on the field
      result[key] = value[0];
    } else if (typeof value === "object" && value !== null) {
      // Nested error, get first nested error
      for (const nestedKey in value) {
        if (Array.isArray(value[nestedKey]) && value[nestedKey].length) {
          result[key] = value[nestedKey][0];
          break;
        }
      }
    }
  }

  return result;
}

export const getVideoThumbnail = (url: string, timeStamp = 10000) => {
  return VideoThumbnails.getThumbnailAsync(url, { time: timeStamp });
};

export const getUniqueId = uuidv4;

export function formatTime(milliseconds: number | null = 0) {
  if (!milliseconds) {
    return "";
  }
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
  const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} min`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(" ");
}
