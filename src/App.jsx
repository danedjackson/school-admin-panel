import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Contacts from './scenes/contacts';
import Teachers from './scenes/teachers';
import Scores from './scenes/scores';
import Form from './scenes/form';
import ScoreForm from './scenes/score-form';
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';
import Login from './scenes/login';
import StudentScoreDetails from './scenes/scores/studentScoreDetails';
import Layout from './components/Layout';
import RequireAuth from './auth/RequireAuth';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <Routes>
      <Route path = "/" element = {<Layout />}>
        <Route path = "/login" element = {<Login />} />

        <Route element={<RequireAuth/>}>
          <Route path = "/" element = {<Dashboard />} />
          <Route path = "/teachers" element = {<Teachers />} />
          <Route path = "/contacts" element = {<Contacts />} />
          <Route path = "/scores" element = {<Scores />} />
          <Route path = "/form" element = {<Form />} />
          <Route path = "/score-form" element = {<ScoreForm />} />
          <Route path = "/student-info" element = {<StudentScoreDetails />} />
          <Route path = "/calendar" element = {<Calendar />} />
          <Route path = "/faq" element = {<FAQ />} />
        </Route>

        {/* <Route path = "*" element = {<404Page />} /> */}
        </Route>
    </Routes>
  )

  // return (
  //   // Global access to our color context
  //   <ColorModeContext.Provider value = {colorMode}>
  //     {/* Granting Material UI access */}
  //     <ThemeProvider theme = {theme}>
  //       {/* Resets css to defaults*/}
  //       <CssBaseline />
  //       <div className = "app">
  //         <Sidebar />
  //         <main className = "content">
  //           <Topbar />
  //           <Routes>
  //             <Route path = "/" element = {<Dashboard />} />
  //             <Route path = "/teachers" element = {<Teachers />} />
  //             <Route path = "/contacts" element = {<Contacts />} />
  //             <Route path = "/scores" element = {<Scores />} />
  //             <Route path = "/form" element = {<Form />} />
  //             <Route path = "/score-form" element = {<ScoreForm />} />
  //             <Route path = "/student-info" element = {<StudentScoreDetails />} />
  //             <Route path = "/calendar" element = {<Calendar />} />
  //             <Route path = "/faq" element = {<FAQ />} />
  //           </Routes>
  //         </main>
  //       </div>
  //     </ThemeProvider>
  //   </ColorModeContext.Provider>
  // )
}

export default App
