import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/MenuItem'


function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Home" />
        <Tab label="History" />
        <Tab label="Logout" />
      </Tabs>
    </Box>
  );
}

function ProjectList() {
  return(
    <Box sx={{height: '600px', borderColor: 'black', margin: '15px'}}>
      <Grid container spacing={8} sx={{margin: "15px"}}>
        <Grid item xs={6}>
          <Item>
            Projekt 1
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            Projekt 2
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            Projekt 3
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            Projekt 4
          </Item>
        </Grid>
        <Grid item xs>
          <Item>
            Projekt 5
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

function App() {
  return (
    <div className="App">
      <Box sx={{backgroundColor: 'lightblue', top: '0px', fontSize: '30px', height: '50px', padding: '15px'}} className="titleName">
        HomeBuilders
      </Box>
      <React.StrictMode>
        <NavBar />
      </React.StrictMode>  
      <React.StrictMode>
        <ProjectList />
      </React.StrictMode> 
    </div>
  );
}

export default App;
