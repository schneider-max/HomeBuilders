import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
          <MenuItem value="" sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Alle</MenuItem>
          <MenuItem value={10} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Haus 1</MenuItem>
          <MenuItem value={21} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Baumhaus 1</MenuItem>
          <MenuItem value={22} sx={{display:"flex!important", margin: "5px!important", padding: "5px!important"}}>Höhle 1</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectAutoWidth;