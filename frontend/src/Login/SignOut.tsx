import * as React from "react";
import {useHistory} from "react-router-dom";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery,
    useTheme
} from "@mui/material";

function SignOut() {
    const history = useHistory();
    const [open] = React.useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        window.location.reload();
    };
    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("email");
        history.push('/');
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Log Out"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are going to log yourself out. Are you sure you want to leave this awesome and fantastic
                        Application?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={handleLogOut}>
                        Log out
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignOut;