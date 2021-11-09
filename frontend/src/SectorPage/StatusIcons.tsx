import * as React from "react";
import Box from '@mui/material/Box';
import CSS from 'csstype';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {AccessTime, CheckCircleOutline, HighlightOff} from '@mui/icons-material';
import { useEffect } from "react";

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


export default function StatusSelect(props: any) {
  const [status, setStatus] = React.useState('c');

  useEffect(() => {
    let requestArray: any[] = []
    Object.keys(props).map((key) => requestArray.push(props[key]));
    
    if (requestArray.length > 0) {
      if (requestArray.some(requestArray => requestArray.status === 'a')) {
        setStatus('a');
      }
      else if (requestArray.some(requestArray => requestArray.status === 'p'))
        setStatus('p');
    }
  }, [])

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
          <MenuItem key="c" value="c"><TodoIcon sx={{color: "red"}} /></MenuItem>
          <MenuItem key="p" value="p"><PendingIcon sx={{color: "orange"}} /></MenuItem>
          <MenuItem key="a" value="a"><DoneIcon sx={{color: "green"}} /></MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}