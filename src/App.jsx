import { Routes, Route } from 'react-router-dom';
import Dashboard from './scenes/dashboard';
import Contacts from './scenes/contacts';
import Teachers from './scenes/teachers';
import CreateTeacher from './scenes/teachers/createTeacher';
import Scores from './scenes/scores';
import Form from './scenes/form';
import ScoreForm from './scenes/score-form';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import Login from './scenes/login';
import StudentScoreDetails from './scenes/scores/studentScoreDetails';
import Layout from './components/Layout';
import RequireAuth from './auth/RequireAuth';
import UploadPlans from './scenes/lesson-plans/upload-plans';
import LessonPlans  from './scenes/lesson-plans/view-plans';

function App() {
    
  return (
    <Routes>
      <Route path = "/" element = {<Layout />}>
        <Route path = "/login" element = {<Login />} />

        <Route element={<RequireAuth/>}>
          <Route path = "/" element = {<Dashboard />} />
          <Route path = "/teachers" element = {<Teachers />} />
          <Route path = "/teachers/create-teacher" element = {<CreateTeacher />} />
          <Route path = "/contacts" element = {<Contacts />} />
          <Route path = "/scores" element = {<Scores />} />
          <Route path = "/form" element = {<Form />} />
          <Route path = "/score-form" element = {<ScoreForm />} />
          <Route path = "/student-info" element = {<StudentScoreDetails />} />
          <Route path = "/view-plans" element = {<LessonPlans />} />
          <Route path = "/upload-plans" element = {<UploadPlans />} />
          <Route path = "/calendar" element = {<Calendar />} />
          <Route path = "/faq" element = {<FAQ />} />
        </Route>

        {/* <Route path = "*" element = {<404Page />} /> */}
        </Route>
    </Routes>
  )
}

export default App