import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
import StudentScoreDetails from './scenes/scores/studentScoreDetails';
import Login from './scenes/login';

function App() {
  const [theme, colorMode] = useMode();
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is authenticated
  if (!authenticated) {
    // If not authenticated, redirect to the login page
    navigate('/login');
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {authenticated && <Sidebar />}
          <main className="content">
            {authenticated && <Topbar />}
            <Routes>
              <Route path="/" element={authenticated ? <Dashboard /> : <Login />} />
              <Route path="/teachers" element={authenticated ? <Teachers /> : <Login />} />
              <Route path="/contacts" element={authenticated ? <Contacts /> : <Login />} />
              <Route path="/scores" element={authenticated ? <Scores /> : <Login />} />
              <Route path="/form" element={authenticated ? <Form /> : <Login />} />
              <Route path="/score-form" element={authenticated ? <ScoreForm /> : <Login />} />
              <Route path="/student-info" element={authenticated ? <StudentScoreDetails /> : <Login />} />
              <Route path="/calendar" element={authenticated ? <Calendar /> : <Login />} />
              <Route path="/faq" element={authenticated ? <FAQ /> : <Login />} />
              <Route path="/login" element={authenticated ? null : <Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
