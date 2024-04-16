import React, { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Modal from '@mui/material/Modal';
import '../css/Inicio.css';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import EditarDatos from '../componentes/EditarDatos';
import '../css/Alta.css';
import { useParams } from 'react-router-dom';

const Editar = ({patient}) => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [patientData, setPatientData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    handleClose(); // Cierra el menú al abrir la modal
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
    handleClose(); // Cierra el menú al abrir la modal de eliminación
  };

  const handleDeletePatient = (id) => {
    fetch(`http://localhost:3000/api/pacientes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el paciente.');
        }
        console.log('Paciente eliminado');
        // Agregar lógica para actualizar la lista de pacientes después de la eliminación
      })
      .catch(error => {
        console.error('Error al eliminar el paciente:', error);
      });
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Inicio');
  };
  const handleUpdatePatient = (updatedPatient) => {
    fetch(`http://localhost:3000/api/pacientes/${updatedPatient.id}`, {
      method: 'PATCH', // Utiliza PUT para actualizar los datos del paciente
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPatient),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al actualizar el paciente.');
        }

        return response.json();
      })
      .then(data => {
        console.log('Paciente actualizado:', data);
        // Agregar lógica para actualizar la lista de pacientes si es necesario
      })
      .catch(error => {
        console.error('Error al actualizar el paciente:', error);
      });
  };

  useEffect(() => {
    // Fetch de los datos del paciente usando el ID obtenido de la URL
    fetch(`http://localhost:3000/api/pacientes/${id}`)
      .then(response => response.json())
      .then(data => setPatientData(data))
      .catch(error => console.error('Error al obtener datos del paciente:', error));
  }, [id]);

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
          <Avatar />
        </div>
      </header>
      <body className='dardealta'>
        <Avatar sx={{ width: 200, height: 200, position: 'relative', fontSize: 60 }}>
          a
        </Avatar>
        <IconButton
          aria-label="options"
          aria-controls="avatar-menu"
          aria-haspopup="true"
          onClick={handleClick}
          size="small"
          sx={{ backgroundColor: 'white', borderRadius: '50%', position: "absolute", width: 50, height: 50, zIndex: 1, left: 320, bottom: 280, border: 1 }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="avatar-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleModalOpen}>Cambiar credenciales</MenuItem>
          <MenuItem onClick={handleDeleteModalOpen}>Eliminar usuario</MenuItem>
        </Menu>

        {/* Ventana modal para cambiar credenciales */}
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          sx={{justifyContent:"center",alignItems:"center",display:"flex"}}
        >
          <div className="modal">
            <h2 id="modal-title">Cambiar credenciales</h2>
            <form className='cont-form'>
            <input placeholder='Usuario'>
    
    </input>
    <input placeholder='Contraseña' type='password'>
    
    </input>
            </form>
       <button  className='button-delete' >
        Guardar cambios
       </button>
          </div>
        </Modal>

        {/* Ventana modal para eliminar usuario */}
        <Modal
  sx={{justifyContent:"center",alignItems:"center",display:"flex"}}
  open={isDeleteModalOpen}
  onClose={handleDeleteModalClose}
  aria-labelledby="delete-modal-title"
  aria-describedby="delete-modal-description"
>
  <div className="modal">
    <h2 id="modal-title">Eliminar usuario</h2>
    <p id="delete-modal-description">
      ¿Estás seguro de que deseas eliminar este usuario?
    </p>
    <div className='button-agroup'>
      <button className='button-delete' onClick={handleDeleteModalClose}>Cancelar</button>
   
      <button className='button-delete' onClick={() => {
  if (selectedPatient) {
    handleDeletePatient(selectedPatient.id); // Elimina el paciente con el ID seleccionado
    handleDeleteModalClose(); // Cierra la modal después de la eliminación
  }
}}>Eliminar</button>
      
    </div>
  </div>
</Modal>

        <form className='cont-formulario'>
        <EditarDatos patientId={patient.ID} onUpdatePatient={handleUpdatePatient} patient={patient} />
        </form>
      </body>
    </>
  );
}

export default Editar;
