import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect } from 'react';

export default function SelectProject() {
  const [item, setProject] = React.useState('');
  const [projectList, setProjectList] = React.useState([]);

  const handleChange = (event: SelectChangeEvent) => {
    setProject(event.target.value);
  };

  useEffect(() => {
      
    const axios = require("axios").create({
      baseURL: 'http://localhost:3001'
    });

    axios.get("/api/requests/TestUser@hotmail.com")
    .then((res : any) => {
      setProjectList(res.data)
    });
  },[]);

  return (
    <div style={{textAlign: "left"}}>
      <FormControl sx={{ m: 1, minWidth: 110 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Projekt</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={item}
          onChange={handleChange}
          autoWidth
          label="Projekt"
        >
          <MenuItem value="all">Alle</MenuItem>
          {projectList.map((project: any ) => (
            <MenuItem key={project.id} value={project.name}>
              {project.name}
            </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}

