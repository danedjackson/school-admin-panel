import React, { useState } from 'react';

const CreateSubject = () => {
    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle subject addition
        console.log('Subject Added:', { subjectName, subjectCode });
        // Reset form fields
        setSubjectName('');
        setSubjectCode('');
    };

    return (
        <div>
            <h2>Create New Subject</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subjectName">Subject Name:</label>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subjectCode">Subject Code:</label>
                    <input
                        type="text"
                        id="subjectCode"
                        value={subjectCode}
                        onChange={(e) => setSubjectCode(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Subject</button>
            </form>
        </div>
    );
};

export default CreateSubject;