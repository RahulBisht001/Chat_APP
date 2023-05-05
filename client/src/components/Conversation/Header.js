import React from 'react'

import { Stack, Box, Avatar, Typography, IconButton, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { faker } from '@faker-js/faker'
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from 'phosphor-react';

//! Reused Component
import StyledBadge from '../../components/StyledBadge'

//! Redux 
import { ToggleSidebar } from '../../Redux/Slices/app';
import { useDispatch } from 'react-redux';


const Header = () => {
    const theme = useTheme()
    const dispatch = useDispatch()

    return (
        <>
            <Box
                p={2}
                sx={{
                    height: 55,
                    width: "100%",
                    background: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                    boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
                }}
            >
                <Stack
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    direction={'row'}
                    sx={{ width: '100%', height: '100%' }}
                >
                    <Stack
                        direction={'row'}
                        spacing={2}
                        onClick={() => { dispatch(ToggleSidebar()) }}
                    >
                        <Box>
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                            </StyledBadge>
                        </Box>
                        <Stack direction={'column'} spacing={0.2}>
                            <Typography variant='subtitle2'>{faker.name.fullName()}</Typography>
                            <Typography variant='caption'>Online</Typography>
                        </Stack>
                    </Stack>
                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <IconButton>
                            <VideoCamera />
                        </IconButton>
                        <IconButton>
                            <Phone />
                        </IconButton>
                        <IconButton>
                            <MagnifyingGlass />
                        </IconButton>
                        <Divider orientation='vertical' flexItem />
                        <IconButton>
                            <CaretDown />
                        </IconButton>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default Header