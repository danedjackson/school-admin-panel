import {createContext, useState} from "react";

const /**
   * Creates a React context for managing authentication state.
   *
   * The AuthContext provides the authenticated user state and functions
   * to update it in the AuthProvider component. This context can be consumed
   * by child components to access the auth state.
   */
  AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
    const [auth, setAuthState] = useState({});
    // Set the default expiration time (e.g., 1 hour)
    const DEFAULT_EXPIRATION_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

    /**
     * Sets the authenticated user state and expiration time.
     *
     * @param {Object} user - The authenticated user data.
     */
    const setAuth = (user) => {
        const expiresAt = new Date().getTime() + DEFAULT_EXPIRATION_TIME;
        setAuthState({ ...user, expiresAt });
    };

    /**
     * Checks if the current authentication state is still valid.
     *
     * @returns {boolean} - True if the authentication state is valid, false otherwise.
     */
    const isAuthenticated = () => {
        if (!auth.expiresAt) {
            return false;
        }
        return new Date().getTime() < auth.expiresAt;
    };

    // Automatically clear auth state if expired
    useEffect(() => {
        if (!isAuthenticated()) {
            setAuthState({});
        }
    }, [auth]);
    return (
        <AuthContext.Provider value={ {auth, setAuth} }>
            {children}
        </AuthContext.Provider>
    )
  }

export default AuthContext;