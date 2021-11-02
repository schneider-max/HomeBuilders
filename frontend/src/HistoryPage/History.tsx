import * as React from 'react';
import DataGrid from './DataTable';
import Box from '@mui/material/Box';
import Select from './ProjectSelector';
import PhaseDetail from './Details';


function History() {
    return(
        <Box sx={{padding: '15px', height: '600px'}}>
            <Select />
            <DataGrid />
            <PhaseDetail />
        </Box>
    )        
}

export default History;