import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Stack, Typography } from '@mui/material'
import AuthSocial from '../../sections/auth/AuthSocial'
import LoginForm from '../../sections/auth/LoginForm'


const Login = () => {
    return (
        <>
            <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant='h5'>Login to Hike</Typography>
                <Stack direction={'row'} spacing={1}>
                    <Typography variant='body2'>New User ?</Typography>
                    <Link
                        to='/auth/register'
                        component={RouterLink}//! Renamed react-router-dom's Link as RouterLink
                        variant='subtitle2'
                    >
                        Create an account
                    </Link>
                </Stack>

                {/*//* This sections will contain Login Form & Social Authentication : Build Separately */}

                {/* Login Form */}
                <LoginForm />

                {/* Social Auth */}
                <AuthSocial />
            </Stack >
        </>
    )
}

export default Login