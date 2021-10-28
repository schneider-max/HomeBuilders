import * as React from 'react';
import DataGrid from './DataTable';
import Box from '@mui/material/Box';
import Select from './ProjectSelector';


function History() {
    return(
        <Box sx={{padding: '15px', height: '600px'}}>
            <Select />
            <DataGrid />
        </Box>
    )        
}

export default History;