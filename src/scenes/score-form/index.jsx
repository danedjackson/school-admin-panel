import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

const ScoreForm = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAssignmentType, setAssignmentType] = useState(null);

  const isNotMobileDevice = useMediaQuery("(min-width:600px)");
  //TODO: Handle form submission
  const handleFormSubmit = (values) => {
    values.name = selectedName;
    values.subject = selectedSubject;
    values.assignmentType = selectedAssignmentType;
    values.teacherId = teacherId;
    values.studentId = studentNames.find(student => student.label == selectedName);

    if (values.name === null || values.subject === null || values.assignmentType == null || values.studentId == null) {
      console.log("Please select a valid student name and subject.");
    } else {
      console.log(values);
    }
  };
  
  //TODO: Implement some caching of teacher ID
  const teacherId = "653182ff2ddb51f6e2341098";

  const studentNames = [
    { label: 'Dane Dwight Jackson', id: "653153e84849d7cdc02194c9" },
    { label: 'Denise Deborah Jackson', id: "653182ad2ddb51f6e2341097" },
    { label: 'Jamoi Abna Robinson', id: "6536cbc1240dbc727c084f16" },
    { label: 'Vondeen Vonet Robinson', id: "6536f33d37581d225ba89b89" },
    
  ];

  const assignmentType = [
    {label: 'Homework'},
    {label: "Classwork"},
    {label: "Unit Test"},
    {label: "Mid-Term Examination"},
    {label: "End of Year Examination"}
  ]

  const subjects = [
    {label: 'Art'},
    {label: "English"},
    {label: "Mathematics"},
    {label: "Phonics"},
    {label: "Science"}
  ];

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
              <Autocomplete 
                disablePortal
                id = "name-dropdown"
                options = {studentNames}
                value = {selectedName}
                isOptionEqualToValue={(option, value) => option.label.toLowerCase().includes(value.toLowerCase())}
                onInputChange={(_, newValue) => setSelectedName(newValue)}
                sx = {{ gridColumn: "span 3" }}
                renderInput={(params) => 
                    <TextField 
                        variant = "filled" 
                        {...params} 
                        label="Student Name" 
                    />
                }
              />
              <Autocomplete 
                disablePortal
                id = "subject-dropdown"
                options = {subjects}
                value = {selectedSubject}
                varient = "filled"
                isOptionEqualToValue={(option, value) => option.label === value}
                onInputChange={(_, newValue) => setSelectedSubject(newValue)}
                sx = {{ gridColumn: "span 2" }}
                renderInput={(params) => 
                    <TextField 
                        variant = "filled" 
                        {...params} 
                        label="Subject" 
                        onKeyDown = {(e) => {e.preventDefault();}}
                    />
                }
              />
              <Autocomplete 
                disablePortal   
                id = "assignment-type-dropdown"
                options = {assignmentType}
                value = {selectedAssignmentType}
                varient = "filled"
                isOptionEqualToValue={(option, value) => option.label === value}
                onInputChange={(_, newValue) => setAssignmentType(newValue)}
                sx = {{ gridColumn: "span 2" }}
                renderInput={(params) => 
                    <TextField 
                        variant = "filled" 
                        {...params} 
                        label="Assignment Type" 
                        onKeyDown = {(e) => {e.preventDefault();}}
                    />
                }
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
                error={!!touched.score && !!errors.score}
                helperText={touched.score && errors.score}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            
            <Box
                display = "flex"
                justifyContent="left"
                mt = "20px"
                sx={{ gridColumn: "span 3" }}>
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Comment"
                        placeholder = "Enter any commets related to this record score"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.comment}
                        rows={4}
                        name="comment"
                        multiline
                        sx={{ gridColumn: "span 3" }}
                    />
              </Box>
            <Box display="flex" justifyContent="left" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Insert Student Grade
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
  score: yup.string().required("Score is Required"),
});
const initialVals = {
    name: null,
    subject: null,
    score: "",
    comment: "",
    assignmentType: "",
};

export default ScoreForm;