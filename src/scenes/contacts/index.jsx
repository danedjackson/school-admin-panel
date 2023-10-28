import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// Mock... TODO: Pull info from real dataset
import { mockDataContacts, getStudentData } from '../../data/endpoints';
import Header from '../../components/Header';

const Contacts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { studentRows } = getStudentData();

    const columns = [
        { field: 'id', headerName: 'ID'}, 
        { field: 'registrarId', headerName: 'REGISTRAR ID' },
        { field: 'firstName', headerName: 'FIRST NAME', flex: 1, cellClassName: 'first-name-column--cell' },
        { field: 'lastName', headerName: 'LAST NAME', flex: 1, cellClassName: 'last-name-column--cell' },
        { field: 'age', headerName: 'AGE', type: 'number', headerAlign: 'left', align: 'left' },
        { field: 'contactNumber', headerName: 'PHONE NUMBER', flex: 1 },
        { field: 'email', headerName: 'EMAIL ADDRESS', flex: 1 },
        { field: 'address', headerName: 'ADDRESS', flex: 1 },
        { field: 'city', headerName: 'CITY' },
        { field: 'zipCode', headerName: 'ZIP CODE' },
    ]

    return (
        <Box m = '20px'>
            <Header title = 'CONTACTS' subtitle = 'Contact Information for Team Members' />
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
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
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
                    rows = {studentRows}
                    columns = {columns}
                    components = {{
                        Toolbar: GridToolbar
                    }}
                />
            </Box>
        </Box>
    )
}

export default Contacts;