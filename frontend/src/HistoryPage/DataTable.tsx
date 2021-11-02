import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PhaseDetail from './Details';
import ProjectList from '../MainPage';
// import { isPropertySignature } from 'typescript';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', flex: 0.5},
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

const rows = [
  { id: 1, project: 'Haus1', phase: 'Fundament', status: 'in Arbeit', cost: 15000, date: "2017-05-24"},
  { id: 2, project: 'Haus1', phase: 'Baggern', status: 'Fertig/Erledigt', cost: 10000, date: "2017-01-24"},
];

function rowClicked(props: any){
  console.log(props.row.phase);
  <PhaseDetail />
}

export default class DataTable extends React.Component {
  state = {
    projects: []
};

// set state in this method to trigger re-render on request completion
componentDidMount() {
    const axios = require("axios").create({
        baseURL: 'http://localhost:3001'
    });

    axios.get("/api/projects/TestUser@hotmail.com")
        .then((res : any) => {
            const projects = res.data;
            this.setState({ projects });
        })
}
 
  
  render() {
    return (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={this.state.projects.map((project: any) => {
            return project.requests.map((request: any) => {
              return {id : request.id, project: project.name, phase: request.sectors.name, status: request.status, cost: request.busget, date: request.creationDate};
            })
          }
          )}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          style={{margin: "8px"}}   
          onRowClick={rowClicked} 
        />
      </div>
    );
  }
}

