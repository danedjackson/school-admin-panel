import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// Mock... TODO: Pull info from real dataset
import { mockDataInvoices } from '../../data/mockData';
import Header from '../../components/Header';

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState([]);

    const columns = [
        { field: 'id', headerName: 'ID'}, 
        { field: 'name', headerName: 'NAME', flex: 1, cellClassName: 'name-column--cell' },
        { field: 'phone', headerName: 'PHONE NUMBER', flex: 1 },
        { field: 'email', headerName: 'EMAIL ADDRESS', flex: 1 },
        { field: 'cost', headerName: 'COST', flex: 1, renderCell: ({row: {cost}}) => {
            <Typography color = {colors.greenAccent[500]}>
                ${cost}
            </Typography>
        } },
        { field: 'date', headerName: 'DATE', flex: 1 },
    ]

    return (
        <Box m = '20px'>
            <Header title = 'INVOICES' subtitle = 'List of Invoice Balances' />
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
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .name-column--cell' : {
                        color: colors.greenAccent[300],
                    }
                }}
            >
                <DataGrid
                    checkboxSelection
                    rows = {mockDataInvoices}
                    columns = {columns}
                    // TODO: Handle what should happen to selected items
                    onRowSelectionModelChange={(ids) => setSelected(ids)}
                />
                {selected.length > 0 && (
                    <button autoFocus>Implement Some Logic to Handle this!</button>
                )}
            </Box>
        </Box>
    )
}

export default Invoices;