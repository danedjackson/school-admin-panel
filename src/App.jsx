import { ColorModeContext, useMode } from './theme';
import Topbar from './scenes/global/Topbar';
import Dashboard from './scenes/dashboard';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

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
          <main className = "content">
            <Topbar />
            <Routes>
              <Route path = "/" element = {<Dashboard />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
