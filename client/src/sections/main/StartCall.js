import React from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';


// Todo -> Create a Component for it
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StartCall = ({ open, handleClose }) => {
    return (
        <>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                sx={{ p: 4, }}
                onClose={handleClose}
            >
                {/* Title */}
                <DialogTitle sx={{ mb: 2 }}>Start Call</DialogTitle>
                {/* Content */}
                <DialogContent className='scrollbar'>
                    <Stack spacing={2}>
                        <Stack sx={{ width: '100%' }}>
                            <Search>
                                <SearchIconWrapper>
                                    <MagnifyingGlass color='#709ce6' />
                                </SearchIconWrapper>
                                <StyledInputBase placeholder='Search . . .' />
                            </Search>
                        </Stack>
                        {/* Call List */}
                        {MembersList.map((el) => (
                            <CallElement {...el} />
                        ))}
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default StartCall