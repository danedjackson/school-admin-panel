import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// Mock... TODO: Pull info from real dataset
import {  useTeacherData } from '../../data/endpoints';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../../components/Header';

const Teachers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { teacherRows } = useTeacherData();

    const columns = [
        { field: 'id', headerName: 'ID'}, 
        {field: 'firstName', headerName: 'FIRST NAME', flex: 1, cellClassName: 'first-name-column--cell'},
        {field: 'lastName', headerName: 'LAST NAME', flex: 1, cellClassName: 'last-name-column--cell'},
        {field: 'age', headerName: 'AGE', type: 'number', headerAlign: 'left', align: 'left'},
        {field: 'contactNumber', headerName: 'PHONE NUMBER', flex: 1},
        {field: 'email', headerName: 'EMAIL ADDRESS', flex: 1},
        {field: 'access', headerName: 'ACCESS LEVEL', flex: 1, headerAlign: 'center', renderCell: ({row: {access}}) => {
            return(
                <Box 
                    width = '60%'
                    m = '0 auto'
                    p = '5px'
                    display = 'flex'
                    justifyContent = 'center'
                    backgroundColor = {
                        access === 'admin' ? colors.greenAccent[600] : colors.greenAccent[700]
                    }
                    borderRadius = '4px'
                >
                    {access === 'admin' && <AdminPanelSettingsOutlinedIcon />}
                    {access === 'manager' && <SecurityOutlinedIcon />}
                    {access === 'user' && <LockOpenOutlinedIcon />}
                    <Typography 
                        color = {colors.grey[100]}
                        sx = {{ ml: '5px' }}
                    >
                        {access}
                    </Typography>
                </Box>
            )
        }},
    ]

    return (
        <Box m = '20px'>
            <Header title = 'TEACHERS' subtitle = 'Managing Teachers' />
            <Box 
                m = '40px 0 0 0'
                height = '75vh'
                // Adjusting the properties for the MUI DataGrid
                sx = {{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    }, 
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none'
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700]
                    },
                    '& .first-name-column--cell' : {
                        color: colors.greenAccent[300],
                    },
                    '& .last-name-column--cell' : {
                        color: colors.greenAccent[300],
                    }
                }}
            >
                <DataGrid
                    rows = {teacherRows}
                    columns = {columns}
                />
            </Box>
        </Box>
    )
}

export default Teachers;