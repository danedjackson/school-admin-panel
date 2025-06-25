import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Header from '../../../components/Header';
import { saveSubject } from '../../../data/endpoints';

const CreateSubjectPopup = (props) => {
    const { openPopup, setOpenPopup, onClose } = props;

    const initialVals = {
        subjectName: ''
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Call saveSubject endpoint
            await saveSubject(values.subjectName);
            // Optionally call onClose with new subject name
            if (onClose) onClose(values.subjectName);
        } catch (error) {
            console.error('Error saving subject:', error);
        }
        // Reset form fields and close popup
        resetForm();
        setOpenPopup(false);
    };

    const handleClose = () => {
        setOpenPopup(false);
        if (onClose) onClose(null);
    };

    return (
        <Dialog open={openPopup} onClose={handleClose}>
            <DialogTitle>
                <Typography variant='h4'>
                    Add Subject
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box m="20px">
                    <Header title="CREATE SUBJECT" />
                    <Formik
                        initialValues={initialVals}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                                >
                                    <TextField
                                        fullWidth
                                        variant="filled"
                                        type="text"
                                        label="Subject Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.subjectName}
                                        name="subjectName"
                                        required
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                </Box>
                                <Box display="flex" justifyContent="left" mt="20px">
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        sx={{ marginRight: '30px' }}
                                    >
                                        Add Subject
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSubjectPopup;