import React from 'react'
import { Box, Divider, IconButton, Stack } from '@mui/material'

//! This is Temporary sol. for Development : For Product download these link
import google from '../../assets/Images/Google.png'
import github from '../../assets/Images/Github.png'
import twitter from '../../assets/Images/Twitter.png'


const AuthSocial = () => {
    return (
        <>
            <Box>
                <Divider
                    sx={{
                        color: 'text.disabled',
                        typography: 'overline',
                        my: 2.5,
                        // "&::before , ::after": {
                        //     borderTopStyle: "dashed"
                        // }
                    }}
                >OR
                </Divider>
                <Stack direction={'row'} spacing={2} justifyContent={'center'}>
                    <IconButton>
                        <img src={google} alt="Google" width={'30em'} height={'auto'} />
                    </IconButton>
                    <IconButton>
                        <img src={github} alt="Github" width={'30em'} height={'auto'} />
                    </IconButton>
                    <IconButton>
                        <img src={twitter} alt="Twitter" width={'30em'} height={'auto'} />
                    </IconButton>
                </Stack>
            </Box>
        </>
    )
}

export default AuthSocial