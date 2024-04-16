
import '../css/Login.css'
import Logo from "../assets/logo.png"
import MyComponent from '../componentes/ModalExampleDinner'

const Login = () => {
  return (
    <body className='body-login'>
      <aside className='aside-azul'>
    <img src={Logo} alt="" />
      </aside>
      <section className='section-form'>
<div className='login'>
  <h1 >Bienvenido Administrador</h1>
  <form className="login-form">
        <div className="input-group">
     
          <input type="text" id="username" name="username" placeholder="Ingrese su usuario" />
        </div>
        <div className="input-group">
        
          <input type="password" id="password" name="password" placeholder="Ingrese su contraseña" />
        </div>
        <button className='button-login' type="submit">Ingresar</button>
      </form>
      <footer><MyComponent/></footer>
</div>
      </section>
    </body>
  )
}

export default Login