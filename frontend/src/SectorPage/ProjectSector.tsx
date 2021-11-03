import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearWithValueLabel from '../Progressbar';
import ModalRequest from "./ModalRequest";
import StatusSelect from './StatusIcons';
import Logo from '../img/HomeBuilder_Logo_4c.png';


import CSS from 'csstype';

//styles header of the sector page
const SectorHeaderStyle: CSS.Properties = {
  backgroundColor: 'white',
  marginTop:"16px",
  marginBottom:"10px",
  marginRight:"10px",
  marginLeft:"10px",
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  padding: "0px 16px"

};
const SectorPageStyle: CSS.Properties = {
  backgroundImage: `url("/static/media/concrete_bg.c57b6ffb.jpg")`,
  height: "100vh"
};

//function that defines the suppliers card
function ActionAreaCard(props: any) {
  return (
    <Card sx={{width: "100%"}}>
      <CardActionArea>
        <CardContent sx={{height: "150px"}}>
          <Typography gutterBottom variant="h5" component="div">
              {props.companyName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              <div style={{textAlign: 'left'}}>[Platzhalter IMG Dienstleister]</div>              
          </Typography>
          <br></br>
            <ModalRequest />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ShowSectors() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
  return (
    <div className="App" style={SectorPageStyle}>
      <div style={SectorPageStyle}>
      <Box sx={{top: '0px', fontSize: '30px', height: '100px', padding: '15px'}} className="titleName">
        <img src={Logo} style= {{width: "300px"}} alt={"Logo"}/>
      </Box>
      <Box>
        <div>
          {/* Panel Header          */}
          <div style={SectorHeaderStyle}>
          <Grid container spacing={2} >
              <Grid item xs={1}>
                <Typography>
                Status
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                [Platzhalter Projektname]
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant="body2" color="text.secondary">
                    <div style={{textAlign: 'left'}}>Baufortschritt </div>
                    <LinearWithValueLabel />
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                    <div style={{textAlign: 'left'}}>Budget available</div>
                    7.000.000 €
                </Typography>
              </Grid>
            </Grid>
          </div>

          {/* Panel 1. Sector          */}
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{margin: "10px"}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Erdarbeiten
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Click Me</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                    <Box sx={{height: '100%', borderColor: 'black'}}>
                      <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                          <Grid item xs={12} md={6} lg={4}>
                          <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                          <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                          <ActionAreaCard companyName="Buchner GmbH"/>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                          <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                          </Grid>
                          <Grid item xs={12} md={6} lg={4}>
                          <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                          </Grid>
                      </Grid>
                    </Box>  	  
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Panel 2. Sector          */}
          <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{margin: "10px"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Kellerbau
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Verfügbare Dienstleister</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <Box sx={{height: '100%', borderColor: 'black'}}>
                    <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Buchner GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                    </Grid>
                  </Box>  	  
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Panel 3. Sector          */}
          <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{margin: "10px"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Fundament
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Verfügbare Dienstleister</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <Box sx={{height: '100%', borderColor: 'black'}}>
                  <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Buchner GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                    </Grid>
                  </Box>  	 
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Panel 4. Sector          */}
          <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{margin: "10px"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Rohbau
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Verfügbare Dienstleister</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <Box sx={{height: '100%', borderColor: 'black'}}>
                  <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Buchner GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                    </Grid>
                  </Box>  	 
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Panel 5. Sector          */}
          <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} sx={{margin: "10px"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5bh-content"
              id="panel5bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Dach
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Verfügbare Dienstleister</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <Box sx={{height: '100%', borderColor: 'black'}}>
                  <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Buchner GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                    </Grid>
                  </Box> 
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Panel 6. Sector          */}
          <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} sx={{margin: "10px"}}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6bh-content"
              id="panel6bh-header"
            >
              <Typography>
                <StatusSelect />
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Innenausbau
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Verfügbare Dienstleister</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                  <Box sx={{height: '100%', borderColor: 'black'}}>
                  <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Buchner GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Holzhaider Bau GmbH"/>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                        <ActionAreaCard companyName="Wimberger Bau GesmbH"/>
                        </Grid>
                    </Grid>
                  </Box> 
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        </Box>
      </div>
    </div>
  );
}