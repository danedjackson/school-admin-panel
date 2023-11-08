import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { deleteStudentScoreData, getStudentScoreDataByIdAndGrade } from '../../../data/endpoints';
import { tokens } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ScoreDetailsPopup from '../popupEditScoreDetails';
import ConfirmationDialog from '../../../components/ConfirmationDialog';

const StudentScoreDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [rows, setRows] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const { studentId, studentName, studentGrade } = location.state;
    
    // Opens confirmation component when delete icon is clicked
    const handleDeleteClick = () => {
        setDeleteConfirmationOpen(true);
      };
    
    const handleConfirmDelete = async (scoreId) => {
        deleteStudentScoreData(scoreId);
        // Close confirmation
        setDeleteConfirmationOpen(false);
        // Updates rows after deletion
        const updatedRows = rows.filter((row) => {
            if(row.scoreId != scoreId) return row;
        });
        setRows(updatedRows);
    };

    // Function to handle the onClose Popup event
    const handleScoreDetailsPopupClose = (updatedRecord) => {
        setRows((prevRows) => {
            // Find and update the specific row in the rows state
            return prevRows.map((row) => {
                if (row.scoreId === updatedRecord.scoreId) {
                    // Update the specific row with the new data, assigning the same ID for DataGrid
                    return {id: row.id, ...updatedRecord};
                }
                return row;
            });
        });
    };
    

    // Build the columns for DataGrid
    const columns = [
        { field: 'assignmentId', headerName: 'ASSIGNMENT ID', flex: 1 },
        { field: 'subject', headerName: 'SUBJECT', flex: 1},
        { field: 'grade', headerName: 'GRADE', flex: 1},
        { field: 'score', headerName: 'SCORE', flex: 1 },
        { field: 'dateRecorded', headerName: 'DATE RECORDED', flex: 1 },
        { field: 'comment', headerName: 'COMMENTS', flex: 2},
        // Calls popup component
        { field: 'edit',headerName: 'EDIT', flex: 1, 
            renderCell: () => {
                return <EditIcon onClick={() => setOpenPopup(true)} />
            },
        },
        {field: 'delete', headerName: 'DELETE', flex: 1,
        renderCell: () => (
          <DeleteForeverIcon sx={{ color: 'red' }} onClick={() => handleDeleteClick()} />
        ),
      }
    ]

    // Get initial data from database for DataGrid rows
    useEffect(() => {
        async function fetchData() {
            const initialRows = await getStudentScoreDataByIdAndGrade(studentId, studentGrade);
            setRows(initialRows);
        }
        fetchData();
    }, []);

    return (
        <Box m = '20px'>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    onClick={() => {
                        navigate('/scores');
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>
            </Box>

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
                    onRowSelectionModelChange={(ids) => {
                        // Map the selected IDs to their corresponding rows
                        const selectedRows = ids.map((id) => rows.find((row) => row.id === id));
                        setSelected(selectedRows);
                    }}
                />
            </Box>
            {/* Popup component to edit student scores */}
            <ScoreDetailsPopup 
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                selected = {{...selected, studentId}}
                title = {`${studentName}`}
                onClose = {handleScoreDetailsPopupClose}
            >
            </ScoreDetailsPopup>

            {/* Confirmation component to prompt user before deletion */}
            <ConfirmationDialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
                onConfirm={() => handleConfirmDelete(selected[0]?.scoreId)}
            />
        </Box>
    )
}

export default StudentScoreDetails;