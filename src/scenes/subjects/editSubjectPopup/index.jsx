import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Header from '../../../components/Header';
import { updateSubject } from '../../../data/endpoints';

const EditSubjectPopup = (props) => {
    const { openPopup, setOpenPopup, onClose, oldSubjectName } = props;

    const initialVals = {
        subjectName: oldSubjectName || ''
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            // Call updateSubject endpoint
            await updateSubject(oldSubjectName, values.subjectName);
            if (onClose) onClose(values.subjectName);
        } catch (error) {
            console.error('Error updating subject:', error);
        }
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
                    Update Subject Name
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box m="20px">
                    <Header title={`SUBJECT NAME: ${oldSubjectName}`} />
                    <Formik
                        initialValues={initialVals}
                        enableReinitialize
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
                                        label="New Subject Name"
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
                                        Update Subject
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

export default EditSubjectPopup;
