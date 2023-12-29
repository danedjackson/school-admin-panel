export const getStudentAverages = (data) => {
    const studentAverages = [];
    let index = 0;
    data.response.forEach(item => {
        const {
            studentId,
            grade,
            firstName,
            middleName,
            lastName,
            subject,
            score,
        } = item;

        // Check if the student already exists in the array
        const studentIndex = studentAverages.findIndex(student => student.studentId === studentId);

        if (studentIndex === -1) {
            // If the student doesn't exist, add a new entry
            studentAverages.push({
            id: index + 1,
            studentId,
            grade,
            firstName,
            middleName,
            lastName,
            averages: {
                [subject]: {
                scores: [parseInt(score)],
                average: parseInt(score),
                },
            },
            });
            
            index+=1;
        } else {
            // If the student already exists, update their subject averages
            const subjectData = studentAverages[studentIndex].averages[subject];
            if (!subjectData) {
                studentAverages[studentIndex].averages[subject] = {
                    scores: [parseInt(score)],
                    average: parseInt(score),
                };
            } else {
                subjectData.scores.push(parseInt(score));
                const sum = subjectData.scores.reduce((acc, score) => acc + score, 0);
                subjectData.average = sum / subjectData.scores.length;
            }
        }
    });
    return studentAverages;
}