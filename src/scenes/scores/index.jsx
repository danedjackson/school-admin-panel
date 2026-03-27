import { Box, Button, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { getAllSubjects, scoreData } from '../../data/endpoints';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import useAuth from '../../hooks/useAuth';

const Scores = () => {
    const theme = useTheme();
    const { auth } = useAuth();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState([]);
    const [scoreRows, setScoreRows] = useState([]);
    const [subjectFields, setSubjectFields] = useState([
        // fallback static fields if API fails
        'mathematics', 'science', 'english', 'art', 'phonics'
    ]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await scoreData(auth?.grade);
            setScoreRows(data);
          } catch (error) {
            console.error('Error fetching scores data:', error);
          }
        };
    
        fetchData();
      }, [auth?.grade]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjects = await getAllSubjects();
                // Lowercase for matching averages keys
                setSubjectFields(subjects.map(s => s.toLowerCase()));
            } catch (error) {
                // fallback to static fields
            }
        };
        fetchSubjects();
    }, []);

    // Dynamically build columns for subjects
    const subjectColumns = subjectFields.map(subject => ({
        field: subject,
        headerName: subject.toUpperCase(),
        flex: 1,
        type: 'number',
        valueGetter: (params) => params.row.averages?.[subject]?.average || null,
        headerAlign: 'left',
        align: 'left',
        renderCell: (params) => (
            <Typography color={colors.greenAccent[500]}>
                {params.value === null ? "N/A" : params.value}
            </Typography>
        )
    }));

    const columns = [
        { field: 'firstName', headerName: 'FIRST NAME', flex: 1 },
        { field: 'middleName', headerName: 'MIDDLE NAME', flex: 1 },
        { field: 'lastName', headerName: 'LAST NAME', flex: 1 },
        { field: 'grade', headerName: 'GRADE', flex: 1 },
        ...subjectColumns,
        {
            flex: 1,
            field: "edit",
            headerName: "",
            renderCell: (params) => {
                const rowIsSelected = selected.includes(params.row);
                return rowIsSelected && selected.length == 1 ? (
                    <EditIcon onClick={handleOpenStudentInfo} />
                ) : null;
            },
        }
    ]

    const handleOpenStudentInfo = () => {
        
        navigate('/student-score-info', {state:{
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