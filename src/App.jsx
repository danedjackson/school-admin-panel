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
import Calendar from './scenes/calendar';
import FAQ from './scenes/faq';

function App() {
  const [theme, colorMode] = useMode();

  return (
    // Global access to our color context
    <ColorModeContext.Provider value = {colorMode}>
      {/* Granting Material UI access */}
      <ThemeProvider theme = {theme}>
        {/* Resets css to defaults*/}
        <CssBaseline />
        <div className = "app">
          <Sidebar />
          <main className = "content">
            <Topbar />
            <Routes>
              <Route path = "/" element = {<Dashboard />} />
              <Route path = "/teachers" element = {<Teachers />} />
              <Route path = "/contacts" element = {<Contacts />} />
              <Route path = "/scores" element = {<Scores />} />
              <Route path = "/form" element = {<Form />} />
              <Route path = "/calendar" element = {<Calendar />} />
              <Route path = "/faq" element = {<FAQ />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
