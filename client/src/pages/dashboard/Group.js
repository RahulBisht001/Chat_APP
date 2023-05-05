import React, { useState } from 'react'

import { MagnifyingGlass, Plus, PushPin, UsersThree, } from 'phosphor-react'
import { Box, IconButton, Stack, Typography, Link, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import CreateGroup from '../../sections/main/CreateGroup'




const Group = () => {

    const theme = useTheme()
    const [openDialog, setOpenDialog] = useState(false)

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <>
            <Stack direction={'row'} sx={{ width: "100%" }}>
                {/* Left */}
                <Box
                    sx={{
                        position: 'relative',
                        // height: '100vh',
                        width: 320,
                        backgroundColor: theme.palette.mode === 'light' ? '#EFF0F6' : theme.palette.background.paper,
                        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
                    }}
                >
                    <Stack p={1} spacing={2} sx={{ height: '100vh' }}>
                        <Stack
                            p={2} spacing={2} sx={{ maxHeight: "100vh" }}
                        >
                            <Stack
                                alignItems={"center"}
                                justifyContent="space-between"
                                direction="row"
                            >
                                <Typography variant='h5'>Groups</Typography>
                            </Stack>
                            <Stack sx={{ width: '100%' }}>
                                <Search>
                                    <SearchIconWrapper>
                                        <MagnifyingGlass color='#709ce6' />
                                    </SearchIconWrapper>
                                    <StyledInputBase placeholder='Search . . .' />
                                </Search>
                            </Stack>
                            <Stack >
                                <Stack
                                    direction={'row'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                >
                                    <Typography variant='subtitle2' component={Link}>
                                        Create new group
                                    </Typography>
                                    <IconButton onClick={() => {
                                        setOpenDialog(true)
                                    }}>
                                        <Plus style={{ color: theme.palette.primary.main }} />
                                    </IconButton>
                                </Stack>
                                <Divider />
                            </Stack>
                        </Stack>

                        <Stack
                            spacing={2}
                            direction={'column'}
                            sx={{ flexGrow: 1 }}
                            overflow={'scroll'}
                            height='100%'
                            className="scrollbar"
                        >
                            <Stack spacing={2.4} >
                                <Typography variant='subtitle2' sx={{ color: '#676767' }}>
                                    <Stack spacing={2} alignItems={'center'} direction={'row'}>
                                        <PushPin size={20} />
                                        <Typography variant='subtitle2' >
                                            Pinned Groups
                                        </Typography>
                                    </Stack>
                                    {
                                        ChatList.filter((el) => el.pinned).map((el) => {
                                            return <ChatElement {...el} />
                                        })
                                    }
                                </Typography>
                            </Stack>
                            <Stack spacing={2.4}>
                                <Typography variant='subtitle2' sx={{ color: '#676767' }}>
                                    <Stack spacing={2} alignItems={'center'} direction={'row'}>
                                        <UsersThree size={20} />
                                        <Typography variant='subtitle2' >
                                            All Groups
                                        </Typography>
                                    </Stack>
                                    {
                                        ChatList.filter((el) => !el.pinned).map((el) => {
                                            return <ChatElement {...el} />
                                        })
                                    }
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>


                {/* Right */}
                {/* //Todo Reuse Conversation Component */}
            </Stack >

            {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Group


