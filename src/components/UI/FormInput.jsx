import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const FormInput = ({ name, label, ...props }) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <TextField
          helperText={error?.message}
          error={!!error}
          value={value}
          onChange={onChange}
          label={label}
          {...props}
        />
      )}
    />
  )
}
