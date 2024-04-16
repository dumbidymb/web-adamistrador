import React from 'react';
import Stack from '@mui/material/Stack';
import BasicSpeedDial from './Slidebutton';
import { Avatar, Button } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const PdfDocument = ({ patient }) => {
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
            <Text style={styles.value}>{patient.nombre} {patient.apePaterno} {patient.apeMaterno}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Celular:</Text>
            <Text style={styles.value}>{patient.celular}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Teléfono fijo:</Text>
            <Text style={styles.value}>{patient.telFijo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ciudad:</Text>
            <Text style={styles.value}>{patient.ciudad}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const Taarget_of_client = ({ patient={selectedPatient}, onDeletePatient }) => {

  if (!patient) {
    return (
      <div className='cont-info-clients'>
        <div>No se ha seleccionado ningún paciente</div>
      </div>
    );
  }

  return (
    <div className='cont-info-clients'>
      <div className='cont-first-info'>
        <div className='cont-frist-first'>
          <Stack>
            <Avatar sx={{ width: 140, height: 140, fontSize: 56 }}>
              {patient.nombre.charAt(0)}
            </Avatar>
          </Stack>
        </div>
        <div className='cont-frist-second'>
          <h1>{`${patient.nombre} ${patient.apeMaterno} ${patient.apePaterno}`}</h1>
          <ul>
            <li>Ciudad: {patient.ciudad}</li>
            <li>Celular: {patient.celular}</li>
            <li>Teléfono fijo: {patient.telFijo}</li>
            <li>Dirección: {patient.direccion}</li>
            <li>Dirección: {patient.id_user}</li>
          </ul>
        </div>
      </div>
      <div className='cont-second-info'>
        <PDFDownloadLink document={<PdfDocument patient={patient} />}  fileName={`${patient.nombre}_${patient.apeMaterno}_${patient.apePaterno}_Info.pdf`}>
          {({ blob, url, loading, error }) =>
            loading ? 'Generando PDF...' : <Button>Descargar información</Button>
          }
        </PDFDownloadLink>
        <BasicSpeedDial onDeletePatient={onDeletePatient} />
      </div>
    </div>
  );
};

export default Taarget_of_client;
