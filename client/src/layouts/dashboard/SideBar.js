import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

//!  MUI components
import { Box, IconButton, Divider, Stack, Avatar, Menu, MenuItem } from '@mui/material'
import { Gear } from 'phosphor-react'
import { faker } from "@faker-js/faker";

//!  Mui Styles
import { useTheme } from "@mui/material/styles";


//!   local imports
import Logo from '../../assets/Images/Hike.png'
import { Nav_Buttons, Profile_Menu } from "../../data";
import ThemeSwitch from './themeSwitch'

//!   custom hook
import useSettings from '../../hooks/useSettings'


const getPath = (index) => {
    switch (index) {
        case 0:
            return '/app'
        case 1:
            return '/group'
        case 2:
            return '/call'
        case 3:
            return '/settings'
        default:
            return '/404'
    }
}

const getMenuPath = (index) => {
    switch (index) {
        case 0:
            return '/profile'
        case 1:
            return '/settings'
        case 2:
            //Todo need to write the logout logic 
            return '/auth/login'
        default:
            return '/404'
    }
}



const SideBar = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [selected, setSelected] = useState(0)

    //! useSetting is a custom hook that gives us access to all method defined inside SettingContext
    const { onToggleMode } = useSettings()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Box
                p={1}
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    height: '100vh',
                    width: 70,
                    boxShadow: '0px 0px 3px rgba(0,0,0,0.25)'
                }}
            >
                <Stack
                    direction='column'
                    alignItems={'center'}
                    sx={{ height: '100%', width: '100%' }}
                    justifyContent={'space-between'}
                    spacing={3}
                >
                    <Stack alignItems={'center'} spacing={4}>
                        <Box
                            sx={{
                                // backgroundColor: theme.palette.primary.main,
                                height: 50,
                                width: 50,
                                borderRadius: 1.5,
                            }}
                        >
                            <img src={Logo} alt="Chat App Logo" />
                        </Box>
                        <Stack
                            sx={{
                                width: 'max-content'
                            }}
                            direction={'column'}
                            alignItems={'center'}
                            spacing={2}
                        >
                            {
                                Nav_Buttons.map((el) =>
                                (el.index === selected ?
                                    <Box
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: 1.5
                                        }}
                                    >
                                        <IconButton
                                            key={el.index}
                                            sx={{ width: 'max-content', color: '#fff' }}
                                        >
                                            {el.icon}
                                        </IconButton>
                                    </Box>
                                    :
                                    <IconButton
                                        key={el.index}
                                        sx={{
                                            width: 'max-content',
                                            color: theme.palette.mode === 'light' ? '#000' : '#fff'
                                        }}
                                        onClick={() => {
                                            setSelected(el.index)
                                            navigate(getPath(el.index))
                                        }}
                                    >
                                        {el.icon}
                                    </IconButton>
                                ))
                            }
                            <Divider sx={{ width: '45px' }} />
                            {
                                selected === 3 ?
                                    <Box
                                        sx={{
                                            backgroundColor: theme.palette.primary.main,
                                            borderRadius: 1.5,
                                        }}
                                    >
                                        <IconButton sx={{ width: 'max-content', color: '#fff' }}>
                                            <Gear />
                                        </IconButton>
                                    </Box>
                                    :
                                    <IconButton
                                        onClick={() => {
                                            setSelected(3)
                                            navigate('/settings')
                                        }}
                                        sx={{
                                            width: 'max-content',
                                            color: theme.palette.mode === 'light' ? '#000' : '#fff'
                                        }}
                                    >
                                        <Gear />
                                    </IconButton>
                            }
                        </Stack>
                    </Stack>

                    <Stack spacing={4} alignItems={'center'}>
                        {/* Theme Switch */}
                        <ThemeSwitch
                            defaultChecked
                            onChange={() => { onToggleMode() }}
                        />
                        <Avatar
                            src={faker.image.avatar()}
                            id="basic-menu"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}

                        >
                            <Stack spacing={1} px={1}>
                                {
                                    Profile_Menu.map((el, idx) => (
                                        <MenuItem
                                            onClick={() => {
                                                handleClick()
                                            }}
                                        >
                                            <Stack
                                                onClick={() => navigate(getMenuPath(idx))}
                                                direction={'row'}
                                                justifyContent={'space-between'}
                                                alignItems={'center'}
                                                sx={{ width: 100 }}
                                            >
                                                <span> {el.title}</span>
                                                {el.icon}
                                            </Stack>
                                        </MenuItem>
                                    ))
                                }
                            </Stack>
                        </Menu>
                    </Stack>
                </Stack >
            </Box >
        </>
    )
}

export default SideBar