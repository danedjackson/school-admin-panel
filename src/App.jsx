import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Contacts from './scenes/contacts';
import Team from './scenes/team';
import Invoices from './scenes/invoices';

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
              <Route path = "/team" element = {<Team />} />
              <Route path = "/contacts" element = {<Contacts />} />
              <Route path = "/invoices" element = {<Invoices />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
