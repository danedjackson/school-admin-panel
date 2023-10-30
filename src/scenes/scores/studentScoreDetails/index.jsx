import { DataGrid } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getStudentScoreDataByIdAndGrade } from '../../../data/endpoints';
import Header from '../../../components/Header';
import { tokens } from '../../../theme';

const StudentScoreDetails = () => {
    const location = useLocation();
    const { studentId, studentName, studentGrade } = location.state;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    // Build the columns for DataGrid
    const columns = [
        { field: 'assignmentId', headerName: 'ASSIGNMENT ID', flex: 1 },
        { field: 'subject', headerName: 'SUBJECT', flex: 1},
        { field: 'grade', headerName: 'GRADE', flex: 1},
        { field: 'score', headerName: 'SCORE', flex: 1 },
        { field: 'dateRecorded', headerName: 'DATE RECORDED', flex: 1 },
    ]

    // Get data from database for DataGrid rows
    const rows = getStudentScoreDataByIdAndGrade(studentId, studentGrade);
    console.log(rows);

    return (
        <Box m = '20px'>
            <Header title = {`${studentName.toUpperCase()} GRADES`} subtitle = 'List of recorded assignments' />
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
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Box>
        </Box>
    )
}

export default StudentScoreDetails;