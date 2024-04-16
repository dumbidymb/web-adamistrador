import React from 'react'
import '../css/UsuarioFormulario.css'

const UsuariosFormulario = () => {
  return (
    <>
    
    <div className='cont-form'>
      <label>Usuario recomendado </label>
<input placeholder='Usuario '>

</input>
<label>Contraseña recomendada </label>
<input type='password' placeholder='Contraseña'>

</input>

</div>
<div className='cont-form'>


<input placeholder='Correo electronico (OPCIONAL)'>

</input>
</div>


    </>
  )
}

export default UsuariosFormulario