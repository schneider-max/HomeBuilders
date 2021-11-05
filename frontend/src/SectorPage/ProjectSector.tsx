import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {CardActionArea} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LinearWithValueLabel from '../Progressbar';
import ModalRequest from "./ModalRequest";
import StatusSelect from './StatusIcons';
import Logo from '../img/HomeBuilder_Logo_4c.png';
import CSS from 'csstype';
import {Business} from "@mui/icons-material";
import ProjectCard, { calcBudgetProgress, calcSectorProgress } from '../ProjectPage/ProjectCard';

//styles header of the sector page
const SectorHeaderStyle: CSS.Properties = {
    backgroundColor: 'white',
    marginTop: "16px",
    marginBottom: "10px",
    marginRight: "10px",
    marginLeft: "10px",
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    padding: "0px 16px"

};
const SectorPageStyle: CSS.Properties = {
    backgroundImage: `url("/static/media/concrete_bg.c57b6ffb.jpg")`,
    height: "100vh"
};

//todo[SK] is going to be removed when right data is fetched
function createSupplier(props: any) {
    return {id: props.id, companyName: props.companyName, email: props.email, webPage: props.webpage};
}

function ActionAreaCard(props: any) {
    return (
        <Card sx={{width: "100%"}}>
            <CardActionArea>
                <CardContent sx={{height: "150px"}}>
                    <Typography color="text.secondary">
                        <div style={{textAlign: 'center'}}>
                            <Business/>
                        </div>
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.companyName}
                    </Typography>
                    <br/>
                    <ModalRequest supplier={createSupplier(props)} project={props.project}/>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default function ShowSectors(props: any) {

    const projectRequests = props.location.state.projectWithRequests;
    const projectSectors = props.location.state.projectWithSectors;

    console.log(projectRequests
        )

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="App" style={SectorPageStyle}>
            <div style={SectorPageStyle}>
                <Box sx={{top: '0px', fontSize: '30px', height: '100px', padding: '15px'}} className="titleName">
                    <img src={Logo} style={{width: "300px"}} alt={"Logo"}/>
                </Box>
                <Box>
                    <div>
                        <div style={SectorHeaderStyle}>
                            <Grid container spacing={2}>
                                <Grid item xs={1}>
                                    <Typography>
                                        Status
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography>
                                        {projectRequests == null ? '' : projectRequests.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography variant="body2" color="text.secondary">
                                        <div style={{textAlign: 'left'}}>Planning progress</div>
                                        <LinearWithValueLabel {...{progress: calcBudgetProgress(projectRequests.requests, projectRequests.budget)}} />
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body2" color="text.secondary">
                                        <div style={{textAlign: 'center'}}>Budget available</div>
                                        {projectRequests.budget}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </div>


                        {/* Panel erzeugen         */}
                        {/* Change Accordion ID, expands all Accordions rn */}

                        {   
                            projectSectors == null ? 
                            (<div></div>) : 
                            projectSectors[0].sectors.map(
                                (sector: any) =>
                                {
                                    return(
                                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
                                                sx={{margin: "10px"}}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography>
                                                    <StatusSelect/>
                                                </Typography>
                                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                                    {sector.name}
                                                </Typography>
                                                <Typography sx={{color: 'text.secondary'}}>expand</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <Box sx={{height: '100%', borderColor: 'black'}}>
                                                        <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 30px)"}}>
                                                            {sector.suppliers.map(
                                                                (supplier: any) =>
                                                                {
                                                                    return(
                                                                    <Grid item xs={12} md={6} lg={4}>
                                                                        <ActionAreaCard project={projectSectors[0]} sector={sector} supplier={supplier}/>
                                                                    </Grid>
                                                                    )
                                                                }
                                                            )}
                                                        </Grid>
                                                    </Box>
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    )

                                }
                            )
                        }
                    </div>
                </Box>
            </div>
        </div>
    );
}