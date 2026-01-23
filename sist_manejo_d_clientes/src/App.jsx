import React, { useState } from 'react';
import './App.css';
import BaseDeDatos from './datos/Usuarios.json'; 
import Buscador from './componentes/Buscador';
import ClienteCard from './componentes/ClienteCard';
import ModalFormulario from './componentes/ModalFormulario';
import ModalContacto from './componentes/ModalContacto';
import ModalMakina from './componentes/ModalMakina';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [buscando, setBuscando] = useState("");
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarMakina, setMostrarMakina] = useState(false);
  const [clienteAContactar, setClienteAContactar] = useState(null); // null o el objeto cliente


const login = (e) =>{
    e.preventDefault();
    const datos= new FormData(e.target);
    const user=datos.get("usuario_input");
    const pass=datos.get("password_input");
    const encontrado=BaseDeDatos.find(usuario=>usuario.username==user && usuario.password==pass)
    if(encontrado){
      setUsuarioLogueado(encontrado);
      const clientesGuardados = localStorage.getItem(`clientes_${encontrado.username}`);
      if (clientesGuardados){
        setClientes(JSON.parse(clientesGuardados));
         }
         else {
        // Si es la primera vez que entra, usa los del JSON original
        setClientes(encontrado.misClientes);
      }}
    else{
        alert("⛔ usuario o contraseña incorrectas");
      }
};



const desloguear= ()=>{
  setUsuarioLogueado(null);
  setClientes([])
}

  
  const guardarNuevoCliente = (e) => {
    e.preventDefault(); 
    const datos = new FormData(e.target);
    const nuevoCliente = {
      name: datos.get('nombre_input'),  
      email: datos.get('email_input'), 
      company: { name: datos.get('compania_input') },
      website: datos.get('web_input'),
      id: Date.now() 
    };
    const nuevaListaDeClientes = [...clientes, nuevoCliente];
    setClientes(nuevaListaDeClientes);
    localStorage.setItem(`clientes_${usuarioLogueado.username}`, JSON.stringify(nuevaListaDeClientes));
    setMostrarFormulario(false); 
  };

  const eliminarCliente = (id) => {
    const listaFiltrada = clientes.filter(c => c.id !== id);
    setClientes(listaFiltrada);
    localStorage.setItem(`clientes_${usuarioLogueado.username}`, JSON.stringify(listaFiltrada));
  };

  if (!usuarioLogueado)  {

    return (
        <div style={{ position: 'fixed', top: 0, left: 0,right: 0, bottom: 0, display: 'flex', justifyContent: 'center',  alignItems: 'center', backgroundColor: '#fbfbfb' }}>
           
          <form onSubmit={login} className="form">
            <p class="heading">Login</p>
            <input  class="input" name="usuario_input" placeholder="Username" type="text"/>
            <input class="input" name="password_input" placeholder="Password" type="password"/> 
            <button class="btn">Submit</button>
         </form>
    
        </div>
      );
  }


  return (
<div style={{ padding: '0px', fontFamily: 'Arial', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      
    <header>
      <div style={{ display: 'flex', justifyContent: 'flex-end',gap:'30px', alignItems: 'center', marginBottom: '20px' }}>
         <button 
            style={{ width: '10px', height: '10px', backgroundColor: '#d5d5d5',  borderRadius: '5px', cursor: 'pointer' }}
            onClick={() => setMostrarMakina(true)}
         ></button>

         <h3 style={{marginRight:'47em'}}> {usuarioLogueado.nombreCompleto}</h3>
         
         <button onClick={desloguear} style={{ width: '10em', padding: '10px', background: '#666', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
             Cerrar Sesión
         </button>

        <button 
            style={{ width: '10em',marginRight:'9px', padding: '10px', backgroundColor: '#171ad3ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} 
            onClick={() => setMostrarFormulario(true)}
        >
            Crear cliente
        </button>

      </div>
</header>
    <div style={{display:'flex', justifyContent:'center', alignItems: 'center'}}> 
       <Buscador onChange={(e) => setBuscando(e.target.value)} />
     </div>
 
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop:'15px' }}>
        {clientes
          .filter(cliente => !buscando || cliente.name.toLowerCase().includes(buscando.toLowerCase()))
          .map((cliente) => (
            <ClienteCard 
                key={cliente.id} 
                cliente={cliente} 
                onContactar={setClienteAContactar} // Pasamos la función que abre el modal
                onEliminar={eliminarCliente}      // Pasamos la función que elimina
            />
          ))
        }
      </div>

      
      {mostrarMakina && (
        <ModalMakina onClose={() => setMostrarMakina(false)} />
      )}

      {mostrarFormulario && (
        <ModalFormulario 
            onClose={() => setMostrarFormulario(false)} 
            onGuardar={guardarNuevoCliente} 
        />
      )}

      {clienteAContactar && (
        <ModalContacto 
            cliente={clienteAContactar} 
            onClose={() => setClienteAContactar(null)} 
        />
      )}

         <footer className="footer">
      <div className="footer-container">
        
        {/* Sección: Sobre mí */}
        <div className="footer-about">
          <h3 className="footer-title">
            Lautaro Scanio
          </h3>
          <p className="footer-description">
            Programador en pleno desarrollo de cortísima edad. 
            Apasionado por crear soluciones y aprender cada día.
          </p>
        </div>

        {/* Sección: Redes Sociales - Espacio para tus botones */}
        <div className="footer-social">
          <div className="footer-social-buttons">
              <div class="light-button">
                <a href="https://github.com/lautyscanio" target='_blank'>
                <button class="bt ">
                  <div class="light-holder">
                    <div class="dot"></div>
                    <div class="light"></div>
                  </div>
                  <div class="button-holder">
                    <svg viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      ></path>
                    </svg>
                    <p>GitHub</p>
                  </div>
                </button>
                </a>
              </div>

          </div>
        </div>

        {/* Sección: Frase */}
        <div className="footer-quote">
          <p className="footer-quote-text">
            "El código es poesía en movimiento"
          </p>
          <p className="footer-copyright">
            © 2025 Lautaro Scanio
          </p>
        </div>

      </div>

      {/* Línea divisoria */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          Hecho con ❤️ y mucho ☕ | Seguí aprendiendo, nunca pares
        </p>
      </div>
    </footer>
    </div>

  );
}

export default App;