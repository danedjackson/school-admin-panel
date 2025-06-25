import { tokens } from "../theme";
import { getStudentAverages } from "./transforms/score";
import config from '../config/config.json';

const HOST = config.API_HOST;

// ==================== AUTH ENDPOINTS ====================

export const signIn = async(email, password) => {
  const endpoint = `${HOST}/v1/auth/signin`;
  
  try{
    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });

    if(!response.ok) {
      throw new Error(`Network response was not ok when logging in. Status: ${response.status}`);
    }
    const data = await response.json();
    if(data.httpStatus != 'FOUND'){
      return {
        id: null,
        name: null,
        grade: null,
        token: null,
        role: null,
        message: data?.message,
      }
    }   
    sessionStorage.setItem('token', data?.response?.token);

    return {
      id: data?.response?.id,
      name: data?.response?.firstName,
      grade: data?.response?.grade,
      token: data?.response?.token,
      role: data?.response?.role,
      message: data?.response?.message,
    }    
  } catch (error) {
    return {
      id: null,
      name: null,
      grade: null,
      token: null,
      role: null,
      message: error
    }    
  }
}

// ==================== TEACHER ENDPOINTS ====================

export const getTeacherData = async () => {
  const endpoint = `${HOST}/v1/admin/teachers`;
  let teacherRows;

  const response = await fetch(endpoint, {
    headers: {
      'Authorization': `Bearer ${getTokenFromSession()}`
    }
  });

  if (!response.ok) {
    throw new Error(`Network response was not ok when fetching student data. Status: ${response.status}`);
  }
  const data = await response.json();
    teacherRows = data.response.map((row, index) => ({
      id: index+1,
      ...row,
    }));
  return teacherRows;
}

export const createTeacherRecord = async (request) => {
  request.role = 'TEACHER';
  const endpoint = `${HOST}/v1/auth/signup`;
  
  try {
    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when creating teacher record. Status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Error creating teacher record: ${error}`);
  }
}

// ==================== STUDENT ENDPOINTS ====================

export const getStudentData = async () => {
  try {
    const endpoint = `${HOST}/v1/teacher/all-students`;
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok when fetching student data. Status: ${response.status}`);
    }

    const data = await response.json();

    const studentRows = data.response.map((row, index) => ({
      id: index + 1,
      ...row,
    }));

    return {
      studentRows
    };
  } catch (error) {
    console.error(`Error fetching student data:`, error);
    return {
      studentRows: []
    };
  }
}

export const createStudentRecord = async (request) => { 
  const endpoint = `${HOST}/v1/teacher/create-student`;
  
  try {
    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when creating student record. Status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Error creating student record: ${error}`);
  }
}

export const updateStudentRecord = async (request) => {
  const endpoint = `${HOST}/v1/teacher/update-student`;

  try {
    const response = await fetch(endpoint, {
      method: `PUT`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error(`Error updating student record: ${error}`);
    throw error;
  }
}

// ==================== SCORE ENDPOINTS ====================

export const scoreData = async (grade) => {
  const endpoint = `${HOST}/v1/score/grade/${grade}`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok when fetching score data. Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Transforming the response to usable data
    const scoreRows = getStudentAverages(data);
    return scoreRows;
  } catch (error) {
    console.error(`Error fetching scores data:`, error);
    return null; // or handle the error accordingly
  }
}

export const getStudentScoreDataByIdAndGrade = async (studentId, studentGrade) => {
  const endpoint = `${HOST}/v1/score/student/${studentId}?grade=${studentGrade}`;

  try {
    const response = await fetch(endpoint, 
      {
        headers: {
          'Authorization': `Bearer ${getTokenFromSession()}`
        }
      });
    if(!response.ok) {
      throw new Error(`Network response was not ok when fetching student score data. Status: ${response.status}`);
    }
    const data = await response.json();
    const studentScoreDataWithId = data.response.map((row, index) => ({
      id: index + 1,
      ...row,
    }));
    return studentScoreDataWithId;
  } catch (error) {
    console.error(`Error fetching student score data: ${error}`);
  }
}

export const saveStudentScoreData = async (request) => { 
  const endpoint = `${HOST}/v1/score`;
  
  try {
    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when saving student score data. Status: ${response.status}`);
    }
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error(`Error saving student score data: ${error}`);
  }
}

export const updateStudentScoreData = async (request) => {
  const endpoint = `${HOST}/v1/score/update/${request.studentId}`;

  try {
    const response = await fetch(endpoint, {
      method: `PATCH`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
      body: JSON.stringify(request),
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when updating student score data. Status: ${response.status}`);
    }
    const data = await response.json();
    if(data.httpStatus == 'OK') {
      return data.response;
    } else if(data.httpStatus == 'NOT_MODIFIED') {
      // Will be null
      return data.response;
    }
  } catch(error) {
    console.error(`Error updating student score data: ${error}`);
  }
}

export const deleteStudentScoreData = async (scoreId) => {
  const endpoint = `${HOST}/v1/score/delete/${scoreId}`;
  
  try {
    const response = await fetch(endpoint, {
      method: `DELETE`,
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when deleting student score data. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error deleting student score data: ${error}`);
  }
}

// ==================== LESSON PLAN ENDPOINTS ====================

export const uploadFile = async (file) => {
  const endpoint = `${HOST}/v1/teacher/upload`;

  try {
    const response = await fetch(endpoint, {
      method: `POST`,
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
      body: file
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when uploading file data. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch(error) {
    console.error(`Error uploading file: ${error}`);
  }
}

export const getAllTeachersWithLessonPlans = async () => {
  const endpoint = `${HOST}/v1/admin/plans`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when fetching lesson plans. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch(error) {
    console.error(`Error fetching lesson plans: ${error}`)
  }
}

export const getLessonPlanDocument = async(planId) => {
  const endpoint = `${HOST}/v1/teacher/plans/${planId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      },
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when fetching lesson plan document. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch(error) {
    console.error(`Error fetching lesson plan document: ${error}`);
  }
}

export const updateLessonPlanComments = async (updatedComments) => {
  const endpoint = `${HOST}/v1/admin/update-plans`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedComments)
    });
    if(!response.ok) {
      throw new Error(`Network response was not ok when fetching lesson plan document. Status: ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch(error) {
    console.error(`Error fetching lesson plan document: ${error}`);
  }
}

// ==================== SUBJECT ENDPOINTS ====================

export const getAllSubjects = async () => {
  const endpoint = `${HOST}/v1/subjects/all`;
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when fetching subjects. Status: ${response.status}`);
    }
    const data = await response.json();
    // Return only a list of subject names
    return Array.isArray(data.response)
      ? data.response.map(subject => subject.subjectName)
      : [];
  } catch (error) {
    console.error(`Error fetching subjects: ${error}`);
    throw error;
  }
};

export const saveSubject = async (subjectName) => {
  const endpoint = `${HOST}/v1/subjects/add/${subjectName}`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when saving subject. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error saving subject: ${error}`);
    throw error;
  }
};

export const updateSubject = async (oldSubjectName, newSubjectName) => {
  const endpoint = `${HOST}/v1/subjects/edit/${oldSubjectName}/${newSubjectName}`;
  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when updating subject. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating subject: ${error}`);
    throw error;
  }
};

export const removeSubject = async (subjectName) => {
  const endpoint = `${HOST}/v1/subjects/remove/${subjectName}`;
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getTokenFromSession()}`
      }
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok when removing subject. Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error removing subject: ${error}`);
    throw error;
  }
};

// ==================== UTILITY ====================

const getTokenFromSession = () => {
  return sessionStorage.getItem("token");
}

