import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { CaretLeft } from 'phosphor-react'
import NewPasswordForm from '../../sections/auth/NewPasswordForm'


const NewPassword = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant='h5'>Reset Password</Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                    Please set your new Password
                </Typography>
            </Stack>
            {/*//! New Password Form */}
            <NewPasswordForm />

            <Link
                component={RouterLink}
                to='/auth/login'
                color={'inherit'}
                variant='subtitle2'
                sx={{ mt: 3, mx: 'auto', alignItems: 'center', display: 'inline-flex' }}
            >
                <CaretLeft size={20} />
                Return to Log in
            </Link>
        </>
    )
}

export default NewPassword