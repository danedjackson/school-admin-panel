import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from 'react';

const LessonPlansPopup = (props) => {
    console.log(`props ${JSON.stringify(props, null, 2)}`);
    const { teacher, openPopup, onClose } = props;

    const handleOpenPopup = () => {
        
    };

    const handleClosePopup = () => {
        onClose();
    };

    return (
        <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>
                <Typography variant='h4'>
                    Lesson Plans for {teacher?.firstName} {teacher?.lastName}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teacher?.lessonPlans.map(plan => (
                            <TableRow key={plan?.id}>
                                <TableCell>{plan?.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}

export default LessonPlansPopup;
