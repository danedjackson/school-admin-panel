import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { scoreData } from '../../data/endpoints';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../hooks/useAuth';

const Scores = () => {
    const theme = useTheme();
    const { auth } = useAuth();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const scoreRows = scoreData(auth?.grade);

    const columns = [
        //{ field: 'id', headerName: 'ID'}, 
        { field: 'firstName', headerName: 'FIRST NAME', flex: 1 },
        { field: 'middleName', headerName: 'MIDDLE NAME', flex: 1 },
        { field: 'lastName', headerName: 'LAST NAME', flex: 1 },
        { field: 'grade', headerName: 'GRADE', flex: 1 },
        {
            field: 'mathematics', headerName: 'MATHEMATICS', flex: 1, type: 'number', headerAlign: 'left', align: 'left',
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
            valueGetter: (params) => params.row.averages?.science?.average || null, headerAlign: 'left', align: 'left',
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                    {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'english', headerName: 'ENGLISH', flex: 1, type: 'number', 
            valueGetter: (params) => params.row.averages?.english?.average || null, headerAlign: 'left', align: 'left',
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                    {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'art', headerName: 'ART', flex: 1, type: 'number',
            valueGetter: (params) => params.row.averages?.art?.average || null, headerAlign: 'left', align: 'left',
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                    {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        { field: 'phonics', headerName: 'PHONICS', flex: 1, type: 'number',
            valueGetter: (params) => params.row.averages?.phonics?.average || null, headerAlign: 'left', align: 'left',
            renderCell: (params) => {
            return (
                <Typography color={colors.greenAccent[500]}>
                    {params.value === null ? "N/A" : params.value}
                </Typography>
            );
            }
        },
        // Only activate the edit icon when a single row is selected
        {   flex: 1, 
            field: "edit",
            headerName: "",
            renderCell: (params) => {
            const rowIsSelected = selected.includes(params.row);
            return rowIsSelected && selected.length == 1? (
                <EditIcon onClick={handleOpenStudentInfo} />
            ) : null;
            },
        }
    ]

    const handleOpenStudentInfo = () => {
        
        navigate('/student-info', {state:{
            studentId: selected[0].studentId,
            studentName: `${selected[0].firstName} ${selected[0].lastName}`,
            studentGrade: selected[0].grade,
        }});
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
                {selected.length > 1 && (
                    <Button variant="contained">
                        Print All
                    </Button>
                )}
            </Box>
        </Box>
    )
}

export default Scores;