import Box from '@mui/material/Box';
import {AccessTime, CheckCircleOutline, HighlightOff} from '@mui/icons-material';

export default function StatusIcon(props: any) {
  let status = props[0];

  return (
    <Box sx={{ minWidth: 120}}>
      {(() => {
        if (status === 'a') return (<CheckCircleOutline sx={{ color: "green" }} {...props} />)
        else if (status === 'p') return (<AccessTime sx={{ color: "orange" }} {...props} />)
        else return (<HighlightOff sx={{ color: "red" }} {...props} />)     
      })()}
    </Box>
  );
}