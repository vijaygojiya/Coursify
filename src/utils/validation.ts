import {z} from 'zod';

//TO:DO use this message from translation key

const email = z
  .string()
  .min(1, {message: 'Email is required'})
  .email({message: 'Invalid email address'});

const password = z
  .string()
  .min(1, {message: 'Password is required'})
  .min(8, {message: 'Password must be at least 8 characters long'})
  .refine(
    pass => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
      return regex.test(pass);
    },
    {
      message:
        'Password must include at least one uppercase letter, one digit, and one special character',
    },
  );

export const loginSchema = z.object({
  email,
  password,
});
