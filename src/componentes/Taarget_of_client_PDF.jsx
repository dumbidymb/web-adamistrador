import React from 'react';
import { Page, Text, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
  },
});

const Taarget_of_client_PDF = ({ username, password }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Usuario y Contraseña</Text>
      <Text style={styles.content}>Nombre de usuario: {username}</Text>
      <Text style={styles.content}>Contraseña: {password}</Text>
    </Page>
  </Document>
);

export default Taarget_of_client_PDF;
