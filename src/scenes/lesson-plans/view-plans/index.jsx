import { useState, useEffect } from 'react';
import { getAllTeachersWithLessonPlans } from '../../../data/endpoints';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../../theme';
import Header from '../../../components/Header';

export const LessonPlans = () => {

  const [teachersWithLessonPlans, setTeachersWithLessonPlans] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchTeachersWithLessonPlans = async () => {
      const plans = await getAllTeachersWithLessonPlans();
      setTeachersWithLessonPlans(plans.response);
    }
    fetchTeachersWithLessonPlans();
  }, []);

  const columns = [
    {
      field: "firstName",
      headerName: "FIRST NAME",
      flex: 1,
      cellClassName: "first-name-column--cell",
    },
    {
      field: "lastName",
      headerName: "LAST NAME",
      flex: 1,
      cellClassName: "last-name-column--cell",
    },
    {
      field: "grade",
      headerName: "GRADE",
      flex: 1,
      cellClassName: "grade-column--cell",
    },
    { field: "contactNumber", headerName: "CONTACT NUMBER", flex: 1 },
    { field: "email", headerName: "EMAIL ADDRESS", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="TEACHERS' LESSON PLANS"
        subtitle="Teachers with uploaded lesson plans"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        // Adjusting the properties for the MUI DataGrid
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          "& .first-name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .last-name-column--cell": {
            color: colors.greenAccent[300],
          },
        }}
      >
        <DataGrid
          rows={teachersWithLessonPlans}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default LessonPlans;