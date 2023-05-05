import React, { useState } from 'react'


import { Stack, Box, IconButton, TextField, InputAdornment, Fab, Tooltip } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { Link, PaperPlaneTilt, Smiley, Image, Sticker, Camera, File, User } from 'phosphor-react';

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: '12px 0 !important'
    }
}))

const Actions = [
    {
        color: '#4da5fe',
        icon: <Image size={20} />,
        y: 80,
        title: 'Photo/Video',
    },
    {
        color: '#1b8cfe',
        icon: <Sticker size={20} />,
        y: 135,
        title: 'Stickers'
    },
    {
        color: '#0172e4',
        icon: <Camera size={20} />,
        y: 190,
        title: 'Image'
    },
    {
        color: '#0159b2',
        icon: <File size={20} />,
        y: 245,
        title: 'Document'
    },
    {
        color: '#0159b2',
        icon: <User size={20} />,
        y: 300,
        title: 'Contact'
    }

]

const ChatInput = ({ setOpenPicker }) => {

    const [openAction, setOpenAction] = useState(false)
    const theme = useTheme()
    return (
        <StyledInput
            fullWidth
            placeholder='Write a Message . . .'
            variant='filled'
            InputProps={{
                disableUnderline: true,
                startAdornment:
                    <Stack sx={{ width: 'max-content' }}>
                        <Stack
                            sx={{
                                position: 'relative',
                                display: openAction ? 'inline-block' : 'none',
                            }}
                        >
                            {Actions.map((el) => (

                                <Tooltip title={el.title} placement="right-start">
                                    <Fab sx={{
                                        position: 'absolute',
                                        top: -el.y,
                                        background: el.color,
                                        width: 40,
                                        height: 40,
                                        boxShadow: theme.palette.mode === 'light'
                                            ? '0px 2px 10px #7d7d8e' : ' 0 2px 10px #58585c'
                                    }}>
                                        {el.icon}
                                    </Fab>
                                </Tooltip>
                            ))}
                        </Stack>
                        <InputAdornment>
                            <IconButton onClick={() => { setOpenAction((prev) => !prev) }}>
                                <Link />
                            </IconButton>
                        </InputAdornment>
                    </Stack >,
                endAdornment:
                    <InputAdornment>
                        <IconButton onClick={() => { setOpenPicker((prev) => !prev) }} >
                            <Smiley />
                        </IconButton>
                    </InputAdornment>
            }}
        />
    )
}

const Footer = () => {

    const theme = useTheme()
    const [openPicker, setOpenPicker] = useState(false)

    return (
        <>
            <Box
                p={1}
                sx={{
                    // height: 55,
                    width: "100%",
                    background: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                    boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
                }}
            >
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                    <Stack sx={{ width: '100%' }}>
                        {/* Chat Input */}
                        <Box sx={{
                            display: openPicker ? 'inline' : 'none',
                            zIndex: 10,
                            position: 'fixed',
                            bottom: 70,
                            right: 50
                        }}>
                            <Picker
                                theme={theme.palette.mode}
                                data={data}
                                onEmojiSelect={console.log}
                                emojiButtonSize={32}
                                emojiSize={20}
                                previewPosition='none'
                            />
                        </Box>
                        <ChatInput setOpenPicker={setOpenPicker} />
                    </Stack>

                    <Box sx={{
                        height: 46,
                        width: 52,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5
                    }}>
                        <Stack
                            sx={{ height: '100%', width: '100%', }}
                            alignItems={'center'}
                            justifyContent={'center'}
                        >
                            <IconButton>
                                <PaperPlaneTilt color='#fff' />
                            </IconButton>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default Footer