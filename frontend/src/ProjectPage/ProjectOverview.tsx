import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { getAxioxInstance } from "../shared/axios";
import CreateProjectButton from "./CreateProjectModal";
import ProjectCard from "./ProjectCard";

export default class ProjectComponent extends React.Component {

    state = {
        projects: []
    };

    // set state in this method to trigger re-render on request completion
    componentDidMount() {
        const axios = getAxioxInstance();

        axios.get("/api/projects/" + sessionStorage.getItem("email"))
            .then(res => {
                const projects = res.data;
                this.setState({ projects });
            })
    }

    render() {
        return (
            <Box sx={{ height: '100%', borderColor: 'black' }}>
                <Grid container spacing={2} sx={{ margin: "15px", width: "calc(100% - 40px)" }}>
                    {this.state.projects.map((project: any) => {
                        return (
                            <Grid item xs={4} key={project.id}>
                                <ProjectCard {...project} />
                            </Grid>
                        )
                    })}
                    <Grid item xs={12} style={{ marginTop: "15px", padding: "15px", height: "100px" }}>
                        <CreateProjectButton></CreateProjectButton>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    private createProject() {

    }

}