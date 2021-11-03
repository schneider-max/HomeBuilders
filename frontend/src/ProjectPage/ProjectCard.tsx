import { MouseEvent } from 'react';
import { Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Component } from "react";
import LinearWithValueLabel from "../Progressbar";
import { Redirect } from "react-router-dom";

// function getSectors(project){
//  console.log("OnClick auf Project Card funktioniert !");
// }

export default class ProjectCard extends Component<any> {

  state = {
    redirect: false
  };
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  } 
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/sectors',
        state: {project: this.props}     
      }}/>
    }
  }  



  render() {
    return (
      <Card sx={{ width: "100%" }}>
              {this.renderRedirect()}
       <CardActionArea onClick={this.setRedirect}>
          <CardContent sx={{ height: "200px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.name}
            </Typography>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Budget: {this.props.budget}</div>
              <LinearWithValueLabel />
            </Typography>
            <br></br>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Progress:</div>
              <LinearWithValueLabel />
            </Typography>
          </CardContent>
        </CardActionArea>       
      </Card>
    );
  }
}