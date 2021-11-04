import {Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Component } from "react";
import LinearWithValueLabel from "../Progressbar";
import { Redirect } from "react-router-dom";
import { getAxioxInstance } from "../shared/axios";

export default class ProjectCard extends Component<any> {

  state = {
    redirect: false,
  };

  componentDidMount() {

    const axios = getAxioxInstance();

    axios.get(`/api/sectors/${this.props.id}`).then(res => {
      console.log(res.data);
    })

  }

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
    let usedBudget: number = 0;

    this.props.requests.forEach(r => {
      if (r.status === 'p')
        usedBudget += r.budget;
    })

    const budgetProgress = (usedBudget / this.props.budget) * 100;

    return (
      <Card sx={{ width: "100%" }}>
        {this.renderRedirect()}
       <CardActionArea onClick={this.setRedirect}>
          <CardContent sx={{ height: "200px" }}>
            <Typography variant="h5" component={'span'}>
              {this.props.name}
            </Typography>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Budget: {this.props.budget}</div>
              <LinearWithValueLabel {... {progress: budgetProgress}}/>
            </Typography>
            <br/>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Progress:</div>
              <LinearWithValueLabel {...{progress: budgetProgress}} />
            </Typography>
          </CardContent>
        </CardActionArea>       
      </Card>
    );
  }
}