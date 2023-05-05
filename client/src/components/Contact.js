import React from 'react'

import { Avatar, Box, Divider, IconButton, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react'
import { faker } from '@faker-js/faker'

import IOSSwitch from '../layouts/dashboard/themeSwitch'


import { useDispatch } from 'react-redux'
import { ToggleSidebar, UpdateSidebarType } from '../Redux/Slices/app'
import { useState } from 'react'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Block this Contact</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" variant='body2'>
                    Are you sure you want to Block this contact ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={handleClose}>Block</Button>
            </DialogActions>
        </Dialog>
    )
}


const DeleteDialog = ({ open, handleClose }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Clear All Chat</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" variant='body2'>
                    Are you sure you want to delete this chat ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={handleClose}>Delete</Button>
            </DialogActions>
        </Dialog>
    )
}




const Contact = () => {

    const theme = useTheme()
    const dispatch = useDispatch()

    const [openBlock, setOpenBlock] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const handleCloseBlock = () => {
        setOpenBlock(false)
    }

    const handleCloseDelete = () => {
        setOpenDelete(false)
    }


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
                            justifyContent={'space-between'}
                            spacing={1}
                        >
                            <Typography variant='subtitle2'> Contact info </Typography>
                            <IconButton onClick={() => { dispatch(ToggleSidebar()) }}>
                                <X />
                            </IconButton>
                        </Stack>
                    </Box>

                    {/* Body of the Contact Info SideBar */}

                    <Stack
                        className='scrollbar'
                        sx={{ height: '100%', position: 'relative', flexGrow: 1, overflowY: 'scroll' }}
                        p={1}
                        spacing={2}
                    >
                        <Stack alignItems={'center'} direction={'row'} spacing={2}>
                            <Avatar
                                src={faker.image.avatar()}
                                alt={faker.name.firstName()}
                                sx={{ height: 55, width: 55 }}
                            />
                            <Stack spacing={0.5}>
                                <Typography variant='article' fontWeight={600}>
                                    {faker.name.fullName()}
                                </Typography>
                                <Typography variant='body2' fontWeight={600}>
                                    {"+91 85340 49294"}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-evenly'}
                            sx={{ marginTop: '2 !important' }}
                        >
                            <Stack spacing={1} alignItems={'center'} >
                                <IconButton>
                                    <Phone />
                                </IconButton>
                                <Typography variant='overline'>Voice</Typography>
                            </Stack>

                            <Stack spacing={1} alignItems={'center'}>
                                <IconButton>
                                    <VideoCamera />
                                </IconButton>
                                <Typography variant='overline'>Video</Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack spacing={0.5} sx={{ marginTop: '2px !important' }}>
                            <Typography variant='article'>About</Typography>
                            <Typography variant='body2'>Building a Messaging APP</Typography>
                        </Stack>
                        <Divider />
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            sx={{ marginTop: '2px !important' }}
                        >
                            <Typography variant='subtitle2'>Media,Link & docs</Typography>
                            <Button
                                onClick={() => { dispatch(UpdateSidebarType("SHARED")) }}
                                endIcon={<CaretRight size={20} />}
                            >
                                69
                            </Button>
                        </Stack>

                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            {[1, 2, 3].map((el) => (
                                <Box>
                                    <img src={faker.image.nature()} alt="" />
                                </Box>
                            ))}
                        </Stack>
                        <Divider />
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ marginTop: '2px !important' }}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <Star size={20} />
                                <Typography variant='subtitle2'>Stared Messages</Typography>
                            </Stack>
                            <IconButton
                                onClick={() => { dispatch(UpdateSidebarType("STARRED")) }}
                            >
                                <CaretRight size={20} />
                            </IconButton>
                        </Stack>
                        <Divider />
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ marginTop: '2px !important' }}>
                            <Stack direction={'row'} alignItems={'center'} spacing={1}>
                                <Bell size={20} />
                                <Typography variant='subtitle2'>Muted Notifications</Typography>
                            </Stack>
                            <IOSSwitch />
                        </Stack>
                        <Divider />
                        <Typography variant='body2'>1 group in common</Typography>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
                            <Stack spacing={0.5}>
                                <Typography variant='subtitle2'>RahulB</Typography>
                                <Typography variant='caption'>Nikku,Maa,Dd,Papa & You</Typography>
                            </Stack>
                        </Stack>
                        <Stack direction={'row'} spacing={2} alignItems={'center'}>
                            <Button
                                startIcon={<Prohibit />}
                                fullWidth
                                variant='outlined'
                                onClick={() => { setOpenBlock(true) }}
                            >
                                Block
                            </Button>
                            <Button startIcon={<Trash />}
                                fullWidth
                                variant='outlined'
                                onClick={() => { setOpenDelete(true) }}
                            >
                                Delete
                            </Button>
                        </Stack>
                    </Stack>
                </Stack>
                {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
                {openDelete && <DeleteDialog open={openDelete} handleClose={handleCloseDelete} />}
            </Box>
        </>
    )
}

export default Contact