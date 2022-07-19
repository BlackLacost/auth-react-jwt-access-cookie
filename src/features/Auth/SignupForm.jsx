import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Link, Stack, styled, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { authRoutes } from '../../App'
import { FormInput } from '../../components/UI/FormInput'
import { FormRadio } from '../../components/UI/FormRadio'
import { fetchApi } from '../../fetchApi'
import { signupSchema } from './signup.schema'

export const SignupForm = ({ setMessage, setTokenPayload }) => {
  const methods = useForm({
    defaultValues: { email: '', name: '', role: 'USER', password: '' },
    resolver: yupResolver(signupSchema),
  })
  const { handleSubmit, reset } = methods
  const onSubmit = async (data) => {
    try {
      const res = await fetchApi.post('auth/signup', data)
      setMessage(null)
      reset()
      localStorage.setItem('me', JSON.stringify(res.data.tokenPayload))
      setTokenPayload(res.data.tokenPayload)
    } catch (err) {
      console.log(err)
      setMessage(err.response.data.message)
    }
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="true">
        <Typography alignSelf="center" variant="h4" component="h1">
          Регистрация
        </Typography>
        <FormInput required name="email" label="Почта" />
        <FormInput name="name" label="Имя" />
        <FormInput required label="Пароль" type="password" name="password" />
        <FormRadio
          name="role"
          label="Роль"
          options={[
            { label: 'Пользователь', value: 'USER' },
            { label: 'Админ', value: 'ADMIN' },
          ]}
        />
        <Stack direction="row" alignItems="center" spacing={3}>
          <Typography>
            Уже есть аккаунт? <Link to={authRoutes.signin.path}>Войдите</Link>
          </Typography>
          <Button type="submit">{authRoutes.signup.name}</Button>
        </Stack>
      </Form>
    </FormProvider>
  )
}

const Form = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  padding: 30,
  gap: 15,
})
