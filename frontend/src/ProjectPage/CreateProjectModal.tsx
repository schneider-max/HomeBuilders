import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputLabel } from '@mui/material';
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
    const [sectors, setSectors] = React.useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const axios = getAxioxInstance();

        axios.get('/api/sectors').then(res => {
            setSectors(res.data);
        });
    }, [])
    
    return (
        <Box>
            <Button onClick={handleOpen}>Create new project</Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                <Typography variant="h6" component={'span'}>
                    Create new project
                </Typography>
                <Typography component={"span"} sx={{ mt: 2 }}>
                    <Box component="form" onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(new FormData(e.currentTarget));
                        handleClose();
                    }}>
                        <FormControl fullWidth required sx={{ m: 1 }}>
                            <InputLabel htmlFor="project-input">Project name</InputLabel>
                            <Input id="project-input" name="name"/>
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }}>
                            <InputLabel htmlFor="budget-input">Budget</InputLabel>
                            <Input id="budget-input" name="budget"/>
                        </FormControl>
                        <h3>Select wanted company sectors</h3>
                        <FormGroup>
                            {sectors.map((sector: any) => {
                                const name = "sector_" + sector.id
                                return (
                                    <FormControlLabel value={sector.id} name={name} label={sector.name} key={sector.id} control={<Checkbox defaultChecked color="success"/>}/>
                                )
                            })}    
                        </FormGroup>
                        <Button sx={{ m: 1 }} type="submit">Create</Button>
                    </Box>
                </Typography>
                </Box>
            </Modal>
        </Box>
    );

    function handleSubmit(form: FormData) {

        let sectors: string[] = [];
        form.forEach(function(value, key){
            if (key.startsWith("sector")) {
                sectors.push(value.toString())
            }
        });

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let budget = form.get("budget") == '' ? null : form.get("budget");

        const axios = getAxioxInstance();

        axios.post("/api/projects", {
            email: sessionStorage.getItem("email"),
            project: {
                name: form.get("name"),
                budget: budget,
                creationDate: date,
            },
            sectors: sectors
        }).then(res => {
            window.location.reload();
        });      
    }
}