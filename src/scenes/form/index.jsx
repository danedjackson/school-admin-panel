import { Box, Button, TextField, Select, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createStudentRecord } from "../../data/endpoints";
//Date Picker
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Form = () => {
  const maxDateOfBirth = dayjs().subtract(4, 'year');
  const minDateOfBirth = maxDateOfBirth.subtract(18, 'year');
  const isNotMobileDevice = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = async (values, {resetForm}) => {
    let response = await createStudentRecord(values);
    if (response.httpStatus == 'CREATED') {
      alert(`Successfully created ${response.response.firstName} ${response.response.lastName}'s student record`);
      resetForm();
    }
    else {
      alert(`Failed to create ${values.firstName} ${values.lastName}'s student record, Please try again.`);
      console.error(`Error creating student record: ${response.message}`);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE STUDENT" subtitle="Create a New Student Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialVals}
        validationSchema={checkoutSchema}
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
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNotMobileDevice ? undefined : "span 3" },
              }}
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
              {/* This component should call an endpoint which only creates student records */}
              {/*<Typography sx={{gridColumn: "span 3"}}>
                Type of User
              </Typography>
              <Select
                labelId="type-select-label"
                id="type-select"
                name="type"
                variant="filled"
                value={values.type}
                label="Type of User"
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{gridColumn: "span 3"}}
              >
                <MenuItem value={0}>Teacher</MenuItem>
                <MenuItem value={1}>Student</MenuItem>
              </Select> */}
            </Box>
            <Box display="flex" justifyContent="left" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Student Record
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup.string().email("Invalid Email Format").required("Email is Required"),
  contactNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number of student or guardian is not valid")
    .required("A valid phone number for student or guardian is required"),
  address: yup.string().required("Student address is required"),
  grade: yup.string().required("Student must belong to a grade"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
});
const initialVals = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  address: "",
  grade: "",
  dateOfBirth: null,
};

export default Form;