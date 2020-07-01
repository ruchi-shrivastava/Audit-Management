import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import { NavLink } from "react-router-dom";

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
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 398
  }
}));

const Register = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    cpassword: "",
    linkedin: ""
  });

  const onSubmitForm = e => {
    e.preventDefault();
    const _errors = {};
    if (!registerFormData.firstName)
      _errors.firstName = "First Name is required.";
    if (!registerFormData.lastName) _errors.lastName = "Last Name is required.";
    if (!registerFormData.company)
      _errors.company = "Company Name is required.";
    if (!registerFormData.email) _errors.email = "Email is required.";
    if (!registerFormData.phone) _errors.phone = "Phone Number is required.";
    if (!registerFormData.country) _errors.country = "Country is required.";
    if (!registerFormData.password) _errors.password = "Password is required.";
    if (!registerFormData.cpassword)
      _errors.cpassword = "Confirm Password is required.";
    setErrors(_errors);

    if (Object.keys(_errors).length > 0) return;

  };

  // handelcahnge function to set state for registartion FormData
  const handleChange = event => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
  };

  //  reCaptcha v3 callback function after page reloads
  const handleLoaded = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6LewZeIUAAAAACTKkKRB4SweBJXJWq0a_B_GmFgq", {
          action: "homepage"
        })
        .then(token => {
          console.log("token", token);
        });
    });
  };

  useEffect(() => {
    // Add reCaptcha v3
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6LewZeIUAAAAACTKkKRB4SweBJXJWq0a_B_GmFgq";
    script.addEventListener("load", handleLoaded);
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  error={errors.firstName}
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  helperText={errors.firstName}
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  error={errors.lastName}
                  helperText={errors.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.company}
                  helperText={errors.company}
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="Company"
                  name="company"
                  autoComplete="cname"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.phone}
                  helperText={errors.phone}
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  error={errors.country}
                >
                  <InputLabel id="labelId">Country</InputLabel>
                  <Select
                    labelId="labelId"
                    id="country"
                    onChange={handleChange}
                    label="Country"
                    name="country"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="india">India</MenuItem>
                    <MenuItem value="usa">USA</MenuItem>
                    <MenuItem value="uk">UK</MenuItem>
                  </Select>
                  <FormHelperText>{errors.country}</FormHelperText>
                </FormControl>
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
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={errors.cpassword}
                  helperText={errors.cpassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="cpassword"
                  label="Confirm Password"
                  type="password"
                  id="cpassword"
                  autoComplete="confirm-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="linkedin"
                  label="LinkedIn Profile"
                  name="linkedin"
                  autoComplete="linkedin"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LewZeIUAAAAACTKkKRB4SweBJXJWq0a_B_GmFgq"
                  data-size="invisible"
                ></div>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
    </>
  );
};

export default Register;