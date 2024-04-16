import React, { useState } from 'react';
import styled from 'styled-components';
import '../css/Login.css'

// Estilos para el botón

// Estilos para la ventana modal
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5); /* Fondo con efecto de desenfoque */
  backdrop-filter: blur(5px); /* Efecto de desenfoque */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 60vh;
  height: 60vh;
  border-radius: 10px;

  font-family: "Major Mono Display", monospace;
  font-weight: 400;
  font-style: normal; 
  display: flex;
  flex-direction: column;
`;

const CustomModal = ({ onClose }) => {
  return (
    <ModalWrapper onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
      <header>
        Registrate
      </header>
      <form className="login-form">
        <div className="input-group">
     
          <input type="text" id="username" name="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="input-group">
        
          <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" />
        </div>
        <div className="input-group">
        

      </div>
      
        <button className='button-login' type="submit">Ingresar</button>
      </form>
      </ModalContent>
    </ModalWrapper>
  );
};

const MyComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className='registrate' onClick={handleButtonClick}>Registrate</button>
      {modalOpen && <CustomModal onClose={handleCloseModal} />}
    </>
  );
};

export default MyComponent;
