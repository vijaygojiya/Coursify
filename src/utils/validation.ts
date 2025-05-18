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

export const signupSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  email,
  password,
});

export const courseBasicInfoSchema = z.object({
  title: z
    .string({required_error: 'Please add course titleI'})
    .min(5, 'Course title must be at least 5 characters'),

  shortDescription: z.string().optional(),
  level: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
    required_error: 'Please select a difficulty level',
  }),

  coverImg: z.object(
    {
      path: z.string().url('Invalid image URI'),
      size: z.number().max(2 * 1024 * 1024, 'Image must be under 5MB'),
    },
    {
      required_error: 'Cover image required!',
    },
  ),

  promoVideo: z
    .object({
      path: z.string().url('Invalid video URI'),
      size: z.number().max(60 * 1024 * 1024, 'Video must be under 60MB'),
      duration: z.number().max(60 * 1000, 'Video must be 60 seconds or less'),
    })
    .optional(),
});
