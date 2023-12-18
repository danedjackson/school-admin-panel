import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../scenes/global/Sidebar";
import useAuth from "../hooks/useAuth";

const Layout = () => {
    const [theme, colorMode] = useMode();
    const { auth } = useAuth();

    return (
        <main className="App">
            <ColorModeContext.Provider value = {colorMode}>
                {/* Granting Material UI access */}
                <ThemeProvider theme = {theme}>
                    {/* Resets css to defaults*/}
                    <CssBaseline />
                    <div className = "app">
                    {/* Show sidebar only when token is present in session (User is logged in) */}
                    {sessionStorage.getItem("token") == null ? null : <Sidebar />}
                    <main className = "content">
                        <Outlet />
                    </main>
                    </div>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </main>
    )
}
export default Layout;