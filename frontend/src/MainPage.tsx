import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import LinearWithValueLabel from './Progressbar';


function ActionAreaCard(props: any) {
    return (
      <Card sx={{width: "100%"}}>
        <CardActionArea>
          <CardContent sx={{height: "150px"}}>
            <Typography gutterBottom variant="h5" component="div">
                {props.projectName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <div style={{textAlign: 'left'}}>Budget:</div>
                <LinearWithValueLabel />
            </Typography>
            <br></br>
            <Typography variant="body2" color="text.secondary">
            <div style={{textAlign: 'left'}}>Baufortschritt:</div>
            <LinearWithValueLabel />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
}

function ProjectList() {
    return(
        <Box sx={{height: '100%', borderColor: 'black'}}>
            <Grid container spacing={2} sx={{margin: "15px", width: "calc(100% - 40px)"}}>
                <Grid item xs={4}>
                    <ActionAreaCard projectName="Projekt 1" />
                </Grid>
                <Grid item xs={4}>
                    <ActionAreaCard projectName="Projekt 2"/>
                </Grid>
                <Grid item xs={4}>
                    <ActionAreaCard projectName="Projekt 3"/>
                </Grid>
                <Grid item xs={4}>
                    <ActionAreaCard projectName="Projekt 4"/>
                </Grid>
                <Grid item xs={4}>
                    <ActionAreaCard projectName="Projekt 5"/>
                </Grid>
                <Grid item xs={12} style={{marginTop: "15px", padding: "15px", height: "100px"}}>
                    <Button style={{backgroundColor: "white", width: "20%", height: "100%", color: 'black'}}>Neues Projekt</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ProjectList;