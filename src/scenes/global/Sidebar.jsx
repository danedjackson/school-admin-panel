import { useState } from "react";
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlinedIcon from '@mui/icons-material/PieChartOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';

import useAuth from "../../hooks/useAuth";

const Item = ({ title, to, icon, selected, setSelected, allowedRoles }) => {
    const { auth } = useAuth();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    // Check if the user's role is allowed to see this item
    const isRoleAllowed = allowedRoles ? allowedRoles.includes(auth?.role?.toLowerCase()) : true;

    // Return null if the user's role is not allowed
    if (!isRoleAllowed) {
        return null;
    }
    
    return (
        <MenuItem 
            active = {selected === title} 
            style = {{ color: colors.grey[100] }} 
            onClick = {() => setSelected(title)}
            icon = {icon}
        >
            <Typography>{title}</Typography>
            <Link to = {to}/>
        </MenuItem>
    )
}

const Sidebar = () => {
    const { auth, setAuth } = useAuth(); 
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        setAuth({});
        navigate("/");
    }

    return (
        <Box 
            // Setting box attributes using library variables. Using !important to override
            sx = {{ 
                '& .pro-sidebar-inner': {
                    background: `${colors.primary[400]} !important`
                },
                '& .pro-icon-wrapper': {
                    backgroundColor: 'transparent !important'
                },
                '& .pro-inner-item': {
                    padding: '5px 35px 5px 20px !important'
                },
                '& .pro-inner-item:hover': {
                    color: '#868dfb !important'
                },
                ' & .pro-menu-item.active': {
                    color: '#6870fa !important'
                }
            }}
        >
            <ProSidebar collapsed = {isCollapsed}>
                <Menu iconShape="square">
                    {/* AVATAR AND MENU ICONS */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography 
                                    variant = 'h3' 
                                    color = {colors.grey[100]}
                                >
                                    Example School
                                </Typography>
                                <IconButton onClick = {() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {/*USER*/}
                    {!isCollapsed && (
                        <Box mb = '25px'>
                            <Box display = 'flex' justifyContent = 'center' alignItems = 'center'>
                                <img 
                                    alt = 'user-profile-image'
                                    width = '100px'
                                    height = '100px'
                                    src = '../../assets/user.png'
                                    style = {{ cursor: 'pointer', borderRadius:'50%' }}
                                />
                            </Box>
                            {/* TODO: Pull logged in User info here and display name and role */}
                            <Box textAlign = 'center'>
                                <Typography 
                                    variant = 'h2' 
                                    color = {colors.grey[100]}
                                    fontWeight = 'bold'
                                    sx = { {m: '10px 0 0 0'} }
                                >
                                    {auth.name}
                                </Typography>
                                <Typography 
                                    variant = 'h5'
                                    color = {colors.greenAccent[500]}
                                >
                                    {auth.role}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {/*MENU*/}
                    <Box paddingLeft = {isCollapsed ? undefined : '10%'}>
                        <Item 
                            title = 'Dashboard'
                            to = '/'
                            icon = {<HomeOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        <Typography
                            variant = 'h6'
                            color = {colors.grey[300]}
                            sx = {{ m: '15px 0 5px 20px' }}
                        >
                            Data
                        </Typography>

                        <Item 
                            title = 'Manage Teachers'
                            to = '/teachers'
                            icon = {<PeopleOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['admin']}
                        />
                        <Item 
                            title = 'Contact Information'
                            to = '/contacts'
                            icon = {<ContactsOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['admin', 'teacher']}
                        />
                        <Item 
                            title = 'Student Scores'
                            to = '/scores'
                            icon = {<ReceiptOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['teacher']}
                        />

                        <Typography
                            variant = 'h6'
                            color = {colors.grey[300]}
                            sx = {{ m: '15px 0 5px 20px' }}
                        >
                            Pages
                        </Typography>

                        <Item 
                            title = 'Add User'
                            to = '/form'
                            icon = {<PersonOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['teacher']}
                        />
                        <Item 
                            title = 'Add Student Scores'
                            to = '/score-form'
                            icon = {<AssessmentOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['teacher']}
                        />
                        <Item 
                            title = 'Upload Lesson Plans'
                            to = '/upload-plans'
                            icon = {<GradingOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['admin', 'teacher']}
                        />
                        <Item 
                            title = 'Calendar'
                            to = '/calendar'
                            icon = {<CalendarTodayOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                            allowedRoles={['user']}
                        />
                        <Item 
                            title = 'FAQ'
                            to = '/faq'
                            icon = {<HelpOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        />

                        {/* <Typography
                            variant = 'h6'
                            color = {colors.grey[300]}
                            sx = {{ m: '15px 0 5px 20px' }}
                        >
                            Charts
                        </Typography>

                        <Item 
                            title = 'Bar Chart'
                            to = '/bar'
                            icon = {<BarChartOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        />
                        <Item 
                            title = 'Pie Chart'
                            to = '/pie'
                            icon = {<PieChartOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        />
                        <Item 
                            title = 'Line Chart'
                            to = '/line'
                            icon = {<TimelineOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        />
                        <Item 
                            title = 'Geography Chart'
                            to = '/geography'
                            icon = {<MapOutlinedIcon />}
                            selected = {selected}
                            setSelected = {setSelected}
                        /> */}
                        <Typography
                            variant = 'h6'
                            color = {colors.redAccent[300]}
                            sx = {{ m: '15px 0 5px 20px' }}
                        >
                            Actions
                        </Typography>

                        {/* LOGOUT */}
                        <MenuItem 
                            style = {{ color: colors.grey[100] }} 
                            onClick = {handleLogout}
                            icon = {<LogoutOutlined />}
                        >
                            <Typography>Logout</Typography>
                        </MenuItem>
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
}

export default Sidebar;