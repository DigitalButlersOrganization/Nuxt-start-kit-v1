import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const signupSchema = toTypedSchema(
  z
    .object({
      firstName: z.string().min(1, 'Required').max(20, 'Max 20 chars'),
      lastName: z.string().min(1, 'Required').max(20, 'Max 20 chars'),
      email: z.string().min(1, 'Required').email('Invalid email'),
      password: z.string().min(1, 'Required').min(6, 'Min 6 chars'),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })
);
