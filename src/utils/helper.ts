import * as z from "zod";
import { randomCourseImage, randomUserImage } from "./constant";
import * as VideoThumbnails from "expo-video-thumbnails";

import { v4 as uuidv4 } from "uuid";

export const zodErrorSimplify = <T>(error: z.ZodError<T>) => {
  const flattened = z.flattenError(error);
  const simplified: Partial<Record<keyof T, string>> = {};

  for (const key in flattened.fieldErrors) {
    const messages = flattened.fieldErrors[key];
    if (messages && messages.length > 0) {
      simplified[key as keyof T] = messages[0]; // take first error
    }
  }

  return simplified;
};

export const getFirstName = (fullName?: string | null) => {
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
