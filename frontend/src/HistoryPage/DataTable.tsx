import { Backdrop, Box, Fade, Grid, Modal } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { getAxioxInstance } from '../shared/axios';
// import ChangeProject from './ChangeProjects';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 0.5, },
  { field: 'project', headerName: 'Projekt', flex: 1},
  { field: 'phase', headerName: 'Phase', flex: 1},
  { field: 'status', headerName: 'Status',flex: 1},
  {
    field: 'cost',
    headerName: 'Kosten',
    //type: 'number',
    flex: 1
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    flex: 1,
  },
];

export default class DataTable extends React.Component { 
  state = {
    projects: [],
    open: false,

  };
 
  private handleOpen = () => {
    this.state.open = true;
    this.setState(this.state)
  };

  private handleClose = () => {
    this.state.open = false;
    this.setState(this.state);
  };

// set state in this method to trigger re-render on request completion
  componentDidMount() {
      const axios = getAxioxInstance();

      axios.get("/api/requests/" + sessionStorage.getItem("email"))
          .then((res : any) => {
              const projects = res.data;
              this.state.projects = projects;
              this.setState(this.state);
          }) 
  }

  render() {
    return (
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid 
          rows={getValues(this.state.projects)}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          style={{margin: "8px", backgroundColor: "gray"}}   
          onRowClick={this.handleOpen} 
        />
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={this.state.open}>
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
      </div>
    );
  }
}


function getValues(projects: any){
  const values : any = [];
  projects.forEach(project => {
    project.requests.forEach(request => {
      values.push({id : request.id, project: project.name, phase: request.sectors.name, status: request.status, cost: request.budget, date: request.creationDate});
    });
  });

  return values;
}


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