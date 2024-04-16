import * as React from 'react';
import Alert from '@mui/material/Alert';


import Button from '@mui/material/Button';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import '../css/Alta.css';
import '../css/UsuarioFormulario.css';
import { useState } from 'react';


const PdfDocument = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      padding: 10,
    },
    section: {
      margin: 10,
      padding: 10,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 5,
      border: '1px solid #ccc',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      marginBottom: 5,
    },
    label: {
      fontWeight: 'bold',
      marginRight: 5,
    },
    value: {},
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Información de Usuario</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nombre completo:</Text>
            <Text style={styles.value}>{data.nombre} {data.apePaterno} {data.apeMaterno}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usuario:</Text>
            <Text style={styles.value}>{data.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Contraseña:</Text>
            <Text style={styles.value}>{data.password}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{data.celular}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono fijo:</Text>
            <Text style={styles.value}>{data.telFijo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ciudad:</Text>
            <Text style={styles.value}>{data.ciudad}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const HorizontalLinearStepper = () => {
  const [data, setData] = useState({
    nombre: '',
    apePaterno: '',
    apeMaterno: '',
    fecha_nacimiento: '',
    ciudad: '',
    direccion: '',
    celular: '',
    telFijo: '',
    username: '',
    password: '',
    email: '', 
  });
  const [showDownloadButton, setShowDownloadButton] = useState(false); 

  const [alertType, setAlertType] = useState('success');
  const [showAlert, setShowAlert] = useState(false); 

  const handleSubmit = () => {

    fetch('http://localhost:3000/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: data.email, 
      }),
    })
    .then((response) => response.json())
    .then((userData) => {
      console.log('Respuesta del servidor (usuarios):', userData);
      const userId = userData.userID;

      fetch('http://localhost:3000/api/pacientes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: data.nombre,
          apeMaterno: data.apeMaterno,
          apePaterno: data.apePaterno,
          fecha_nacimiento: data.fecha_nacimiento,
          ciudad: data.ciudad,
          direccion: data.direccion,
          celular: data.celular,
          telFijo: data.telFijo,
          userId: userId, 
        }),
      })
      .then(response => response.json())
      .then(patientData => {
        console.log('Respuesta del servidor (pacientes):', patientData);
        setShowDownloadButton(true);
        setAlertType('success'); 
        setShowAlert(true); 
        setTimeout(() => {
          setShowAlert(false); 
        }, 3000);
      })
      .catch(error => {
        console.error('Error al enviar los datos al servidor (pacientes):', error);
      });
    })
    .catch((error) => {
      console.error('Error al enviar los datos al servidor (usuarios):', error);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className='cont-form'>
        <input placeholder='Nombre completo' name="nombre" value={data.nombre} onChange={handleChange} />
        <input placeholder='Apellido paterno' name="apePaterno" value={data.apePaterno} onChange={handleChange} />
        <input placeholder='Apellido materno' name="apeMaterno" value={data.apeMaterno} onChange={handleChange} />
      </div>
      <div className='cont-form'>
        <input type='date' name="fecha_nacimiento" value={data.fecha_nacimiento} onChange={handleChange} />
        <input placeholder='Ciudad' name="ciudad" value={data.ciudad} onChange={handleChange} />
        <input placeholder='Direccion' name="direccion" value={data.direccion} onChange={handleChange} />
      </div>
      <div className='cont-form'>
        <input placeholder='Telefono celular' name="celular" value={data.celular} onChange={handleChange} />
        <input placeholder='Telefono Fijo' name="telFijo" value={data.telFijo} onChange={handleChange} />
      </div>
      <div className='cont-form'>
        <label>Usuario recomendado </label>
        <input placeholder='Usuario' name="username" value={data.username} onChange={handleChange} />
        <label>Contraseña recomendada </label>
        <input type='password' placeholder='Contraseña' name="password" value={data.password} onChange={handleChange} />
      </div>
      <div className='cont-form'>
        <input  placeholder='Correo' type='email' name='email'  value={data.email} onChange={handleChange}  />
        
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Enviar
        </Button>
       
        {showDownloadButton && (
          <PDFDownloadLink document={<PdfDocument data={data} />}  fileName={`${patient.nombre}_${patient.apeMaterno}_${patient.apePaterno}_Info.pdf`}>
            {({ blob, url, loading, error }) =>
              loading ? 'Generando PDF...' : 'Descargar información'
            }
          </PDFDownloadLink>
        )}
      </div>
     
      {showAlert && (
        <div className='alerta'>
          <Alert severity={alertType}>
            {alertType === 'success' ? 'Información enviada con éxito.' : 'Por favor, completa todos los campos.'}
          </Alert>
        </div>
      )}
   
    </>
  );
};

export default HorizontalLinearStepper;
