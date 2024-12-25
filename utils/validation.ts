import { ValidationError } from 'yup';

interface TranslationFunction {
  (key: string): string;
}

export const handleValidationErrors = (validationErrors: ValidationError, t: TranslationFunction) => {
  const errors: Record<string, string> = {};
  validationErrors.inner.forEach((err) => {
    if (err.path) {
      errors[err.path] = err.message || t('VALIDATION.COMMON.COMMON');
    }
  });
  return errors;
};
