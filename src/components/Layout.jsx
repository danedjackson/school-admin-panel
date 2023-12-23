import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Sidebar from "../scenes/global/Sidebar";
import useAuth from "../hooks/useAuth";
import Topbar from "../scenes/global/Topbar";

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
                    {auth?.token == null ? null : <Topbar />}
                    <div className = "app">
                        {/* Show sidebar only when token is present in session (User is logged in) */}
                        {auth?.token == null ? null : <Sidebar />}
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