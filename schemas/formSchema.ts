import * as yup from 'yup';

export const useSchema = (t: any) => {
  return yup.object({
    email: yup.string().email(t('VALIDATION.COMMON.INVALID')).required(t('VALIDATION.COMMON.REQUIRED')),
    password: yup.string().min(6, t('VALIDATION.COMMON.MIN')).required(t('VALIDATION.COMMON.REQUIRED')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('VALIDATION.COMMON.MATCH'))
      .required(t('VALIDATION.COMMON.REQUIRED')),
  });
};
