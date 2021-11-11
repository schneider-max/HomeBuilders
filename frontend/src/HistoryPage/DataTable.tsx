import {Backdrop, Box, Fade, Grid, Modal} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React from 'react';
import {getAxioxInstance} from '../shared/axios';
import {Project} from '../../../backend/lib/db/entities/entity.project'

let projectsAll: Project[];
let selectedRow: any;

const columns: GridColDef[] = [
    {field: 'id', headerName: 'Id', flex: 0.5},
    {field: 'project', headerName: 'Project', flex: 1},
    {field: 'phase', headerName: 'Phase', flex: 1},
    {field: 'status', headerName: 'Status', flex: 1},
    {
        field: 'cost',
        headerName: 'Cost',
        flex: 1
    },
    {
        field: 'date',
        headerName: 'Date',

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
            .then((res: any) => {
                this.state.projects = res.data;
                this.setState(this.state);
            })
    }

    render() {
        projectsAll = this.state.projects;
        return (
            <div style={{height: '100%', width: '100%'}}>
                <DataGrid
                    rows={getValues(this.state.projects)}
                    columns={columns}
                    pageSize={9}
                    rowsPerPageOptions={[8]}
                    style={{margin: "8px", backgroundColor: "white"}}
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
                                <hr/>
                                <Information/>
                            </Box>
                        </Fade>
                    </Modal>
                </div>
            </div>
        );
    }
}



function getValues(projects: any) {
    const values: any = [];
    projects.forEach(project => {
        project.requests.forEach(request => {
                let tmpStatus = "pending";
                if(request.status == "a"){tmpStatus = "accepted"}
                else if(request.status == "c"){tmpStatus = "cancelled"}

            values.push({
                id: request.id,
                project: project.name,
                phase: request.sectors.name,
                status: tmpStatus,
                cost: request.budget + ' €',
                date: request.creationDate
            });
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

    let currentProject = projectsAll.find(project => project.id === project_id);
    if (currentProject != null) {

        let request = currentProject.requests.find(request => request.id === selectedRow.id);

        if (request !== undefined) {
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
                            Subject:
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
                            {request.budget} €
                        </Grid>
                    </Grid>
                    <Grid style={modalInfo} container spacing={3}>
                        <Grid item xs={3}>
                            Message:
                        </Grid>
                        <Grid item xs={9}>
                            {request.message}
                        </Grid>
                    </Grid>
                </Box>
            )
        }
    }
    return (<div/>)
}

function getProject(): number {

    for (let index = 0; index < projectsAll.length; index++) {
        const project = projectsAll[index];
        let projectName: string = project.name;
        let selectedrowName: string = selectedRow.project;
        if (projectName === selectedrowName) {
            return project.id;
        }
    }
    return -1;
}

class Information extends React.Component {
    render() {

        return (
            <Info/>
        )
    }
}