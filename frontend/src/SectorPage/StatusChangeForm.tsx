import { AccessTime, CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useState } from "react";
import { getAxioxInstance } from "../shared/axios";
import StatusIcon from "./StatusIcons";

export default function StatusChangeForm(props: any) {
    const [status, setStatus] = useState('');
    const [requestId, setRequestId] = useState(0);

    const handleStatusChange = (event: SelectChangeEvent) => {
        setStatus(event.target.value as string);
    };

    const handleRequestChange = (event) => {
        setRequestId(event.row.id)
    }

    const sendRequestStatusUpdate = () => {
        if (status !== '' && requestId !== 0) {
            const axios = getAxioxInstance();
            axios.post(`http://localhost:3001/api/requests/${requestId}/${status}`).then(res => {
                window.location.reload();
            });
            
        }
    }

    return (
        <div style={{ height: "100%" }}>
            <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                    labelId="status-select-label"
                    id="status-select"
                    value={status}
                    label="Status"
                    onChange={handleStatusChange}
                >
                    <MenuItem value={'a'}><CheckCircleOutline sx={{ color: "green" }} {...props} /></MenuItem>
                    <MenuItem value={'p'}><AccessTime sx={{ color: "orange" }} {...props} /></MenuItem>
                    <MenuItem value={'c'}><HighlightOff sx={{ color: "red" }} {...props} /></MenuItem>
                </Select>
            </FormControl>
            <DataGrid 
                style={{ height: "90%", marginTop: "5px" }} 
                rows={mapRequestsToGridData(props.requests)} 
                columns={columns} 
                pagination 
                pageSize={10} 
                onRowClick={handleRequestChange} />
            <Button onClick={sendRequestStatusUpdate}>Save</Button>
        </div>
    )
}

const columns: GridColDef[] = [
    { field: 'statusIcon', headerName: "Status", flex: 0.5, renderCell: (params) => {
        return (
            <Button>
                <StatusIcon {...params.row.status}></StatusIcon>
            </Button>
        );
    }},
    { field: 'betreff', headerName: 'Betreff', flex: 1 },
    { field: 'datum', headerName: 'Datum', flex: 1 },
    { field: 'an', headerName: 'An', flex: 1 },
];

function mapRequestsToGridData(requests): GridRowsProp {
    const data = requests.map(request => {
        return {
            id: request.id,
            status: request.status,
            betreff: request.subject,
            datum: request.creationDate,
            an: request.email
        }
    })

    return data;
}