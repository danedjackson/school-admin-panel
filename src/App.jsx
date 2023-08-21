import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

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
          <main className = "content"></main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
