import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";
import { signin, signup, googleSignIn } from "../../services/auth";
import Input from "./input";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import "./auth.css";
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const googleSuccess = async (res) => {
    dispatch(googleSignIn(res, navigate));
  };

  const googleError = (error) =>
    console.log("Google Sign In was unsuccessful. Try again later ", error);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => googleSuccess(codeResponse),
    onError: (error) => googleError(error),
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className="paper" elevation={6}>
        <Avatar className="icon-avtar">
          <MdLockOutline />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <form className="signin-form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-btn"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" flexDirection="row" alignItems="center" margin="10px 0">
            <hr className="line" />
              <span className="text">OR</span>
            <hr className="line" />
          </Grid>
          <Button
            className={"google-btn"}
            color="primary"
            fullWidth
            onClick={login}
            startIcon={<FaGoogle />}
            variant="contained"
          >
            Continue with Google
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
