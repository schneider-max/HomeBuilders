import {AccessTime, CheckCircleOutline, HighlightOff} from "@mui/icons-material";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {useState} from "react";
import {getAxioxInstance} from "../shared/axios";
import StatusIcon from "./StatusIcons";

export default function StatusChangeForm(props: any) {
  const [status, setStatus] = useState("");
  const [requestId, setRequestId] = useState(0);

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const handleRequestChange = event => {
    setRequestId(event.row.id);
  };

  const sendRequestStatusUpdate = () => {
    if (status !== "" && requestId !== 0) {
      const axios = getAxioxInstance();
      axios
          .post(`http://localhost:3001/api/requests/${requestId}/${status}`)
          .then(() => {
            window.location.href = `/home?redirect=sectors&projectId=${props.projectId}`;
          });
    }
  };

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
          <MenuItem value={"a"}>
            <CheckCircleOutline sx={{ color: "green" }} {...props} />
          </MenuItem>
          <MenuItem value={"p"}>
            <AccessTime sx={{ color: "orange" }} {...props} />
          </MenuItem>
          <MenuItem value={"c"}>
            <HighlightOff sx={{ color: "red" }} {...props} />
          </MenuItem>
        </Select>
      </FormControl>
      <DataGrid
        style={{ marginTop: "10px" }}
        rows={mapRequestsToGridData(props.requests)}
        columns={columns}
        pagination
        autoHeight={true}
        pageSize={8}
        onRowClick={handleRequestChange}
      />
      <Button
        fullWidth
        sx={{ marginTop: "10px" }}
        variant="contained"
        onClick={sendRequestStatusUpdate}
      >
        Save
      </Button>
    </div>
  );
}

const columns: GridColDef[] = [
  {
    field: "statusIcon",
    headerName: "Status",
    flex: 0.5,
    renderCell: params => {
      return (
        <Button>
          <StatusIcon {...params.row.status}/>
        </Button>
      );
    }
  },
  { field: "subject", headerName: "Subject", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
  { field: "budget", headerName: "Budget", flex: 1 },
  { field: "sender", headerName: "Sender", flex: 1 }
];

function mapRequestsToGridData(requests): GridRowsProp {
  return requests.map(request => {
    return {
      id: request.id,
      status: request.status,
      subject: request.subject,
      date: request.creationDate,
      budget: request.budget + ' €',
      sender: request.email
    };
  });
}
