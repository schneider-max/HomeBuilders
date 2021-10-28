import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from "../img/HomeBuilder_Logo_4c.png";
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {logger} from "../../../backend/lib/middleware/logger.mw";

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

function throwLoginErrorIfGiven(response: Response) {
    if (response.status !== 200) {
        handleLoginError(response.statusText);
    }
    handleLogin(response)
    return response;
}

function handleLoginError(errorMsg: string) {
    console.log(errorMsg);
}

function handleLogin(res: Response) {
    if (res.status === 200 && res.body != null) {
        try {
            res.json().then(resBody => {
                sessionStorage.setItem("token", resBody.token);
            });
        } catch (ex: any) {
            handleLoginError(ex);
        }
    }
}

export default function SignIn() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreateAcc = () => {
        console.log('Create User: ')
        handleClose()
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let email = data.get('email');
        let password = data.get('password');
        if (email !== "" && password !== "") {
            fetch("http://localhost:3001/api/customers/" + email, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({password: password})
            })
                .then(res => throwLoginErrorIfGiven(res))
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
                <Alert severity="error" style=>Wrong Login data. Following error occured: {errorMsg}</Alert>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
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
                <Button fullWidth variant="contained" onClick={handleClickOpen}>
                    Sign Up
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new Account to start your upcoming Project with HomeBuilders, please fill out the
                        following fields and click on 'create Account'
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete="email"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateAcc}>Create Account</Button>
                </DialogActions>
            </Dialog>
            <Copyright sx={{mt: 4, mb: 4}}/>
        </Container>
    );
}
