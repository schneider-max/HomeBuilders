import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const modalInfo = {
    margin: "2.5px",
    width: "100%",
    fontSize: "20px",
    fontFamily: "sans-serif",
}

const modalHeader = {
    marginTop: "15px",
    marginLeft: "0px",
    marginBottom: "15px",
    fontSize: "32px",
    fontFamily: "sans-serif",
    // textAlign: "left",
    // fontsize: "32px",
    // fontfamily: "sans-serif",
};


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Info(project: any) {
    const request = project.request;

    return (
        <Box>
            <Grid style={modalInfo} container spacing={3}>
                <Grid item xs={3}>
                    Email:
                </Grid>
                <Grid item xs={9}>
                    testus.test@schule.at
                </Grid>
            </Grid>
            <Grid style={modalInfo} container spacing={3}>
                <Grid item xs={3}>
                    Betreff:
                </Grid>
                <Grid item xs={9}>
                    Test
                </Grid>
            </Grid>
            <Grid style={modalInfo} container spacing={3}>
                <Grid item xs={3}>
                    Budget:
                </Grid>
                <Grid item xs={9}>
                    3000000000000 €
                </Grid>
            </Grid>
            <Grid style={modalInfo} container spacing={3}>
                <Grid item xs={3}>
                    Notizen:
                </Grid>
                <Grid item xs={9}>
                    Das ist eine Testnotiz über die Kommunikation mit Herr Testus Test!
                </Grid>
            </Grid>
        </Box>
    )
}

class Information extends React.Component {
    constructor(props : any){
        super(props);

    }
    state = {
        projects: []
    };

    // set state in this method to trigger re-render on request completion
    componentDidMount() {
        const axios = require("axios").create({
            baseURL: 'http://localhost:3001'
        });

        axios.get("/api/projects/TestUser@hotmail.com")
            .then(res => {
                const projects = res.data;
                this.setState({ projects });
            })
    }

    render(){
        return(
            <Info {... this.state.projects} />
        )
    }
}

function PhaseDetail(props : any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box style={modalHeader}>
                Info
            </Box>
            <hr></hr>
            <Information />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default PhaseDetail;