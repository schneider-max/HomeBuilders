import { Backdrop, Box, Fade, Grid, Modal, selectClasses } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { getAxioxInstance } from '../shared/axios';
import { Project } from '../../../backend/lib/db/entities/entity.project'

let projectsAll: Project[];
let selectedRow: any;

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 0.5 },
  { field: 'project', headerName: 'Projekt', flex: 1},
  { field: 'phase', headerName: 'Phase', flex: 1},
  { field: 'status', headerName: 'Status',flex: 1},
  {
    field: 'cost',
    headerName: 'Kosten',
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
 
  private handleOpen = (event: any) => {
    this.state.open = true;
    this.setState(this.state);
    selectedRow = event.row;
  };

  private handleClose = () => {
    this.state.open = false;
    this.setState(this.state);
  };

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
    projectsAll = this.state.projects;
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
  fontSize: "16px",
  fontFamily: "sans-serif",
}

const modalHeader = {
  marginTop: "15px",
  marginLeft: "0px",
  marginBottom: "15px",
  fontSize: "24px",
  fontFamily: "sans-serif",
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

function Info() {
  const project_id = getProject();
 
  const request = projectsAll[project_id - 1].requests[selectedRow.id - 1]

  return (
      <Box>
          <Grid style={modalInfo} container spacing={3}>
              <Grid item xs={3}>
                  Email:
              </Grid>
              <Grid item xs={9}>
                  {request.email}
              </Grid>
          </Grid>
          <Grid style={modalInfo} container spacing={3}>
              <Grid item xs={3}>
                  Betreff:
              </Grid>
              <Grid item xs={9}>
                 {request.subject}
              </Grid>
          </Grid>
          <Grid style={modalInfo} container spacing={3}>
              <Grid item xs={3}>
                  Budget:
              </Grid>
              <Grid item xs={9}>
                {request.budget}
              </Grid>
          </Grid>
          <Grid style={modalInfo} container spacing={3}>
              <Grid item xs={3}>
                  Nachricht:
              </Grid>
              <Grid item xs={9}>
                  {request.message}
              </Grid>
          </Grid>
      </Box>
  )
}

function getProject() : number {

  for (let index = 0; index < projectsAll.length; index++) {
    const project = projectsAll[index];
    let projectName : string = project.name;
    let selectedrowName : string = selectedRow.project;
    if (projectName === selectedrowName) {
      return project.id;
    }
  }
  return -1;
}

class Information extends React.Component {
  render(){
  
      return(
          <Info  />
      )
  }
}