

import Avatar from '@mui/material/Avatar';
import '../css/Inicio.css'
import Logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import '../css/Alta.css'
import HorizontalLinearStepper from '../componentes/HorizontalLinearStepper';

const DarDeAlta = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
 
    navigate('/Inicio');
  };
  return (
    <>
      <header className='principal'>

        
<div className='p1'>
<img src={Logo} alt="" />
</div>
<div className='p2'>


<button  onClick={handleButtonClick} className='bt1-p'>
regresar
</button>

<Avatar>

</Avatar>
    </div>

    
</header>
    <body className='dardealta'>

<form className='cont-formulario'>
  <HorizontalLinearStepper/>

</form>


    </body>
    </>
  )
}

export default DarDeAlta