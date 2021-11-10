import * as React from "react";
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
import {getAxioxInstance} from "../shared/axios";

function DeleteProject(props: any) {
    const [open] = React.useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        window.location.reload();
    };

    const handleDelete = () => {
        const axios = getAxioxInstance();
        axios.delete(`/api/projects/${props.id}`).then(() => {
            window.location.reload();
        });
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Delete Project"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    You are going to delete a whole Project. Are you sure you want to proceed this action?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    Cancel
                </Button>
                <Button autoFocus onClick={handleDelete} color={"error"}>
                    Delete Project
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DeleteProject;