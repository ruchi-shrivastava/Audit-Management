import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = (e) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errors, setErrors] = useState({});
  // const[registerFormData, setRegisterFormData]= useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // });

 
  // function onChange(value) {
  //   console.log("Captcha value:", value);
  // }

  const onSubmitForm = e => {
    e.preventDefault();
    const _errors = {};
    if(!name) _errors.name = "Name is required.";
    if(!email) _errors.email =  "Email is required";
    if(!password) _errors.password = "Password is required";
    setErrors(_errors);
    if (Object.keys(_errors).length > 0) return;

    let payload = {
      name: name,
      email: email,
      password: password
    };

    console.log(name);
    console.log(email);
    console.log(password);

    Axios.post("http://localhost:3000/audits/register-user", payload,{'Content-Type':'application/json'}).then(res => {
      console.log("res",res);
      setName("");
      setEmail("");
      setPassword("");  
    });
  };

  return (
    <Box>
      <Container component="main" maxWidth="xs" boxShadow={1}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitForm} >
          
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="name"
                  error={errors.name}
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  helperText={errors.name}
                  autoFocus
                  value={name}
                  onChange={e=>setName(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="companyName"
                  label="Company Name"
                  name="email"
                  type="email"
                  autoComplete="cname"
                 
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                 error={errors.email}
                 helperText={errors.email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={e=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e=>setPassword(e.target.value)}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <ReCAPTCHA
                sitekey="6LfkGuIUAAAAADm0Mt8ptYAupyxyQkAdSyd8caLO"
                onChange={onChange}
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={onSubmitForm}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <NavLink to="/" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Box>
  );
};

export default SignUp;
