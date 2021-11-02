import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { VerticalAlignBottomSharp } from '@mui/icons-material';
import { borderColor } from '@mui/system';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "500",
  bgcolor: 'white',
  border: '2px solid #000',
  p: 4,
};

const styleInputs = {
  marginBottom: "2em",
  borderColor: "#d50000"
};

export default function ModalRequest() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ihre Anfrage an [Suppliername]
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
          <div>
              <form className="mui-form">
              <div className="mui-textfield">
                  <Box sx={{width: 500, maxWidth: '100%',}}>
                   <TextField sx={styleInputs} fullWidth label="Name Absender" id="fullWidth" >
                      <input type="text" />
                   </TextField>
                 </Box>
              </div>
               <div className="mui-textfield">
                  <Box sx={{width: 500, maxWidth: '100%',}}>
                   <TextField sx={styleInputs} fullWidth label="Email Absender" id="fullWidth" >
                      <input type="text" />
                   </TextField>
                 </Box>
                </div>
                <div className="mui-textfield">
                  <Box sx={{width: 500, maxWidth: '100%',}}>
                   <TextField sx={styleInputs} fullWidth label="Betreff eingeben" id="fullWidth" >
                      <input type="text" />
                   </TextField>
                 </Box>
              </div>
              <button  type="submit" className="mui-btn mui-btn--raised">Anfrage absenden</button>
              </form>
          </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

