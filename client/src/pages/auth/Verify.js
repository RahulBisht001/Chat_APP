import React from 'react'
import { Stack, Typography } from '@mui/material'
import VerifyForm from '../../sections/auth/VerifyForm'



const Verify = () => {
    return (
        <>
            <Stack
                spacing={2}
                sx={{
                    mt: 4,
                    mb: 5,
                    position: 'relative'
                }}
            >
                <Typography variant='h4'>Please verify your OTP</Typography>
                <Stack direction={'row'} spacing={0.5}>
                    <Typography variant='body2'>
                        sent to email (rah***********@gmail.com)
                    </Typography>
                </Stack>

                {/* //^  _______Verify Form */}
                <VerifyForm />
                {/* //~________________________________ */}
            </Stack>
        </>
    )
}

export default Verify