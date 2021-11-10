import {Button, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Component} from "react";
import LinearWithValueLabel from "../Progressbar";
import {Redirect} from "react-router-dom";
import {getAxioxInstance} from "../shared/axios";
import DeleteIcon from '@mui/icons-material/Delete';

export default class ProjectCard extends Component<any> {

  state = {
    redirect: false,
    project: null
  };

  componentDidMount() {

    const axios = getAxioxInstance();
    axios.get(`/api/sectors/${this.props.id}`).then(res => {
      this.setState( {project: res.data} );
      
      const url: URL = new URL(window.location.href);
      if (url.searchParams.get("redirect") === 'sectors' && url.searchParams.get("projectId") == this.props.id){
        this.setRedirect();
      }
    })
  }

  setRedirect = () => {
    this.setState( {redirect: true} )
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/sectors',
        state: {
          projectWithRequests: this.props,
          projectWithSectors: this.state.project
        }     
      }}/>
    }
  }

  private deleteProject(id: number) {
    const axios = getAxioxInstance();

    axios.delete(`/api/projects/${id}`).then(() => {
      window.location.reload();
    });
  }

  render() { 
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
              <LinearWithValueLabel {... {progress: calcBudgetProgress(this.props.requests, this.props.budget)}}/>
            </Typography>
            <br/>
            <Typography component={"span"} variant="body2" color="text.secondary">
              <div style={{ textAlign: 'left' }}>Progress:</div>
              <LinearWithValueLabel {...{progress: calcSectorProgress(this.props.requests, this.state.project)}} />
            </Typography>
            <Button sx={{position: "absolute", bottom: 0, right: 0, margin: 2}} onClick={(e) => {e.stopPropagation(); this.deleteProject(this.props.id)}}><DeleteIcon /></Button>
          </CardContent>
        </CardActionArea>       
      </Card>
    );
  }
}

export function calcSectorProgress(requests, project) {
  if (requests == null || project == null)
    return 0;

  let acceptedSectors: number = 0;
  let usedSectors: number[] = [];

  requests.forEach(r => {
    if (r.status === 'a' && !usedSectors.includes(r.sectors.id)) {
      usedSectors.push(r.sectors.id)
      acceptedSectors += 1;
    }
  })
    
  return (acceptedSectors / project[0].sectors.length) * 100;
}

export function calcBudgetProgress(requests, totalBudget) {
  if (requests == null || totalBudget == null)
    return 0;

  let usedBudget: number = 0;

  requests.forEach(r => {
    if (r.status === 'a')
      usedBudget += Number(r.budget);
  })

  return (usedBudget / totalBudget) * 100;
}

export function calcLeftoverBudget(requests, totalBudget) {
  if (requests == null || totalBudget == null)
    return 0;

  let usedBudget: number = 0;

  requests.forEach(request => {
    if (request.status === 'a')
      usedBudget += Number(request.budget);
  })

  return totalBudget - usedBudget;
}