import { useState, useEffect } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { saveStudentScoreData } from "../../data/endpoints";
import { getStudentDropdownData } from '../../data/transforms/student';
import { getAssignmentDropdownData, getSubjectDropdownData } from '../../data/transforms/subject';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from '../../hooks/useAuth';

const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}`;
}

const ScoreForm = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedAssignmentType, setAssignmentType] = useState(null);
  const [studentNamesDropdown, setStudentNamesDropdown] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchStudentNames = async () => {
      try {
        const data = await getStudentDropdownData();
        setStudentNamesDropdown(data);
      } catch (error) {
        console.error('Error fetching student names:', error);
      }
    };

    fetchStudentNames();
  }, []);

  const isNotMobileDevice = useMediaQuery("(min-width:600px)");

  const assignmentType = getAssignmentDropdownData();

  const subjects = getSubjectDropdownData();

  // Handle form submission
  const handleFormSubmit = (values) => {
    if (selectedName === null | selectedSubject === null || selectedAssignmentType === null){
        return alert("Please ensure a valid student name, subject and assignment type are present");
    }
    // Create Request Object
    values.name = selectedName;
    values.subject = selectedSubject?.toLowerCase();
    values.assignmentType = selectedAssignmentType;
    values.teacherId = auth?.id;

    const studentNameRecord = studentNamesDropdown.find(student => student.label === selectedName);
    const assignmentRecord = assignmentType.find(assignment => assignment.label === selectedAssignmentType);

    values.studentId = studentNameRecord.id;
    values.grade = studentNameRecord.grade;
    values.dateRecorded = new Date();
    values.assignmentId = `${getDate()}${assignmentRecord.id}`;
    
    if (values.studentId === null) {
      alert("Please select a valid student name and subject.");
    } else {
        saveStudentScoreData(values)
          .then((response) => {
            if(response.httpStatus == "OK") {
                //alert("Successfully stored score");
            }
            else {
                alert("Failed to save student score data");
            }
          })
          .catch((error) => {
            console.error("Error while saving student score data:", error);
          });
    }
  };
  
  const checkoutSchema = yup.object().shape({
    score: yup.string().required("Score is Required"),
  });

  const initialVals = {
    name: null,
    subject: null,
    score: "",
    comment: "",
    assignmentType: null,
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={(values, {resetForm}) => {
            handleFormSubmit(values);
            resetForm({values: initialVals});
            setSelectedName(null);
            setSelectedSubject(null);
            setAssignmentType(null);
        }}
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
                id="name-dropdown"
                options={studentNamesDropdown}
                value={selectedName}
                isOptionEqualToValue={(option, value) => option.label.toLowerCase().includes(value.toLowerCase())}
                onInputChange={(_, newValue) => setSelectedName(newValue)}
                sx={{ gridColumn: "span 3" }}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    {...params}
                    label="Student Name"
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="subject-dropdown"
                options={subjects}
                value={selectedSubject}
                varient="filled"
                isOptionEqualToValue={(option, value) => option.label === value}
                onInputChange={(_, newValue) => setSelectedSubject(newValue)}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    {...params}
                    label="Subject"
                    onKeyDown={(e) => { e.preventDefault(); }}
                  />
                )}
              />
              <Autocomplete
                disablePortal
                id="assignment-type-dropdown"
                options={assignmentType}
                value={selectedAssignmentType}
                varient="filled"
                isOptionEqualToValue={(option, value) => option.label === value}
                onInputChange={(_, newValue) => setAssignmentType(newValue)}
                sx={{ gridColumn: "span 2" }}
                renderInput={(params) => (
                  <TextField
                    variant="filled"
                    {...params}
                    label="Assignment Type"
                    onKeyDown={(e) => { e.preventDefault(); }}
                  />
                )}
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
              display="flex"
              justifyContent="left"
              mt="20px"
              sx={{ gridColumn: "span 3" }}
            >
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
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            <Box display="flex" justifyContent="left" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Insert Student Score
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ScoreForm;
