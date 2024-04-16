import React, { useState, useEffect } from 'react';
import Taarget_of_client from '../componentes/Taarget_of_client';
import Logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { SlideFade } from '@chakra-ui/react';
import { Avatar } from '@mui/material';
import '../css/Inicio.css'


const Inicio = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [recentlySearchedPatients, setRecentlySearchedPatients] = useState([]);

  
  const handleUpdatePatient = (updatedPatient) => {
    // Lógica para actualizar los datos del paciente en el estado
    // Puedes usar la función fetch para enviar los datos actualizados al backend si es necesario
  };

  const filteredPatients = patients.filter(patient =>
    patient.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    fetch('http://localhost:3000/api/pacientes/')
      .then(response => response.json())
      .then(data => {
        // Ordenar pacientes alfabéticamente por nombre completo
        const sortedPatients = data.data.sort((a, b) =>
          a.nombre.localeCompare(b.nombre)
        );
        setPatients(sortedPatients);
      })
      .catch(error => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  const handleButtonClick = () => {
    navigate('/Daralta');
  };

  const handleDeletePatient = () => {
    if (!selectedPatient) {
      console.error('No se ha seleccionado ningún paciente para eliminar.');
      return;
    }

    const { ID } = selectedPatient;
    fetch(`http://localhost:3000/api/pacientes/:id`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar al paciente.');
        }
        // Eliminar al paciente del estado local
        const updatedPatients = patients.filter(patient => patient.ID !== ID);
        setPatients(updatedPatients);
        setSelectedPatient(null);
        console.log('Paciente eliminado exitosamente:', selectedPatient);
      })
      .catch(error => {
        console.error('Error al eliminar al paciente:', error);
      });
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  
    // Verifica si el paciente ya está en la lista de buscados recientemente
    if (!recentlySearchedPatients.find(p => p.ID === patient.ID)) {
      setRecentlySearchedPatients(prevPatients => [patient, ...prevPatients]);
    }
  };
  
  return (
    <> 
      <header className='principal'>
        <div className='p1'>
          <img src={Logo} alt="" />
        </div>
        <div className='p2'>
          <button onClick={handleButtonClick} className='bt1-p'>
            Usuario nuevo 
          </button>
          <Avatar></Avatar>
        </div>
      </header>
      <body className='bien'>
        <div className='separar'>
          <aside className='section'>
            <div className='cont-clientes'>
              
            <form className="form">
      <button>
          <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
              <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.333" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
      </button>
      <input
      className='input'
  type="text"
  placeholder="Buscar pacientes"
  value={searchTerm}
  onChange={e => setSearchTerm(e.target.value)}
/>
      <button className="reset" type="reset">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
      </button>
  </form>
              <div className='elements-clients'>
              {filteredPatients.map(patient => (
                  <button
                    key={patient.ID}
                    className='tarjet-client'
                    onClick={() => handlePatientClick(patient)}
                  > 
                    <Avatar> {patient.nombre.charAt(0)}</Avatar>
                    <div className='info-text-client'>
                      <p>{`${patient.nombre} ${patient.apeMaterno} ${patient.apePaterno}`}</p>
                    </div>
                  </button>
                ))}
          
              </div>
            </div>
          </aside>
          <section className='section-of-clients'>
            <SlideFade in={selectedPatient !== null} offsetY='20px'>
              <Taarget_of_client patient={selectedPatient} onDeletePatient={handleDeletePatient} />
            </SlideFade>
          </section>
          <section className='actividad'>
           
PACIENTES BUSCADOS RECIENTEMENTE
            <div className='buscados-recientes'>
  {recentlySearchedPatients.map(patient => (
    <button
      key={patient.ID}
      className='tarjet-client'
      onClick={() => handlePatientClick(patient)}
    >
      <Avatar>{patient.nombre.charAt(0)}</Avatar>
      <div className='info-text-client'>
        <p>{`${patient.nombre} ${patient.apeMaterno} ${patient.apePaterno}`}</p>
      </div>
    </button>
  ))}
</div>
          </section>
        </div>
      </body>
    </>
  );
}

export default Inicio;
