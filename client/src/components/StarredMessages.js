import React from 'react'

import { Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CaretLeft } from 'phosphor-react'


import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../Redux/Slices/app'
import Message from './Conversation/Message'



const StarredMessages = () => {

    const theme = useTheme()
    const dispatch = useDispatch()



    return (
        <>
            <Box sx={{ width: 290, height: '100vh' }}>
                <Stack sx={{ height: '100%' }}>
                    {/* Header of Contact Info SideBar */}
                    <Box
                        sx={{
                            boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                            width: '100%',
                            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
                        }}
                    >
                        <Stack
                            sx={{ height: '100%', p: 0.95 }}
                            direction={'row'}
                            alignItems={'center'}
                            spacing={1}
                        >
                            <IconButton onClick={() => { dispatch(UpdateSidebarType("CONTACT")) }}>
                                <CaretLeft size={20} />
                            </IconButton>
                            <Typography variant='subtitle2'> ⭐ Starred Messages </Typography>

                        </Stack>
                    </Box>

                    {/* Body of the Contact Info SideBar */}
                    <Stack
                        className='scrollbar'
                        sx={{
                            height: '100%',
                            position: 'relative',
                            flexGrow: 1,
                            overflowY: 'scroll'
                        }}
                        p={1}
                        spacing={2}
                    >
                        <Message />
                    </Stack >

                </Stack>
            </Box>
        </>
    )
}

export default StarredMessages