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
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('jwtToken') !== null);
  // Check if the user is authenticated
  if (!authenticated) {
    // If not authenticated, redirect to the login page
    return <Login />;
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
              <Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/teachers" element={authenticated ? <Teachers /> : <Navigate to="/login" />} />
              <Route path="/contacts" element={authenticated ? <Contacts /> : <Navigate to="/login" />} />
              <Route path="/scores" element={authenticated ? <Scores /> : <Navigate to="/login" />} />
              <Route path="/form" element={authenticated ? <Form /> : <Navigate to="/login" />} />
              <Route path="/score-form" element={authenticated ? <ScoreForm /> : <Navigate to="/login" />} />
              <Route path="/student-info" element={authenticated ? <StudentScoreDetails /> : <Navigate to="/login" />} />
              <Route path="/calendar" element={authenticated ? <Calendar /> : <Navigate to="/login" />} />
              <Route path="/faq" element={authenticated ? <FAQ /> : <Navigate to="/login" />} />
              <Route path="/login" element={authenticated ? null : <Login />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;