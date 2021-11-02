import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Component } from "react";
import LinearWithValueLabel from "../Progressbar";

export default class ProjectCard extends Component<any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card sx={{ width: "100%" }}>
        <CardActionArea>
          <CardContent sx={{ height: "150px" }}>
            <Typography gutterBottom variant="h5" component="div">
              {this.props.name}
            </Typography>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Budget: {this.props.budget}</div>
              <LinearWithValueLabel />
            </Typography>
            <br></br>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Baufortschritt:</div>
              <LinearWithValueLabel />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}