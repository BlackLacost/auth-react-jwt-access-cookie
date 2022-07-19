import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { authRoutes, routes } from '../../App'
import { useAuth } from './useAuth'

export const AuthMenu = () => {
  const { tokenPayload, signout } = useAuth()
  const [anchorEl, setAnhcorEl] = useState(null)
  const open = Boolean(anchorEl)
  const close = () => setAnhcorEl(null)
  return (
    <>
      <IconButton onClick={(e) => setAnhcorEl(e.target)}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>
            {tokenPayload.name || tokenPayload.email.split('@')[0]}
          </Typography>
          <Avatar />
        </Stack>
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={close}>
        {tokenPayload.role === 'ADMIN' && (
          <MenuItem to={routes.admin.path}>{routes.admin.name}</MenuItem>
        )}
        <MenuItem
          onClick={async () => {
            close()
            await signout()
          }}
          component="button"
        >
          {authRoutes.signout.name}
        </MenuItem>
      </Menu>
    </>
  )
}
