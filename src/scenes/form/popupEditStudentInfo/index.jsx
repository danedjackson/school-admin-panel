import { Dialog, DialogTitle, DialogContent } from '@mui/material'
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { updateStudentRecord } from '../../../data/endpoints';
import Header from '../../../components/Header';
import useAuth from '../../../hooks/useAuth';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const StudentDetailsPopup = (props) => {
    const { title, selected, openPopup, setOpenPopup } = props;
    const { auth } = useAuth();
    
    const maxDateOfBirth = dayjs().subtract(4, 'year');
    const minDateOfBirth = maxDateOfBirth.subtract(18, 'year');

    const initialVals = {
        firstName: selected[0]?.firstName,
        lastName: selected[0]?.lastName,
        email: selected[0]?.email,
        contactNumber: selected[0]?.contactNumber,
        address: selected[0]?.address,
        grade: selected[0]?.grade,
        dateOfBirth: selected[0]?.dateOfBirth ? dayjs(selected[0].dateOfBirth) : null,
    };
    
    const updateStudentInfo = async (selected, values) => {
        const request = {
            ...values, 
            id: selected[0]?.studentId,
            teacherId: auth?.id,
        };
        const updatedRecord = await updateStudentRecord(request);
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
                    Edit {title}'s Details
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
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={!!touched.firstName && !!errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Middle Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.middleName}
                                    name="middleName"
                                    error={!!touched.middleName && !!errors.middleName}
                                    helperText={touched.middleName && errors.middleName}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={!!touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 3" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Contact Number"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.contactNumber}
                                    name="contactNumber"
                                    error={!!touched.contactNumber && !!errors.contactNumber}
                                    helperText={touched.contactNumber && errors.contactNumber}
                                    sx={{ gridColumn: "span 3" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.address}
                                    name="address"
                                    error={!!touched.address && !!errors.address}
                                    helperText={touched.address && errors.address}
                                    sx={{ gridColumn: "span 3" }}
                                />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer 
                                    components={['DatePicker']}
                                    sx={{gridColumn: "span 3"}}>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={values.dateOfBirth}
                                        onChange={(newValue) => {
                                        handleChange({
                                            target: { name: 'dateOfBirth', value: newValue }
                                        });
                                        }}
                                        // validation message
                                        slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            variant: "filled",
                                            error: !!touched.dateOfBirth && !!errors.dateOfBirth,
                                            helperText: touched.dateOfBirth && errors.dateOfBirth,
                                        },
                                        }}
                                        sx={{gridColumn: "span 3"}}
                                        maxDate={maxDateOfBirth}
                                        minDate={minDateOfBirth}
                                    />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Grade"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.grade}
                                    name="grade"
                                    error={!!touched.grade && !!errors.grade}
                                    helperText={touched.grade && errors.grade}
                                    sx={{ gridColumn: "span 3" }}
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
                                    onClick = {() => updateStudentInfo(selected, values)}
                                >
                                    Update Student Info
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

export default StudentDetailsPopup;