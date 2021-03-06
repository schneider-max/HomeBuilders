import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import {CardActionArea} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ProgressbarWithLabel from "../Progressbar";
import ModalRequest from "./ModalRequest";
import StatusModal from "./StatusModal";
import Logo from "../img/HomeBuilder_Logo_4c.png";
import CSS from "csstype";
import {Business} from "@mui/icons-material";
import {calcLeftoverBudget, calcSectorProgress} from "../ProjectPage/ProjectCard";
import {Link} from "react-router-dom";
import Image from '../img/concrete1.jpg';


//styles header of the sector page
const SectorHeaderStyle: CSS.Properties = {
  backgroundColor: "white",
  marginTop: "16px",
  marginBottom: "10px",
  marginRight: "10px",
  marginLeft: "10px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  padding: "0px 16px"
};
const SectorPageStyle: CSS.Properties = {
  backgroundImage: `url(${Image})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '100vh'
};

function ActionAreaCard(props: any) {
  return (
    <Card sx={{ width: "100%" }}>
      <CardActionArea>
        <CardContent sx={{ height: "150px" }}>
          <Typography color="text.secondary">
            <div style={{ textAlign: "center" }}>
              <Business />
            </div>
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {props.supplier.companyName}
          </Typography>
          <br />
          <ModalRequest
            project={props.project}
            supplier={props.supplier}
            sector={props.sector}
          />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function ShowSectors(props: any) {
  const projectWithRequests = props.location.state.projectWithRequests;
  const projectWithSectors = props.location.state.projectWithSectors;

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="App" style={SectorPageStyle}>
      <div style={SectorPageStyle}>
        <Box
          sx={{
            top: "0px",
            fontSize: "30px",
            height: "100px",
            padding: "15px"
          }}
          className="titleName"
        >
          <Link to="home">
            <img src={Logo} style={{ width: "300px" }} alt={"Logo"} />
          </Link>
        </Box>
        <Box>
          <div>
            <div style={SectorHeaderStyle}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    {projectWithRequests == null
                      ? ""
                      : projectWithRequests.name}
                  </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{ textAlign: "center" }}>Planning progress</div>
                    <ProgressbarWithLabel
                      {...{
                        progress: calcSectorProgress(
                          projectWithRequests.requests,
                          projectWithSectors
                        )
                      }}
                    />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="text.secondary">
                    <div style={{textAlign: "center"}}>Budget available</div>
                    {calcLeftoverBudget(
                        projectWithRequests.requests,
                        projectWithRequests.budget
                    )} ???
                  </Typography>
                </Grid>
              </Grid>
            </div>
            {projectWithSectors == null ? (
              <div />
            ) : (
              projectWithSectors[0].sectors.map((sector: any) => {
                return (
                  <Accordion
                    expanded={expanded === `panel${sector.id}`}
                    onChange={handleChange(`panel${sector.id}`)}
                    sx={{ margin: "10px" }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${sector.id}bh-content`}
                      id={`panel${sector.id}bh-header`}
                    >
                      <Typography>
                        <StatusModal
                          requests={projectWithRequests.requests.filter(
                            filterRequest =>
                              filterRequest.sectors.name === sector.name
                          )}
                          projectId={projectWithRequests.id}
                        />
                      </Typography>
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {sector.name}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        Requests:{" "}
                        {
                          projectWithRequests.requests.filter(
                            filterRequest =>
                              filterRequest.sectors.name === sector.name
                          ).length
                        }
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        <Box sx={{ height: "100%", borderColor: "black" }}>
                          <Grid
                            container
                            spacing={2}
                            sx={{ margin: "15px", width: "calc(100% - 30px)" }}
                          >
                            {sector.suppliers.map((supplier: any) => {
                              return (
                                <Grid item xs={12} md={6} lg={4}>
                                  <ActionAreaCard
                                    project={projectWithSectors[0]}
                                    sector={sector}
                                    supplier={supplier}
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </Box>
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
