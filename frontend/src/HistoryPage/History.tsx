import DataGrid from './DataTable';
import Box from '@mui/material/Box';
// import SelectProject from './ProjectSelector';

function History() {
    return(
        <Box sx={{padding: '15px', height: '600px'}}>
            {/* <SelectProject /> */}
            <DataGrid />
        </Box>
    )        
}

export default History;