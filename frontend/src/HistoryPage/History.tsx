import * as React from 'react';
import DataGrid from './DataTable';
import Box from '@mui/material/Box';
import SelectProject from './ProjectSelector';
import PhaseDetail from './Details';


function History() {
    return(
        <Box sx={{padding: '15px', height: '600px'}}>
            <SelectProject />
            <DataGrid />
            <PhaseDetail />
        </Box>
    )        
}

export default History;