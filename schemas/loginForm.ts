import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const loginSchema = toTypedSchema(
  z
    .object({
      email: z.string().min(1, 'Required').email('Invalid email'),
      password: z.string().min(1, 'Required').min(6, 'Min 6 chars'),
      confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    })
);
