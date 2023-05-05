import React, { useState } from 'react'

import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { faker } from '@faker-js/faker'
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import Shortcuts from '../../sections/settings/Shortcuts'




const Settings = () => {

    const theme = useTheme()
    const [openShortcuts, setOpenShortcuts] = useState(false)

    const handleOpenShortcuts = () => {
        console.log("I am Open")
        setOpenShortcuts(true)
    }
    const handleCloseShortcuts = () => {
        setOpenShortcuts(false)
    }


    const list = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { },
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { },
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { },
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            // onclick: handleOpenTheme,
            onclick: () => { }
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { },
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request Account Info",
            onclick: () => { },
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyboard Shortcuts",
            onclick: handleOpenShortcuts,
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { },
        },
    ]


    return (
        <>
            <Stack direction={'row'} alignItems={'center'} sx={{ width: '100%' }}>
                {/* Settings Option  */}
                <Box
                    className='scrollbar'
                    sx={{
                        width: 300,
                        height: '100vh',
                        overflowY: 'scroll',
                        background: theme.palette.mode === 'light'
                            ? '#F8FAFF' : theme.palette.background,
                        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                    }}
                >

                    <Stack p={3} spacing={4} sx={{ paddingTop: '10px !important', marginTop: '1' }}>
                        {/* Header Section */}
                        <Stack direction={'row'} alignItems={'center'} spacing={1} >
                            <IconButton>
                                <CaretLeft size={20} color={'#4B4B4B'} />
                            </IconButton>
                            <Typography variant='h6'>Settings</Typography>
                        </Stack>
                        {/* Profile Section */}
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()}
                                sx={{ width: 50, height: 50 }} />
                            <Stack spacing={0.5}>
                                <Typography variant='article'>{faker.name.fullName()}</Typography>
                                <Typography variant='body2'>{faker.random.words()}</Typography>
                            </Stack>
                        </Stack>


                        {/* List of Options */}
                        <Stack spacing={2}>
                            {list.map(({ key, icon, title, onclick }) => (
                                <>
                                    <Stack sx={{ cursor: 'pointer' }} onClick={onclick} spacing={1}>
                                        <Stack spacing={4} direction={'row'} alignItems={'center'}>
                                            {icon}
                                            <Typography variant='body2'>{title}</Typography>
                                        </Stack>
                                        {key !== 7 && <Divider />}
                                    </Stack>
                                </>
                            ))}
                        </Stack>
                    </Stack>
                </Box>


                {/* No conversation Animation */}
            </Stack>
            {openShortcuts && <Shortcuts open={openShortcuts} handleClose={handleCloseShortcuts} />}
        </>
    )
}

export default Settings