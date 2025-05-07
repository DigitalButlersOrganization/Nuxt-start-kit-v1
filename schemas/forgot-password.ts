import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

export const forgotPasswordSchema = toTypedSchema(
  z.object({
    email: z.string().min(1, 'Required').email('Invalid email'),
  })
);
