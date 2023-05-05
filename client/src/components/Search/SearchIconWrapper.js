import { styled, } from '@mui/material/styles'


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    position: 'absolute',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}))

export default SearchIconWrapper