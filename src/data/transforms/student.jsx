import { getStudentData } from "../endpoints";

export const getStudentDropdownData = () => {
    const studentData = getStudentData();
    
    return studentData.studentRows.map(student => ({
        label: `${student.firstName} ${student.middleName} ${student.lastName}`,
        id: student.id,
        grade: student.grade,
    }))
}