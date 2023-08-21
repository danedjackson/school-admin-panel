import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import LightModeOutlinedIcon  from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import  SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';;
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    return (
        // Top bar allocating space for search bar on left and icons on the right
        <Box display = "flex" justifyContent = "space-between" p = {2}>
            <Box display = "flex" backgroundColor = {colors.primary[400]} borderRadius = "3px">
                <InputBase sx = {{ ml: 2, flex: 1 }} placeholder = "Search" />
                <IconButton type = "button" sx = {{ p: 1 }}>
                    <SearchOutlinedIcon />
                </IconButton>
            </Box>

            <Box display = "flex">
                <IconButton>
                    <NotificationsOffOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsSuggestOutlinedIcon />
                </IconButton>
                <IconButton>
                    <PersonOutlineOutlinedIcon />
                </IconButton>
                <IconButton onClick = {colorMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ? 
                        (<LightModeOutlinedIcon />) : 
                        (<DarkModeOutlinedIcon />)
                    }
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;