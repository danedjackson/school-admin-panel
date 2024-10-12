import React, { useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { getStudentData } from '../../data/endpoints';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';
import StudentDetailsPopup from '../form/popupEditStudentInfo';

/**
 * Contacts component displays a grid of contact information for team members.
 * It fetches the data from an API endpoint, maps it to a format compatible with
 * MUI DataGrid, and renders the grid with customized styling.
 */
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // State management
  const [openPopup, setOpenPopup] = useState(false);
  const [studentRows, setStudentRows] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const data = await getStudentData();
        setStudentRows(data.studentRows);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const columns = [
    //{ field: 'id', headerName: 'ID'},
    //{ field: 'id', headerName: 'REGISTRAR ID' },
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
      field: "age",
      headerName: "AGE",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "contactNumber", headerName: "CONTACT NUMBER", flex: 1 },
    { field: "email", headerName: "EMAIL ADDRESS", flex: 1 },
    { field: "address", headerName: "ADDRESS", flex: 1 },
    // Calls popup component
    {
      field: 'edit', headerName: 'EDIT', flex: 1, headerAlign: 'right', align: 'right',
      renderCell: (params) => {
        return <EditIcon onClick={() => handleEditClick(params.row)} />
      },
    },
    // { field: "city", headerName: "CITY" },
    // { field: "zipCode", headerName: "ZIP CODE" },
  ];


  const handleEditClick = (student) => {
    setSelectedStudent({
      ...student,
      studentId: student.id
    });
    setOpenPopup(true);
  };

  const handleScoreDetailsPopupClose = (updatedRecord) => {
    if (updatedRecord) {
      // Update the studentRows state with the new data
      setStudentRows(prevRows => 
        prevRows.map(row => row.id === updatedRecord.id ? updatedRecord : row)
      );
    }
    setOpenPopup(false);
    setSelectedStudent(null);
  };
  
  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="Contact Information for Students"
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
          rows={studentRows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      
      {/* Popup component to edit student scores */}
      <StudentDetailsPopup 
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        selected={selectedStudent ? [selectedStudent] : []}
        title={selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : ''}
        onClose={handleScoreDetailsPopupClose}
      />
    </Box>
  );
};

export default Contacts;