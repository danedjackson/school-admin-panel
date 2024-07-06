import { Box, Button, TextField, Select, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import { createTeacherRecord } from "../../../data/endpoints";

const CreateTeacher = () => {
  const isNotMobileDevice = useMediaQuery("(min-width:600px)");
  
  const handleFormSubmit = async (values, {resetForm}) => {
    let response = await createTeacherRecord(values);
    if (response.httpStatus == 'CREATED') {
      alert(`Successfully created ${response.response.firstName} ${response.response.lastName}'s teacher record`);
      resetForm();
    }
    else {
      alert(`Failed to create ${values.firstName} ${values.lastName}'s teacher record, Please try again.`);
      console.error(`Error creating teacher record: ${response.message}`);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE TEACHER" subtitle="Create a New Teacher Profile" />

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
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
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
            <Box display="flex" justifyContent="left" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Teacher Record
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
  password: yup.string()
      .required("Please enter a password for this teacher account")
      .min(8, "Password must be at least 8 characters"),
  contactNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number of teacher is not valid")
    .required("A valid phone number for teacher is required"),
  address: yup.string().required("Teacher address is required"),
  grade: yup.string().required("Teacher must be assigned to a grade"),
});
const initialVals = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  contactNumber: "",
  address: "",
  grade: ""
};

export default CreateTeacher;