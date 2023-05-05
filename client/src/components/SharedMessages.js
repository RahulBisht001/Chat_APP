import React, { useState } from 'react'

import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { CaretLeft } from 'phosphor-react'


import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../Redux/Slices/app'
import { faker } from '@faker-js/faker'
import { SHARED_Docs, SHARED_Links } from '../data'
import { DocMsg, LinkMsg } from './Conversation/MessageType'





const SharedMessages = () => {

    const theme = useTheme()
    const dispatch = useDispatch()

    //! This State and handleChange function is for the tabs

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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
                            <Typography variant='subtitle2'> Media,Link & Docs </Typography>

                        </Stack>
                    </Box>

                    {/* Three Tabs for Three Different Media Items */}
                    <Tabs value={value} onChange={handleChange} centered  >
                        <Tab label="Media" disableTouchRipple={true} />
                        <Tab label="Links" disableTouchRipple={true} />
                        <Tab label="Docs" disableTouchRipple={true} />
                    </Tabs>

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
                        {
                            (() => {
                                switch (value) {
                                    case 0:
                                        // Images
                                        return (<Grid container spacing={1}>
                                            {
                                                [1, 2, 3, 4, 5].map((el) => (
                                                    <Grid item xs={4}>
                                                        <img src={faker.image.avatar()} alt={faker.name.firstName()} />
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>)
                                    case 1:
                                        return SHARED_Links.map((el) => (<LinkMsg el={el} />))
                                    case 2:
                                        return SHARED_Docs.map((el) => (<DocMsg el={el} />))
                                    default:
                                        break
                                }
                            })()
                        }

                    </Stack >

                </Stack>
            </Box>
        </>
    )
}

export default SharedMessages