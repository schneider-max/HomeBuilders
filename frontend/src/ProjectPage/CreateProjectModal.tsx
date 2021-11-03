import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Input, InputLabel } from '@mui/material';
import { getAxioxInstance } from '../shared/axios';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateProjectButton() {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button onClick={handleOpen}>Neues Projekt erstellen</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                <Typography variant="h6" component="h2">
                    Neues Projekt erstellen
                </Typography>
                <Typography component={"span"} sx={{ mt: 2 }}>
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(new FormData(e.currentTarget));
                        handleClose();
                    }}>
                        <FormControl fullWidth required sx={{ m: 1 }}>
                            <InputLabel htmlFor="project-input">Projekt Name</InputLabel>
                            <Input id="project-input" name="name"/>
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="budget-input">Budget</InputLabel>
                            <Input id="budget-input" name="budget"/>
                        </FormControl>
                        <Button sx={{ m: 1 }} type="submit">Erstellen</Button>
                    </Box>
                </Typography>
                </Box>
            </Modal>
        </Box>
    );

    function handleSubmit(form: FormData) {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        const axios = getAxioxInstance();

        axios.post("/api/projects", {
            email: sessionStorage.getItem("email"),
            project: {
                name: form.get("name"),
                budget: form.get("budget"),
                creationDate: date,
            }}).then(res => {
                window.location.reload();
        });      
    }
}