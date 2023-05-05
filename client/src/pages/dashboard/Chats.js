import React from 'react'
import { Box, Stack, Typography, IconButton, Button, Divider, } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ArchiveBox, CircleDashed, MagnifyingGlass, } from 'phosphor-react'
import { ChatList } from '../../data'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import ChatElement from '../../components/ChatElement'



const Chats = () => {

    const theme = useTheme()

    return (
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
                    direction='row'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Typography variant='h5' >
                        Chats
                    </Typography>
                    <IconButton>
                        <CircleDashed />
                    </IconButton>
                </Stack>
                <Stack sx={{ width: '100%' }}>
                    <Search>
                        <SearchIconWrapper>
                            <MagnifyingGlass color='#709ce6' />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder='Search . . .' />
                    </Search>
                </Stack>
                <Stack spacing={1}>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        spacing={1.5}
                    >
                        <ArchiveBox size={24} />
                        <Button >
                            Archived
                        </Button>
                    </Stack>
                    <Divider />
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
                            Pinned
                            {
                                ChatList.filter((el) => el.pinned).map((el) => {
                                    return <ChatElement {...el} />
                                })
                            }
                        </Typography>
                    </Stack>
                    <Stack spacing={2.4}>
                        <Typography variant='subtitle2' sx={{ color: '#676767' }}>
                            All Chats
                            {
                                ChatList.filter((el) => !el.pinned).map((el) => {
                                    return <ChatElement {...el} />
                                })
                            }
                        </Typography>
                    </Stack>
                    {/* </SimpleBarStyle> */}
                </Stack>
            </Stack>
        </Box>
    )
}

export default Chats