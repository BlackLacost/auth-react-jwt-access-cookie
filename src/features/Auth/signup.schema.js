import * as yup from 'yup'

export const signupSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  name: yup.string(),
  role: yup.mixed().oneOf(['USER', 'ADMIN']),
})
