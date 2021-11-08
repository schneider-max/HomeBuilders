import * as React from "react";
import Box from '@mui/material/Box';
import CSS from 'csstype';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {AccessTime, CheckCircleOutline, HighlightOff} from '@mui/icons-material';

const styleIcons:CSS.Properties = {
    backgroundColor: 'white',
    padding: "5px",
};

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
    <Box sx={{ minWidth: 120}}>
      <FormControl fullWidth>
        <InputLabel id="select-label">Status</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={status}
          label="Status"
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          style={{ padding: 0 }}
        >
          <MenuItem value={10}><TodoIcon /></MenuItem>
          <MenuItem value={20}><PendingIcon /></MenuItem>
          <MenuItem value={30}><DoneIcon /></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}