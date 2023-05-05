import React from 'react'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { CaretLeft } from 'phosphor-react'
import ProfileForm from '../../sections/settings/ProfileForm'


const Profile = () => {
    return (
        <>
            <Stack direction={'row'} sx={{ width: "100%" }}>
                {/* Left */}
                <Box
                    sx={{
                        position: 'relative',
                        // height: '100vh',
                        width: 320,
                        backgroundColor: (theme) => theme.palette.mode === 'light'
                            ? '#EFF0F6'
                            : theme.palette.background.paper,
                        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
                    }}
                >
                    <Stack p={4} spacing={5}>
                        {/* Header */}
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <IconButton>
                                <CaretLeft size={24} color='#4B4B4B' />
                            </IconButton>
                            <Typography variant='h5'>
                                Profile
                            </Typography>
                        </Stack>
                        {/* Profile Form  */}
                        <ProfileForm />
                    </Stack>

                </Box>
            </Stack>
        </>
    )
}

export default Profile