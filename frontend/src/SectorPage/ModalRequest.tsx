import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios, {AxiosRequestConfig} from "axios";
import {Alert} from "@mui/material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "500",
    bgcolor: 'white',
    border: '2px solid #000',
    p: 4,
};

const styleInputs = {
    marginBottom: "2em",
};

export default function ModalRequest(props: any) {

    const [requestErrorAlert, setRequestErrorAlert] = React.useState(false);
    const [requestErrorAlertMsg, setRequestErrorAlertMsg] = React.useState('');
    const [requestSuccessAlert, setRequestSuccessAlert] = React.useState(false);
    const [requestSuccessAlertMsg, setRequestSuccessAlertMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        resetAlerts();
    }

    function handleRequestError(ex) {
        setRequestErrorAlert(true);
        setRequestErrorAlertMsg('Request proccessing faild due to following error: ' + ex);

        setRequestSuccessAlert(false);
        setRequestSuccessAlertMsg('');
    }

    function handleRequestSuccess() {
        setRequestErrorAlert(false);
        setRequestErrorAlertMsg('');

        setRequestSuccessAlert(true);
        setRequestSuccessAlertMsg("Request was successfully sent to Businesspartner");
    }

    function resetAlerts() {
        setRequestErrorAlert(false);
        setRequestErrorAlertMsg('');

        setRequestSuccessAlert(false);
        setRequestSuccessAlertMsg('');
    }

    function handleRequestSent(event: any, project, supplier, sector) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        let firstname = data.get("firstname");
        let lastname = data.get("lastname");
        let email = data.get("email");
        let budget = Number(data.get("budget"));
        let subject = data.get("subject");
        let msg = data.get("msg");

        if (firstname === '' || lastname === '' || email === '' || subject === '') {
            handleRequestError("Not all mandatory Fields where filled out!")
        } else {
            try {
                let sessionToken = sessionStorage.getItem('token');
                if (sessionToken != null) {
                    const options: AxiosRequestConfig = {
                        url: "http://localhost:3001/api/requests",
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "X-JWT-Token": sessionToken
                        },
                        data: {
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            budget: budget,
                            subject: subject,
                            message: msg,
                            sectors: sector,
                            suppliers: supplier,
                            projects: project
                        }
                    }
                    axios(options)
                        .then(() => {
                            handleRequestSuccess();
                        })
                        .catch((ex) => {
                            handleRequestError(ex);
                        });
                }
            } catch (ex: any) {
                handleRequestError(ex)
            }
        }
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined">Send request for offer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Request to {props.supplier.companyName}
                    </Typography>

                    <div id={"RequestErrorAlert"}>
                        {requestErrorAlert ? <Alert
                            severity='error'
                            onClick={() => {
                                setRequestErrorAlert(false);
                                setRequestErrorAlertMsg('');
                                return null;
                            }}
                        >{requestErrorAlertMsg}
                        </Alert> : <></>}
                    </div>
                    <div id={"requestSuccessAlert"}>
                        {requestSuccessAlert ? <Alert
                            severity='success'
                            onClick={() => {
                                setRequestSuccessAlert(false);
                                setRequestSuccessAlertMsg('');
                                return null;
                            }}
                        >{requestSuccessAlertMsg}
                        </Alert> : <></>}
                    </div>

                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div>
                            <form className="mui-form" onSubmit={(event: any) => {
                                handleRequestSent(event, props.project, props.supplier, props.sector);
                            }}>
                                <TextField sx={styleInputs} fullWidth label="First name" name="firstname" type={"text"}
                                           required={true}>
                                    <input type="text"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Last name" name="lastname" type={"text"}
                                           required={true}>
                                    <input type="text"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="E-Mail" name="email"
                                           defaultValue={sessionStorage.getItem("email")?.toString()!}
                                           type={"email"} required={true}>
                                    <input type="email"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Budget" name="budget" type={"number"}>
                                    <input type="number"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Subject" name="subject"
                                           type={"text"} required={true}>
                                    <input type="text"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Message / Notes" name="msg"
                                           multiline rows={6}>
                                    <input type="text"/>
                                </TextField>
                                <Button type="submit" variant="contained">
                                    Send request
                                </Button>
                            </form>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

