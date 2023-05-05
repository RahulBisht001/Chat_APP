import { faker } from "@faker-js/faker"
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

import StyledBadge from "./StyledBadge";


const ChatElement = ({ id, name, img, msg, time, unread, online }) => {
    const theme = useTheme()

    return <Box
        sx={{
            width: '100%',
            // height: 60,
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
            borderRadius: 2,
            margin: '10px 0'
        }}
        p={2}
    >
        <Stack
            direction='row'
            alignItems={'center'}
            justifyContent={'space-between'}
            spacing={2}
        >
            <Stack direction='row' spacing={2}>
                {
                    online
                        ?
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={faker.image.avatar()} />
                        </StyledBadge>
                        :
                        <Avatar src={faker.image.avatar()} />
                }

                <Stack spacing={0.3}>
                    <Typography variant='subtitle2'>
                        {name}
                    </Typography>
                    <Typography variant='caption'>
                        {msg}
                    </Typography>
                </Stack>
            </Stack>

            <Stack spacing={2} alignItems={'center'}>
                <Typography sx={{ fontWeight: 600 }} variant={'caption'}>
                    {time}
                </Typography>
                <Badge color='primary' badgeContent={unread}>
                </Badge>
            </Stack>
        </Stack>
    </Box>
}


export default ChatElement