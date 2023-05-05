import React, { useState } from 'react'
import { Divider, Stack, Typography, Box, Link, IconButton, Menu, MenuItem, Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { DotsThreeVertical, Download, Image } from 'phosphor-react'
import { Message_options } from '../../data'


const Timeline = ({ el }) => {
    const theme = useTheme()
    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Divider width='46%' />
            <Typography
                variant='caption'
                sx={{ color: theme.palette.text }}
            >
                {el.text}
            </Typography>
            <Divider width='46%' />
        </Stack>
    )
}

const TextMsg = ({ el, menu }) => {

    const theme = useTheme()

    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5*8 = 12
                    width: 'max-content',
                }}
            >
                <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                    {el.message}
                </Typography>
            </Box>
            {/* Message Option with three dots */}
            {menu && <MessageOption />}
        </Stack >
    )
}


const MediaMsg = ({ el, menu }) => {
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5*8 = 12
                    width: 'max-content',
                }}
            >
                <Stack
                    p={1}
                    spacing={1}
                    sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}
                >
                    <img
                        src={el.img}
                        alt={"ImageMessage"}
                        style={{
                            maxHeight: 210,
                            borderRadius: '10px'
                        }}
                    />
                    <Typography
                        variant='body2'
                        color={el.incoming ? theme.palette.text : '#fff'}
                    >
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {/* Message Option with three dots */}
            {menu && <MessageOption />}
        </Stack>
    )
}

const ReplyMsg = ({ el, menu }) => {
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={0.6}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5*8 = 12
                    width: 'max-content',
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={1}
                        direction={'column'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            borderRadius: '10px'
                        }}
                    >
                        <Typography
                            variant='body2'
                            color={theme.palette.text}
                        >
                            {el.message}
                        </Typography>
                    </Stack>
                    <Typography
                        variant='body2'
                        color={el.incoming ? theme.palette.text : '#fff'}
                    >
                        {el.reply}
                    </Typography>
                </Stack>
            </Box>
            {/* Message Option with three dots */}
            {menu && <MessageOption />}
        </Stack>
    )
}

const LinkMsg = ({ el, menu }) => {
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1}
                sx={{
                    backgroundColor: el.incoming
                        ? theme.palette.background.paper
                        : theme.palette.primary.main,
                    borderRadius: 1.5, // 1.5*8 = 12
                    width: 'max-content',
                }}
            >
                <Stack spacing={2}>
                    <Stack
                        p={1}
                        spacing={3}
                        // alignItems={'center'}
                        sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}
                    >
                        <img
                            src={el.preview}
                            alt={el.message}
                            style={{ maxHeight: 210, borderRadius: '10px' }}
                        />
                        <Stack spacing={2}>
                            <Typography variant='subtitle2'>
                                Creating Chat APP
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                component={Link}
                                sx={{ color: theme.palette.primary.main }}
                                to='//https://www.linkedin.com/in/RahulB001/'
                            >
                                https://www.linkedin.com/in/RahulB001/
                            </Typography>
                        </Stack>
                        <Typography
                            variant='body2'
                            color={el.incoming ? theme.palette.text : '#fff'}>
                            {el.message}
                        </Typography>
                    </Stack>
                </Stack>
            </Box>
            {/* Message Option with three dots */}
            {menu && <MessageOption />}
        </Stack>
    )
}

const DocMsg = ({ el, menu }) => {
    const theme = useTheme()
    return (
        <Stack
            direction="row"
            justifyContent={el.incoming ? 'start' : 'end'}
        >
            <Box
                p={1}
                sx={{ backgroundColor: theme.palette.background.paper, borderRadius: 1 }}
            >

                <Stack spacing={2}>
                    <Stack
                        p={.5}
                        direction={'row'}
                        spacing={3}
                        alignItems={'center'}
                        sx={{
                            backgroundColor: el.incoming
                                ? theme.palette.background.default
                                : theme.palette.primary.main,
                            borderRadius: 1.5, // 1.5*8 = 12
                            width: 'max-content',
                        }}
                    >
                        <Image size={30} />
                        <Typography variant='caption'>RahulB.png</Typography>
                        <IconButton>
                            <Download size={25} />
                        </IconButton>
                    </Stack>
                    <Typography
                        variant='body2'
                        sx={{ color: el.incoming ? theme.palette.text : "#fff" }}
                    >
                        {el.message}
                    </Typography>
                </Stack>
            </Box >
            {/* Message Option with three dots */}
            {menu && <MessageOption />}
        </Stack >
    )
}

const MessageOption = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button
                sx={{
                    cursor: "pointer",
                    minWidth: '2px',
                    alignItems: 'flex-start',
                    background: 'transparent',
                    '&:hover': { backgroundColor: 'transparent' }
                }}
                p={0}
                disableTouchRipple={true}
                focusRipple={false}
            >
                <DotsThreeVertical
                    size={20}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{}}
                />
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Stack spacing={1} px={1}>
                    {
                        Message_options.map((el) => (
                            <MenuItem
                                // onClick={handleClick}
                                onClick={handleClick}
                            >
                                {el.title}
                            </MenuItem>
                        ))
                    }
                </Stack>
            </Menu>
        </>
    )
}

export { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg }