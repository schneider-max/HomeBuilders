import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axios, {AxiosRequestConfig} from "axios";

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

function handleRequestSent(event: any, project, supplier, sector) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    try {
        let sessionToken = sessionStorage.getItem('token');
        if (sessionToken != null && data != null) {
            const options: AxiosRequestConfig = {
                url: "http://localhost:3001/api/requests",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-JWT-Token": sessionToken
                },
                data: {
                    firstname: data.get("firstname"),
                    lastname: data.get("lastname"),
                    email: data.get("email"),
                    price: data.get("budget"),
                    subject: data.get("subject"),
                    message: data.get("msg"),
                    sectors: sector,
                    suppliers: supplier,
                    projects: project
                }
            }
            axios(options)
                .then(res => console.log(res))
                .catch(ex => console.log(ex));
        }
    } catch (ex: any) {

    }
}

export default function ModalRequest(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <div>
                            <form className="mui-form" onSubmit={(event: any) => {
                                handleRequestSent(event, props.project, props.supplier, props.sector);
                                handleClose()
                            }}>
                                <TextField sx={styleInputs} fullWidth label="First name" name="firstname">
                                    <input type="text"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Last name" name="lastname">
                                    <input type="text"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="E-Mail" name="email"
                                           defaultValue={sessionStorage.getItem("email")?.toString()!}>
                                    <input type="email"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Budget" name="budget">
                                    <input type="number"/>
                                </TextField>
                                <TextField sx={styleInputs} fullWidth label="Subject" name="subject">
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

