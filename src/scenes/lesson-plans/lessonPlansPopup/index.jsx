import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Typography, Box, Button } from "@mui/material";
import { useState } from 'react';
import { getLessonPlanDocument, updateLessonPlanComments } from '../../../data/endpoints';

const LessonPlansPopup = (props) => {
    const { teacher, openPopup, onClose } = props;
    const [lessonPlanDocument, setLessonPlanDocument] = useState([]);
    const [updatedComments, setUpdatedComments] = useState({});

    const fetchLessonPlanDocument = async (planId) => {
        // Fetch the lesson plan document
        const lessonPlan = await getLessonPlanDocument(planId);
        setLessonPlanDocument(lessonPlan.response);
        
        // Create a new window to display the PDF
        var newWindow = window.open('', "Window");
        var obj = document.createElement('object');
        obj.style.width = '100%';
        obj.style.height = '842pt';
        obj.type = 'application/pdf';
        obj.data = 'data:application/pdf;base64,' + lessonPlanDocument.document.data;
        newWindow.document.body.appendChild(obj);
       
    }

    const handleOpenPopup = () => {
        
    };

    const handleClosePopup = () => {
        onClose();
    };

    const appendCommentChanges = (planId, comments) => {
        setUpdatedComments(prevComments => ({
            ...prevComments,
            [planId]: comments
        }));
    }

    const updateComments = async () => {
    // Logic to update comments
    console.log(JSON.stringify(updatedComments,null,2));
    let response = await updateLessonPlanComments(updatedComments);
    // TODO:Give error popup in the event updating comments fail
    onClose();
  };

    // TODO: Make it possible to adjust comment in this popup
    return (
        <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>
                <Typography variant='h2'>
                    Lesson Plans for {teacher?.firstName} {teacher?.lastName}
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Comments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teacher?.lessonPlans.map(plan => (
                            <TableRow key={plan?.id}>
                                <TableCell 
                                    onClick={() => fetchLessonPlanDocument(plan.id)}
                                >
                                    {plan?.title}
                                </TableCell>
                                <TableCell>
                                <textarea
                                    defaultValue={plan?.comments || ''}
                                    rows={4}
                                    // readOnly={false}
                                    onChange={(e) => {
                                        const updatedComments = e.target.value;
                                        // Function to update comments
                                        appendCommentChanges(plan.id, updatedComments);
                                    }}
                                />
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Box mt="20px">
                        <Button 
                            color="primary" 
                            variant="contained" 
                            onClick={() => updateComments()}
                            sx={{ marginRight: '30px' }} 
                        >
                            Save Changes  
                        </Button>
                        <Button 
                            color="secondary" 
                            variant="contained" 
                            onClick={() => handleClosePopup()}
                        >
                            Back 
                        </Button>
                    </Box>
                </Table>
                </Box>
            </DialogContent>
        </Dialog>
        
    );
}

export default LessonPlansPopup;
