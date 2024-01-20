import { getStudentData } from "../endpoints";

export const getStudentDropdownData = async () => {
    const studentData = await getStudentData();
    
    return studentData.studentRows.map(student => ({
        label: `${student.firstName} ${student.middleName} ${student.lastName}`,
        id: student.id,
        grade: student.grade,
    }))
}