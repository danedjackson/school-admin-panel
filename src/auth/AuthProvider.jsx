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
    const [auth, setAuth] = useState({});
    
    return (
        <AuthContext.Provider value={ {auth, setAuth} }>
            {children}
        </AuthContext.Provider>
    )
  }

export default AuthContext;