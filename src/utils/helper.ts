import {ZodError} from 'zod';

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
