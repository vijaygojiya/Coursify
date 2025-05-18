import {ZodError} from 'zod';
import {randomCourseImage, randomUserImage} from './constant';
import {createThumbnail} from 'react-native-create-thumbnail';
import {Platform} from 'react-native';

export const zodErrorSimplify = <T>(error: ZodError) => {
  const errors = error.errors
    .map(err => {
      return {
        field: err.path.join('.'),
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
        [field]: `${error.errors[idx]?.message ?? ''}`,
      };
    }, {});
  return errors as T;
};

export const getFirstName = (fullName?: string) => {
  if (!fullName) {
    return fullName;
  }
  return fullName.split(' ')?.[0]?.trim();
};

export const getRandomImage = (index: number) => {
  return randomCourseImage + '?' + Date.now() + index;
};

export const getRandomUserImage = (index: number) => {
  return randomUserImage + '?' + Date.now() + index;
};

export function extractFirstErrors(error: ZodError): Record<string, string> {
  console.log('error', error);
  const fieldErrors = error.formErrors.fieldErrors;

  const result: Record<string, string> = {};

  for (const key in fieldErrors) {
    const value = fieldErrors[key];

    if (Array.isArray(value) && value.length) {
      // Direct error on the field
      result[key] = value[0];
    } else if (typeof value === 'object' && value !== null) {
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
  return createThumbnail({
    url: Platform.select({
      ios: url.replace('file://', ''),
      android: url,
      default: url,
    }),
    timeStamp,
    format: 'jpeg',
  });
};
