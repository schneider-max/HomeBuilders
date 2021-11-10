import {Box, Button, Modal} from "@mui/material";
import {useEffect, useState} from "react";
import StatusChangeForm from "./StatusChangeForm";
import StatusIcon from "./StatusIcons";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    height: "75%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
export default function StatusModal(props: any) {
    const [status, setStatus] = useState('c');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (props.requests.length > 0) {
            if (props.requests.some(request => request.status === 'a')) {
                setStatus('a');
            } else if (props.requests.some(request => request.status === 'p')) {
                setStatus('p');
            }
        }
    }, [props.request])

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Button onClick={(e) => {e.stopPropagation(); handleOpen()}}>
                <StatusIcon {...status}/>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style} onClick={(e) => e.stopPropagation()}>
                    <StatusChangeForm status={status} requests={props.requests} projectId={props.projectId}/>
                </Box>
            </Modal>
        </div>
    );
}