import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CSS from 'csstype';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//icons
import { Icon } from '@mui/material';
import { Icons } from 'material-table';
import {AccessTime, CheckCircleOutline, HighlightOff} from '@mui/icons-material';

const styleIcons:CSS.Properties = {
    backgroundColor: 'white',
    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    padding: "5px",
  
  };
// const statusIcons: typeof Icon = {
//     Pending: () => <AccessTimeIcon />,
//     Done: () => <DoneIcon />,
//     Todo: () => <TodoIcon />
// }
function TodoIcon(props: any){
    return(
        <div style = {styleIcons}>
            <HighlightOff {...props} />
        </div>
    );
}

function PendingIcon(props: any){
    return(
        <div style = {styleIcons}>
            <AccessTime {...props} />
        </div>
    );
}

function DoneIcon(props: any){
    return(
        <div style = {styleIcons}>
            <CheckCircleOutline {...props} />
        </div>
    );
}


export default function StatusSelect() {
  const [status, setStatus] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
         
        >
          <MenuItem value={10}><TodoIcon /></MenuItem>
          <MenuItem value={20}><PendingIcon /></MenuItem>
          <MenuItem value={30}><DoneIcon /></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}