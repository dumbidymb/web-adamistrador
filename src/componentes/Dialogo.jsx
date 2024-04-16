import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import '../css/Inicio.css'
import { Avatar } from '@mui/material';
import BasicDatePicker from './Calendario';
import { LineChart } from '@mui/x-charts/LineChart';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ onClose }) {
  const handleClose = () => {
    onClose(); 
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={close}  // Cambia 'open' a 'close' para usar el estado correcto
        onClose={handleClose}
        TransitionComponent={Transition}
        
      >
        <AppBar  sx={{ position: 'relative' }}>
          <header className='toolbar'>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Mediciones
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Guardar 
            </Button>
          </header>
        </AppBar>
     <section className='mediciones-section'>
        <div className='sectionM-1'>
<div className='section1-sub1'>
<div className='tarjeta-info-m'>
<Avatar sx={{ width: 130, height: 130, fontSize:56 }}>
    J
</Avatar>
<div>
    <h3>Jose Luis Estrada Pineda</h3>
    <li>
        No. de banda: Sh922-1
    </li>
</div>
</div>
<div className='calendario-m'>
<BasicDatePicker/>
</div>
</div>
<div className='section1-sub2'>
<LineChart
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ]}
  width={700}
  height={280}
/>
</div>
        </div>
<div className='sectionM-2'>
<div className='section2-sub1'>
<LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
</div>
<div className='section2-sub2'>
<LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
</div>
</div>
     </section>
      </Dialog>
    </React.Fragment>
  );
}
