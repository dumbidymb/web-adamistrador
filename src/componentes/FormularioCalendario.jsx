import React, { useState } from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../css/Alta.css'

const FormularioCalendario = () => {
  return (
    <>
    
    <div className='cont-form'>
    <input placeholder='Nombre completo'>
    
    </input>
    <input placeholder='Apellido paterno'>
    
    </input>
    <input placeholder='Apellido materno'>
    
    </input>
    </div>
    <div className='cont-form'>
    <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker']}>
          <DatePicker  className='calendario'
              label="Fecha de nacimiento" 
      
            />
          </DemoContainer>
        </LocalizationProvider>
    <input placeholder='Ciudad'>
    
    </input>
    <input placeholder='Direccion'>
    
    </input>
    </div>
    <div className='cont-form'>
    <input placeholder='Telefono celular'>
    
    </input>
    
    <input placeholder='Telefono Fijo'>
    
    </input>
    </div>
    <div className='cont-form'>
    
    </div>
   
    </>
  )
}

export default FormularioCalendario