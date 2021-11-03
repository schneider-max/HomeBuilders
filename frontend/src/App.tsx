import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Logo from './img/HomeBuilder_Logo_4c.png';
import History from './HistoryPage/History';
import Image from './img/concrete_bg.jpg';
import ControlledAccordions from './sectorsInProject/ProjectSector';
import { Login } from '@mui/icons-material';
import { Typography } from '@mui/material';
import ProjectComponent from './ProjectPage/ProjectOverview';

function Footer() {
  return(
    <div style={{bottom: "0px", height: "40px", backgroundColor: "gray"}}></div>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
        <Tab label="Projects" />
        <Tab label="History" />
        <Tab label="Logout" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ProjectComponent></ProjectComponent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <History></History>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}

function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${Image})`, height: "100%"}}>
      <Box sx={{top: '0px', fontSize: '30px', height: '100px', padding: '15px'}} className="titleName">
        <img src={Logo} style= {{width: "300px"}} alt={"Logo"}/>
      </Box>
      <Box>
        <React.StrictMode>
          <NavBar/>
        </React.StrictMode>  
        <React.StrictMode>
          <ControlledAccordions />
          {/* <ProjectList /> */}
        
        </React.StrictMode> 
      </Box>
      <Box>
        <Footer />
      </Box>
    </div>
  );
}

export default App;
