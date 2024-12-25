import { ValidationError } from 'yup';

export const handleValidationErrors = (validationErrors: ValidationError) => {
  const errors: Record<string, string> = {};
  validationErrors.inner.forEach((err) => {
    if (err.path) {
      errors[err.path] = err.message || 'Ошибка валидации';
    }
  });
  return errors;
};
