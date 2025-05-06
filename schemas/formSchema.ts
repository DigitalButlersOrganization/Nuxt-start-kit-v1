import { z } from 'zod';

export const useSchema = (t: (key: string) => string) => {
  return z
    .object({
      email: z.string().min(1, t('VALIDATION.REQUIRED')).email(t('VALIDATION.FIELD_INVALID')),
      password: z.string().min(1, t('VALIDATION.REQUIRED')).min(6, t('VALIDATION.MIN')),
      confirmPassword: z.string().min(1, t('VALIDATION.REQUIRED')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('VALIDATION.PASSWORD_MISMATCH'),
      path: ['confirmPassword'],
    });
};
