import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import React, { useState, useEffect } from 'react';
import config from '../../config/config.json';
import CreateSubjectPopup from './createSubjectPopup';
import { getAllSubjects, saveSubject } from '../../data/endpoints';

const schoolName = config.SCHOOL_NAME;

const Subjects = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [subjects, setSubjects] = useState([]);

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
            // Save subject and refresh list
            await fetchSubjects();
        }
    };

    return (
        <Box m = '20px'>
            <Header title = 'SUBJECTS' subtitle = {`List of subjects at ${schoolName}`} />
            <Box m = '40px 0 0 0' height = '75vh'>
                <ul>
                    {subjects.map(subject => (
                        <li key={subject.id}>{subject.name}</li>
                    ))}
                </ul>
                <Button color="secondary" variant="contained" onClick={() => setOpenPopup(true)}>
                    Add Subject
                </Button>
                <CreateSubjectPopup
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    onClose={handlePopupClose}
                />
            </Box>
        </Box>
    );
};

export default Subjects;