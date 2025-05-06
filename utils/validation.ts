import { ZodError } from 'zod';

export const handleValidationErrors = (error: ZodError, t: (key: string) => string) => {
  const errors: Record<string, string> = {};

  error.issues.forEach(issue => {
    const fieldName = issue.path[0] as string;
    errors[fieldName] = issue.message || t('VALIDATION.FIELD_INVALID');
  });

  return errors;
};
