import React from 'react'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { faker } from '@faker-js/faker'

import StyledBadge from '../components/StyledBadge'
import { ArrowDownLeft, ArrowUpRight, Phone, VideoCamera } from 'phosphor-react'

const CallLogElement = ({ online, incoming, missed }) => {

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: (theme) => theme.palette.mode === 'light'
                        ? '#EFF0F6'
                        : theme.palette.background.paper,
                    // boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
                }}
            >
                <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        {
                            online
                                ?
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                                </StyledBadge>
                                :
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                        }
                        <Stack spacing={0.3}>
                            <Typography variant='subtitle2'>
                                {faker.name.fullName()}
                            </Typography>

                            <Stack
                                direction={'row'}
                                spacing={1}
                                alignItems={'center'}
                            >
                                {
                                    incoming
                                        ? < ArrowDownLeft color={missed ? 'red' : '#65C466'} />
                                        : <ArrowUpRight color={missed ? 'red' : '#65C466'} />
                                }
                                <Typography variant='caption'>
                                    Yesterday 9:30 PM
                                </Typography>
                            </Stack>
                        </Stack>

                    </Stack>
                    <IconButton>
                        <Phone size={22} color='#65C466' />
                    </IconButton>
                </Stack>

            </Box>
        </>
    )
}


const CallElement = ({ online }) => {
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    // backgroundColor: (theme) => theme.palette.mode === 'light'
                    //     ? '#EFF0F6'
                    //     : theme.palette.background.paper,
                }}
                p={1}
            >
                <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                    className='scrollbar'
                >
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={2}
                    >
                        {
                            online
                                ?
                                <StyledBadge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                                </StyledBadge>
                                :
                                <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                        }
                        <Stack spacing={0.3}>
                            <Typography variant='subtitle2'>
                                {faker.name.fullName()}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <IconButton>
                            <Phone size={22} color='#65C466' />
                        </IconButton>
                        <IconButton>
                            <VideoCamera size={22} color='#65C466' />
                        </IconButton>
                    </Stack>
                </Stack>

            </Box>
        </>
    )
}


export { CallLogElement, CallElement }