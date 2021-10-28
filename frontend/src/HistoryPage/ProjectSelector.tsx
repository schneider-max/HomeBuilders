import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { margin } from '@mui/system';

function SelectAutoWidth() {
  const [project, setProject] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <div style={{textAlign: "left"}}>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Projekt</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={project}
          onChange={handleChange}
          autoWidth
          label="Projekt"
        >
          <MenuItem value="" sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}><em>None</em></MenuItem>
          <MenuItem value={10} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Twenty</MenuItem>
          <MenuItem value={21} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Twenty one</MenuItem>
          <MenuItem value={22} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectAutoWidth;