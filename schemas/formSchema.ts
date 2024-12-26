import * as yup from 'yup';

export const useSchema = (t: any) => {
  return yup.object({
    email: yup.string().email(t('VALIDATION.FIELD_INVALID')).required(t('VALIDATION.REQUIRED')),
    password: yup.string().min(6, t('VALIDATION.MIN')).required(t('VALIDATION.REQUIRED')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('VALIDATION.PASSWORD_MISMATCH'))
      .required(t('VALIDATION.REQUIRED')),
  });
};
