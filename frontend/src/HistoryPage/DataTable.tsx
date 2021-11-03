import { DataGrid, GridColDef } from '@mui/x-data-grid';

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

function DataTable() {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid 
        rows={rows}
        columns={columns}
        pageSize={8}
        rowsPerPageOptions={[8]}
        style={{margin: "8px"}}    />
    </div>
  );
}

export default DataTable;