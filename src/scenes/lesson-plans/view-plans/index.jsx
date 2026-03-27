import { useState, useEffect } from 'react';
import { getAllTeachersWithLessonPlans } from '../../../data/endpoints';
import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../../theme';
import Header from '../../../components/Header';
import LessonPlansPopup from '../lessonPlansPopup';

export const LessonPlans = () => {
  const [teachersWithLessonPlans, setTeachersWithLessonPlans] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchTeachersWithLessonPlans = async () => {
      try {
        const plans = await getAllTeachersWithLessonPlans();
        if (plans && Array.isArray(plans.response)) {
          setTeachersWithLessonPlans(plans.response);
        } else {
          setTeachersWithLessonPlans([]);
        }
      } catch (error) {
        setTeachersWithLessonPlans([]);
        console.error('Error fetching lesson plans:', error);
      }
    };
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

  const handleRowClick = (params) => {
    setSelectedTeacher(params.row);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleUpdateLessonPlans = (updatedLessonPlans) => {
    setTeachersWithLessonPlans(prevTeachers =>
      prevTeachers.map(teacher =>
        teacher.id === selectedTeacher.id
          ? { ...teacher, lessonPlans: updatedLessonPlans }
          : teacher
      )
    );
  };

  return (
    <Box m="20px">
      <Header
        title="TEACHERS' LESSON PLANS"
        subtitle="Teachers with uploaded lesson plans"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          rows={Array.isArray(teachersWithLessonPlans) ? teachersWithLessonPlans : []}
          columns={columns}
          onRowClick={handleRowClick}
          getRowId={(row) => row.id || `${row.firstName}-${row.lastName}-${row.email}`}
          disableSelectionOnClick
          autoHeight
        />
        <LessonPlansPopup 
          teacher={selectedTeacher} 
          openPopup={openPopup}
          onClose={handleClosePopup}
          onUpdateLessonPlans={handleUpdateLessonPlans}
        />
      </Box>
    </Box>
  );
};

export default LessonPlans;
