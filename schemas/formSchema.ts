import * as yup from 'yup';

export const createSchema = (t: any) => {
  return yup.object({
    email: yup.string().email(t('validation.common.invalid')).required(t('validation.common.required')),
    password: yup.string().min(6, t('validation.common.min')).required(t('validation.common.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.common.match'))
      .required(t('validation.common.required')),
  });
};
