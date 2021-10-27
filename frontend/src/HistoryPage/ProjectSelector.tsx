import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectAutoWidth() {
  const [project, setProject] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  return (
    <div>
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
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Projekt 1</MenuItem>
          <MenuItem value={21}>Projekt 2</MenuItem>
          <MenuItem value={22}>Projekt 3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}