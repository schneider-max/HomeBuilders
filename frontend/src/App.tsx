import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProjectList from './MainPage';
import Logo from './img/HomeBuilder_Logo_4c.png';
import History from './History';

function Footer() {
  return(
    <div style={{bottom: "0px", height: "40px", backgroundColor: "gray"}}>

    </div>
  );
}

function NavBar() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Home" />
        <Tab label="History" />
        <Tab label="Logout" />
      </Tabs>
    </Box>
  );
}

function App() {
  return (
    <div className="App" style={{backgroundColor: 'lightgray', height: "100%"}}>
      <Box sx={{backgroundColor: 'lightblue', top: '0px', fontSize: '30px', height: '100px', padding: '15px'}} className="titleName">
        <img src={Logo} style= {{width: "300px"}}></img>
      </Box>
      <Box>
        <React.StrictMode>
          <NavBar/>
        </React.StrictMode>  
        <React.StrictMode>
          <History />
        </React.StrictMode> 
      </Box>
      <Box>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
