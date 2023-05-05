import React, { useState } from 'react'

import { MagnifyingGlass, Plus, PushPin } from 'phosphor-react'
import { Box, IconButton, Stack, Typography, Link, Divider } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'

import { CallLogElement } from '../../components/CallElement'
import { CallLogs } from '../../data/index'
import StartCall from '../../sections/main/StartCall'

const Call = () => {

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
                                <Typography variant='h5'>Call Logs</Typography>
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
                                        Start conversation
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
                            <Stack spacing={2.5} sx={{ mx: 2 }} >
                                {
                                    CallLogs.map((el) => (
                                        <CallLogElement {...el} />
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
                {/* Right */}
                {/* //Todo Reuse Conversation Component */}
            </Stack >

            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog} />}
        </>
    )
}

export default Call

