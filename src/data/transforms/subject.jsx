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
        { label: "End of Year Examination", id: "endofyearexam" },
        { label: "End of Term Examination", id: "endoftermexam" },
        { label: "Project", id: "project" },
        { label: "Quiz", id: "quiz" },
        { label: "Performance Task", id: "performancetask" },
        { label: "Mock Exam", id: "mockexam" },
        { label: "Portfolio", id: "portfolio" },
        { label: "Diagnostic Assessment", id: "diagnostic" },
        { label: "IDRI", id: "idri" },
        { label: "GOILP", id: "goilp" },
        { label: "Standardized Exam", id: "standardexam" }
      ]
}