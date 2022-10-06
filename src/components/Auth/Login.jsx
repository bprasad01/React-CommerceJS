import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container, ThemeProvider } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { setLogin } from "../../utils/AuthService";
import { useHistory } from "react-router";

const Login = () => {
  const [ userData, setUserData ] = useState({
    email : "",
    password : "",
  });

  const history = useHistory()

  const handleChange = ({ currentTarget : input }) => {
    const userdata = { ...userData };
    userdata[input.name] = input.value;
    setUserData(userdata);
  }
  
  const loginFormSubmit = async () => {
    const response = await setLogin(userData);
    const accessToken = response.data.accessToken;
    try {
      if (response.status === 200) {
        localStorage.setItem("accessToken", JSON.stringify({ accessToken: accessToken }));
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginFormSubmit();
  };
  return (
    <>
       <ThemeProvider>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 120,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={userData.email}
              onChange={handleChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color='primary'
              style={{marginTop : "10px"}}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item style={{marginTop : "10px"}}>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default Login;
