import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Link, Stack, styled, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import { authRoutes } from '../../App'
import { FormInput } from '../../components/UI/FormInput'
import { fetchApi } from '../../fetchApi'
import { signinSchema } from './signin.schema'

export const SigninForm = ({ setMessage, setTokenPayload }) => {
  const methods = useForm({
    defaultValues: { email: '', password: '' },
    resolver: yupResolver(signinSchema),
  })
  const { handleSubmit, reset } = methods
  const onSubmit = async (data) => {
    try {
      const res = await fetchApi.post('auth/signin', data)
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
          Вход
        </Typography>
        <FormInput required name="email" label="Почта" />
        <FormInput required label="Пароль" type="password" name="password" />
        <Stack direction="row" alignItems="center" spacing={3}>
          <Typography>
            Еще нет аккаунта?{' '}
            <Link to={authRoutes.signup.path}>{authRoutes.signup.name}</Link>
          </Typography>
          <Button type="submit">{authRoutes.signin.name}</Button>
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
