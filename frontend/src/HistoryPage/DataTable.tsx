import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PhaseDetail from './Details';

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

      axios.get("/api/requests/TestUser@hotmail.com")
          .then((res : any) => {
              const projects = res.data;
              this.setState( {projects} );
          }) 
  }

  render() {
    return (
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={getValues(this.state.projects)}
          columns={columns}
          pageSize={8}
          rowsPerPageOptions={[8]}
          style={{margin: "8px", backgroundColor: "gray"}}   
          onRowClick={rowClicked} 
        />
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

