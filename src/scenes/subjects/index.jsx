import { Box, Button, IconButton, useTheme, Typography } from '@mui/material';
import Header from '../../components/Header';
import React, { useState, useEffect } from 'react';
import config from '../../config/config.json';
import CreateSubjectPopup from './createSubjectPopup';
import EditSubjectPopup from './editSubjectPopup';
import { getAllSubjects, removeSubject } from '../../data/endpoints';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DataGrid } from '@mui/x-data-grid';
import ConfirmationDialog from '../../components/ConfirmationDialog';

const schoolName = config.SCHOOL_NAME;

const Subjects = () => {
    const theme = useTheme();
    const [openPopup, setOpenPopup] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editSubjectName, setEditSubjectName] = useState('');

    const fetchSubjects = async () => {
        try {
            const subjectNames = await getAllSubjects();
            setSubjects(subjectNames.map((name, idx) => ({
                id: idx + 1,
                name
            })));
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handlePopupClose = async (newSubject) => {
        setOpenPopup(false);
        if (newSubject) {
            await fetchSubjects();
        }
    };

    const handleDeleteClick = () => {
        setDeleteConfirmationOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selected.length > 0) {
            await removeSubject(selected[0].name);
            setDeleteConfirmationOpen(false);
            // Updates rows after deletion
            setSubjects((prev) => prev.filter((row) => row.name !== selected[0].name));
            setSelected([]);
        }
    };

    const columns = [
        { field: 'name', headerName: 'SUBJECT NAME', flex: 1 },
        {
            field: 'edit',
            headerName: 'EDIT',
            flex: 1,
            renderCell: (params) => (
                <EditIcon onClick={() => {
                    setEditSubjectName(params.row.name);
                    setEditPopupOpen(true);
                }} />
            ),
        },
        {
            field: 'delete',
            headerName: 'DELETE',
            flex: 1,
            renderCell: () => (
                <DeleteForeverIcon sx={{ color: 'red' }} onClick={handleDeleteClick} />
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="SUBJECTS" subtitle={`List of subjects at ${schoolName}`} />
            <Box m="40px 0 0 0" height={subjects.length > 0 ? `${Math.min(subjects.length * 60 + 56, 600)}px` : '200px'}>
                <DataGrid
                    rows={subjects}
                    columns={columns}
                    pageSize={subjects.length > 0 ? subjects.length : 10}
                    rowsPerPageOptions={[subjects.length > 0 ? subjects.length : 10]}
                    hideFooterPagination
                    onRowSelectionModelChange={(ids) => {
                        const selectedRows = ids.map((id) => subjects.find((row) => row.id === id));
                        setSelected(selectedRows);
                    }}
                />
                <Button color="secondary" variant="contained" onClick={() => setOpenPopup(true)} sx={{ mt: 2 }}>
                    Add Subject
                </Button>
                <CreateSubjectPopup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    onClose={handlePopupClose}
                />
                <EditSubjectPopup
                    openPopup={editPopupOpen}
                    setOpenPopup={setEditPopupOpen}
                    oldSubjectName={editSubjectName}
                    onClose={async (updatedName) => {
                        setEditPopupOpen(false);
                        if (updatedName) {
                            await fetchSubjects();
                        }
                    }}
                />
                <ConfirmationDialog
                    open={deleteConfirmationOpen}
                    onClose={() => setDeleteConfirmationOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            </Box>
        </Box>
    );
};

export default Subjects;