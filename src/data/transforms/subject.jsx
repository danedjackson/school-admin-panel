import { getAllSubjects } from '../endpoints';

export const getSubjectDropdownData = async () => {
    const subjectNames = await getAllSubjects();
    return subjectNames.map(name => ({ label: name }));
}

export const getAssignmentDropdownData = () => {
    return [
        { label: "Homework", id: "homework" },
        { label: "Classwork", id: "classwork" },
        { label: "Unit Test", id: "unittest" },
        { label: "Mid-Term Examination", id: "midtermexam" },
        { label: "End of Year Examination", id: "endofyearexam" }
      ]
}