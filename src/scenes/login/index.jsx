import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import Header from "../../components/Header";
import { signIn } from "../../data/endpoints";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (values) => {
        const token = await signIn(values.email, values.password);
        if(token != null) {
            setAuth({email: values.email, token});
            navigate(from, { replace: true});
        }
    }
    return (
            <Box
                sx={{
                    
                    "position": "relative",
                    "z-index": 1,
                    "borderRadius": "10px",
                    "maxWidth": "360px",
                    "margin": "0 auto 100px",
                    "padding": "45px",
                }}
            >
                <Header title="LOGIN" subtitle="Login to EduCen" />
                <Formik
                    validationSchema={schema}
                    initialValues={{ email: "", password: "" }}
                    onSubmit={handleSubmit}
                >
                    {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    }) => (
                    <div className="login">
                        <div className="form">
                            
                    {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                        <form onSubmit={handleSubmit}>
                        {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                            <TextField
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Enter email id / username"
                                className="form-control inp_text"
                                id="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ margin: '20px 0' }}
                            />
                            {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                            <TextField
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder="Enter password"
                                className="form-control"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}
                            />
                            {/* Click on submit button to submit the form */}
                            <Box display="flex" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Login
                                </Button>
                            </Box>
                        </form>
                        </div>
                    </div>
                    )}
                </Formik>
            </Box>
        )
}

// Creating schema
const schema = Yup.object().shape({
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  }
);
  
export default Login;