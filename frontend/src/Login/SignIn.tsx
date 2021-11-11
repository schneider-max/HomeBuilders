import * as React from 'react';
import {useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from "../img/HomeBuilder_Logo_4c.png";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useHistory} from "react-router-dom";
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {'HomeBuilders '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignIn() {
    let history = useHistory();

    const homepagePath = '/home';

    const [signUpDialogOpen, setSignUpDialogOpen] = React.useState(false);
    const [userCreationAlert, setUserCreationAlert] = React.useState(false);
    const [userCreationAlertMsg, setUserCreationAlertMsg] = React.useState('');
    const [logInErrorAlert, setLogInErrorAlert] = React.useState(false);
    const [loginErrorAlertMsg, setLoginErrorAlertMsg] = React.useState('');

    useEffect(() => {
        let token = sessionStorage.getItem("token");
        let email = sessionStorage.getItem("email");

        if (token != null && email != null) {
            history.push(homepagePath);
        }
    });

    function handleLoginError(errorMsg: any) {
        resetAlerts();

        if (errorMsg !== null && errorMsg.toString().includes("401")) {
            setLoginErrorAlertMsg("Login failed - Bad Credentials");
        } else {
            setLoginErrorAlertMsg("Login failed! Please try again or create a new Account.")
        }
        setLogInErrorAlert(true);
    }

    function processLogin(res: AxiosResponse) {
        resetAlerts();

        if (res.status === 200 && res.data != null) {
            try {
                sessionStorage.setItem("token", res.data.token);

                if (sessionStorage.getItem("token") != null)
                    window.location.reload();
            } catch (ex: any) {
                handleLoginError(ex);
            }
        } else {
            handleLoginError('');
        }
    }

    function resetAlerts() {
        setLogInErrorAlert(false);
        setLoginErrorAlertMsg("");
        setUserCreationAlert(false);
        setUserCreationAlertMsg("");
    }

    const handleClickSignUpOpen = () => {
        setSignUpDialogOpen(true);
    };
    const handleSignUpClose = () => {
        setSignUpDialogOpen(false);
    };
    const handleCreateAcc = (event: any) => {
        event.preventDefault();

        resetAlerts();

        try {
            const data = new FormData(event.currentTarget);

            let newUserMail = data.get('newUserMail');
            let newUserPassword = data.get('newUserPassword');
            let newUserFirstName = data.get('newUserFirstname');
            let newUserLastName = data.get('newUserLastname');

            if (newUserMail !== ''
                && newUserPassword !== ''
                && newUserFirstName !== ''
                && newUserLastName !== '') {

                const options: AxiosRequestConfig = {
                    url: "http://localhost:3001/api/customers/",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    data: {
                        email: newUserMail,
                        password: newUserPassword,
                        firstname: newUserFirstName,
                        lastname: newUserLastName
                    }
                }

                axios(options)
                    .then(() => {
                        setUserCreationAlert(true);
                        setUserCreationAlertMsg(
                            "User " + newUserFirstName + ' ' + newUserLastName + ' with Mail ' + newUserMail
                            + ' was successfully created!');

                    })
                    .catch();

                handleSignUpClose()
            }

        } catch (ex: any) {

        }
    };
    const handleSignIn = (event: any) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        let email = data.get('email');
        let password = data.get('password');

        if (email !== null && password !== null) {
            const options: AxiosRequestConfig = {
                url: "http://localhost:3001/api/customers/" + email,
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {password: password}
            }
            axios(options)
                .then(res => {
                    processLogin(res);
                    if (typeof email === "string") {
                        sessionStorage.setItem("email", email);
                    }
                })
                .catch(ex => {
                    handleLoginError(ex);
                    sessionStorage.removeItem("email");
                })
        } else {
            handleLoginError("");
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={{top: '0px', fontSize: '30px', height: '100px', padding: '15px'}} className="titleName">
                <img src={Logo} style={{width: "300px"}} alt={"Logo"}/>
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <div id={"logInErrorAlert"}>
                    {logInErrorAlert ? <Alert
                        severity='error'
                        onClick={() => {
                            setLogInErrorAlert(false);
                            setLoginErrorAlertMsg('');
                            return null;
                        }}
                    >{loginErrorAlertMsg}
                    </Alert> : <></>}
                </div>
                <div id={"userCreationAlert"}>
                    {userCreationAlert ? <Alert
                        severity='success'
                        onClick={() => {
                            setUserCreationAlert(false);
                            setUserCreationAlertMsg('');
                            return null;
                        }}
                    >{userCreationAlertMsg}
                    </Alert> : <></>}
                </div>

                <Box component="form" onSubmit={handleSignIn} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                        Sign In
                    </Button>
                </Box>
                <Button fullWidth variant="contained" onClick={handleClickSignUpOpen}>
                    Sign Up
                </Button>
            </Box>

            <Dialog open={signUpDialogOpen} onClose={handleSignUpClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <Box component="form" onSubmit={handleCreateAcc} sx={{mt: 1}}>
                    <DialogContent>
                        <DialogContentText>
                            To create a new Account to start your upcoming Project with HomeBuilders, please fill out
                            the
                            following fields and click on 'create Account'
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="newUserMail"
                            label="Email Address"
                            type={"email"}
                            fullWidth
                            variant="standard"
                            autoComplete="email"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="newUserPassword"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="newUserFirstname"
                            label="Firstname"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            name="newUserLastname"
                            label="Lastname"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSignUpClose}>Cancel</Button>
                        <Button type="submit">Create Account</Button>
                    </DialogActions>
                </Box>
            </Dialog>

            <Copyright sx={{mt: 4, mb: 4}}/>
        </Container>
    );
}
