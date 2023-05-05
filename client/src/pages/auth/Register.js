import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import RegisterForm from '../../sections/auth/RegisterForm'
import AuthSocial from '../../sections/auth/AuthSocial'

const Register = () => {
    return (
        <>
            <Stack spacing={3} sx={{ mb: 5, position: 'relative' }}>
                <Typography variant='h6'>
                    Get Stared with Hike
                </Typography>

                <Stack direction={'row'} spacing={1}>
                    <Typography variant='body2'>Already have an account</Typography>
                    <Link
                        component={RouterLink}
                        to='/auth/login'
                        variant='subtitle2'
                    >
                        Log in
                    </Link>
                </Stack>
                {/* Register Form */}
                <RegisterForm />

                {/* Social Auth */}
                <AuthSocial />

                {/* //! These are simple Terms and Conditions section */}
                <Typography
                    component={'div'}
                    sx={{
                        typography: 'caption',
                        textAlign: 'center',
                        mt: 3,
                        color: 'text.secondary'
                    }}
                >
                    {"By Signing up i agree to       "}
                    <Link underline='always' color='text.primary'>
                        Terms of Service
                    </Link>
                    {'  and  '}
                    <Link underline='always' color='text.primary'>
                        Privacy Policy
                    </Link>
                </Typography>
            </Stack>
        </>
    )
}

export default Register