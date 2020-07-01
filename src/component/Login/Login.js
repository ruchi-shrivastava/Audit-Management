import React,{useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
 import {withRouter} from 'react-router-dom'
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[isLogged,setIsLogged] = useState(false);
  const[username,setUsername] = useState(null)
  // const[handleSubmit,setHandleSubmit]= useState(false);
  
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  // function onChange(value) {
  //   console.log("Captcha value:", value);
  // }

  const handleSubmit =(e) => {
    e.preventDefault()
    

    props.history.push('/dashboard')

   let payload = {
    email: email,
    password: password
  };
  console.log("Email",email);
    console.log("password",password);

    Axios.post("http://localhost:3000/audits/login",payload)
    .then(res => {
      if (res.data.status === 200) {
        setUsername(res.data.username)
        setIsLogged(true)

        console.log("prrrops",props);
        localStorage.setData('loginData', res.data.data);
        localStorage.setData('isLogged', true)
        props.history.push('/dashboard')
       
       }else {
         toast.error("Email or Password is incorrect !", {
      position: toast.POSITION.TOP_CENTER
    });
       
       }

      console.log(res);
      
    });
//     .then(res => {
//       res.json().then((result) => {
//         console.log("result",result);
//       })
// });
  };
     
   return (
    <Box>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            validation='required|email'
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus  onChange={(e)=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            validation='required|password'
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"  onChange={(e)=>setPassword(e.target.value)}
          />
          {/* <Grid item xs={12}>
          <ReCAPTCHA sitekey="6LfkGuIUAAAAADm0Mt8ptYAupyxyQkAdSyd8caLO" onChange={onChange} />
          </Grid> */}
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <NavLink to="#" variant="body2">
                Forgot password?
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    </Box>
  );
};

export default withRouter(Login);
