  import { useState } from 'react';
  import * as React from 'react';
  import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import '../css/Alta.css'

  const EditarDatos = ({ patientId, onUpdatePatient, patient }) => {
    const [nombre, setNombre] = useState(patient ? patient.nombre : '');
    const [apeMaterno, setApeMaterno] = useState(patient ? patient.apeMaterno : '');
    const [apePaterno, setApePaterno] = useState(patient ? patient.apePaterno : '');
    const [fecha_nacimiento, setFecha_nacimiento] = useState(patient ? patient.fecha_nacimiento : '');
    const [ciudad, setCiudad] = useState(patient ? patient.ciudad : '');
    const [direccion, setDireccion] = useState(patient ? patient.direccion : '');
    const [celular, setCelular] = useState(patient ? patient.celular : '');
    const [telFijo, setTelFijo] = useState(patient ? patient.telFijo : '');

    const handleNombreChange = (e) => {
      setNombre(e.target.value);
    };

    const handleApeMaternoChange = (e) => {
      setApeMaterno(e.target.value);
    };

    const handleApePaternoChange = (e) => {
      setApePaterno(e.target.value);
    };
    // Otros manejadores de cambios para los demás campos
    const handleUpdate = () => {
      const updatedPatient = {
        ID: patientId,
        nombre,
        apeMaterno,
        apePaterno,
        fecha_nacimiento,
        ciudad,
        direccion,
        celular,
        telFijo,
      };
    
      fetch(`http://localhost:3000/api/pacientes/update`, {
        method: 'patch',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPatient),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar al paciente.');
          }

          console.log('Paciente actualizado exitosamente:', updatedPatient);

          onUpdatePatient(updatedPatient);
        })
        .catch(error => {
          console.error('Error al actualizar al paciente:', error);
        });
    };
    return (
  <>
  <div className='cont-form'>
          <input placeholder='Nombre completo' value={nombre} onChange={handleNombreChange}></input>
          <input placeholder='Apellido paterno' value={apePaterno} onChange={handleApePaternoChange}></input>
          <input placeholder='Apellido materno' value={apeMaterno} onChange={handleApeMaternoChange}></input>
        </div>
        <div className='cont-form'>
          <input type='date' value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)}></input>
          <input placeholder='Ciudad' value={ciudad} onChange={(e) => setCiudad(e.target.value)}></input>
          <input placeholder='Direccion' value={direccion} onChange={(e) => setDireccion(e.target.value)}></input>
        </div>
        <div className='cont-form'>
          <input type='number' placeholder='Telefono celular' value={celular} onChange={(e) => setCelular(e.target.value)}></input>
          <input type='number' placeholder='Telefono Fijo' value={telFijo} onChange={(e) => setTelFijo(e.target.value)}></input>
        </div>
        <div className='cont-form2'>
          <button onClick={handleUpdate}>Guardar cambios</button>
        </div>
    
      </>
    )
  }

  export default EditarDatos