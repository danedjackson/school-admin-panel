import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
// Mock... TODO: Pull info from real dataset
import { mockDataInvoices, scoreData } from '../../data/endpoints';
import Header from '../../components/Header';

const Scores = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState([]);

    const scoreRows = scoreData();

    const columns = [
        { field: 'id', headerName: 'ID'}, 
        { field: 'firstName', headerName: 'FIRST NAME', flex: 1 },
        { field: 'middleName', headerName: 'MIDDLE NAME', flex: 1 },
        { field: 'lastName', headerName: 'LAST NAME', flex: 1 },
        { field: 'grade', headerName: 'GRADE', flex: 1 },
        {
            field: 'mathematics',
            headerName: 'MATHEMATICS',
            flex: 1,
            type: 'number', // Set the column type to 'number'
            valueGetter: (params) => params.row.averages?.mathematics?.average || null,
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'science', headerName: 'SCIENCE', flex: 1, type: 'number',
            valueGetter: (params) => params.row.averages?.science?.average || null,
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'english', headerName: 'ENGLISH', flex: 1, type: 'number', 
            valueGetter: (params) => params.row.averages?.english?.average || null,
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'art', headerName: 'ART', flex: 1, type: 'number',
            valueGetter: (params) => params.row.averages?.art?.average || null,
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
    ]

    const handleOpenModal = () => {
        console.log(selected);
    }

    return (
        <Box m = '20px'>
            <Header title = 'STUDENT SCORES' subtitle = 'List of Students and their score averages' />
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
                    rows = {scoreRows}
                    columns = {columns}
                    // TODO: Handle what should happen to selected items
                    onRowSelectionModelChange={(ids) => {
                        // Map the selected IDs to their corresponding rows
                        const selectedRows = ids.map((id) => scoreRows.find((row) => row.id === id));
                        setSelected(selectedRows);
                    }}
                />
                {selected.length > 0 && (
                    <Button variant="contained" onClick={handleOpenModal}>
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default Scores;