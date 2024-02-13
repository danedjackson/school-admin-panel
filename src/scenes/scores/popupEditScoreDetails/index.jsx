import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { Box, Button, TextField, Select, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import { updateStudentScoreData } from '../../../data/endpoints';
import Header from '../../../components/Header';
import useAuth from '../../../hooks/useAuth';


const ScoreDetailsPopup = (props) => {
    const { title, selected, openPopup, setOpenPopup } = props;
    const { auth } = useAuth();
    
    const initialVals = {
        subject: selected[0]?.subject,
        score: selected[0]?.score,
        comment: selected[0]?.comment,
        //assignmentType: selected.assignmentType,
    };

    const updateStudentScore = async (selected, values) => {
        const request = {
            ...values, 
            studentId: selected?.studentId,
            grade: selected[0]?.grade,
            scoreId: selected[0]?.scoreId,
            assignmentId: selected[0]?.assignmentId,
            dateRecorded: selected[0]?.dateRecorded,
            //TODO: Take this teacherId from cookies
            // teacherId: "653182ff2ddb51f6e2341098"
            teacherId: auth?.id
        };
        
        const updatedRecord = await updateStudentScoreData(request);
        if (null == updatedRecord) {
            //TODO: Make a toast message which displays "No changes made"
            return;
        }
        
        props.onClose(updatedRecord);

        setOpenPopup(false);
    }
    
    return (
        <Dialog open = {openPopup}>
            <DialogTitle>
                <Typography variant='h4'>
                    Edit {title}'s Score
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Box m="20px">
                    <Header title={`${title.toUpperCase()}`} />

                    <Formik
                        initialValues={ initialVals }
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
                                    label="Subject"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.subject}
                                    disabled
                                    name="subject"
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Score"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.score}
                                    name="score"
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Comment"
                                    placeholder="Enter any comments related to this record score"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.comment}
                                    rows={4}
                                    name="comment"
                                    multiline
                                    sx={{ gridColumn: "span 2" }}
                                />
                            </Box>
                            <Box 
                                display="flex" 
                                justifyContent="left" 
                                mt="20px"
                            >
                                <Button 
                                    type="submit" 
                                    color="secondary" 
                                    variant="contained"
                                    sx={{ marginRight: '30px' }} 
                                    onClick = {() => updateStudentScore(selected, values)}
                                    // onClick={() => console.log(initialVals)}
                                >
                                    Update Score
                                </Button>
                                <Button 
                                    color="primary" 
                                    variant="contained" 
                                    onClick={() => setOpenPopup(false)}
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
    )
}

export default ScoreDetailsPopup;