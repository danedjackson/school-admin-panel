import { Box, Button } from '@mui/material';
import Header from '../../components/Header';
import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/config.json';

const schoolName = config.SCHOOL_NAME;

const subjects = [
    { id: 1, name: 'Mathematics' },
    { id: 2, name: 'Science' },
    { id: 3, name: 'History' },
    // Add more subjects as needed
];

const Subjects = () => {
    return (
        <Box m = '20px'>
            <Header title = 'SUBJECTS' subtitle = {`List of subjects at ${schoolName}`} />
            <Box m = '40px 0 0 0' height = '75vh'>
                <ul>
                    {subjects.map(subject => (
                        <li key={subject.id}>{subject.name}</li>
                    ))}
                </ul>
                <Link to="/subjects/createSubject">
                    <Button color="secondary" variant="contained">Add Subject</Button>
                </Link>
            </Box>
        </Box>
    );
};

export default Subjects;