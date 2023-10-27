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

    if (values.name === null || values.subject === null || values.assignmentType == null) {
      console.log("Please select a valid student name and subject.");
    } else {
      console.log(values);
    }
  };
  

  const studentNames = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
      label: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
      label: 'The Lord of the Rings: The Fellowship of the Ring',
      year: 2001,
    },
    {
      label: 'Star Wars: Episode V - The Empire Strikes Back',
      year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
      label: 'The Lord of the Rings: The Two Towers',
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
      label: 'Star Wars: Episode IV - A New Hope',
      year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
      label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
      label: 'Star Wars: Episode VI - Return of the Jedi',
      year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
      label: 'Eternal Sunshine of the Spotless Mind',
      year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
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
                isOptionEqualToValue={(option, value) => option.label === value}
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