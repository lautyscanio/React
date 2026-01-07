import React, { useState, useEffect } from 'react';

function App() {
  const [clientes, setClientes] = useState([]);
  const [buscando,setBuscando]=useState("");
  const [cargando, setCargando] = useState(true);
  const [MostrarFormulario, setFormulario] = useState(false);
  const [MostrarMakina, setMakina] = useState(false);

  



  // useEffect: Se ejecuta UNA VEZ cuando la página nace
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) // Convertimos la respuesta a JSON
      .then(datos => {
        setClientes(datos); // Guardamos los datos en el estado
        setCargando(false); // Avisamos que ya terminó de cargar
      });
  }, []); // Los corchetes vacíos [] significan "solo hazlo al principio"


const enviarFormulario = (e) => {
    e.preventDefault(); // Evita que la página se recargue (fundamental en React)
    
    const datos = new FormData(e.target);
    const nuevoCliente = {
      name: datos.get('nombre_input'),  
      email: datos.get('email_input'), 
      company: {name:datos.get('compania_input')},
      website: datos.get('web_input'),
      id: Date.now() 
    };

    setClientes([...clientes, nuevoCliente]);
    setFormulario(false); 
  };


  if (cargando) {
    return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>⏳ Cargando datos del servidor...</h1>;
  }

  // Si ya cargo, mostramos la interfaz real
  return (
    
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>

        <button style={{ width: '1em',
              padding: '10px',
              backgroundColor: '#ffffffff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'}}
              onClick={()=>setMakina(!MostrarMakina)}>

              </button>

            {MostrarMakina && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px', position:'relative' }}>
            
            <button onClick={() => setMakina(false)} style={{cursor:'pointer', position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'none' }}>
              ✖
              </button>
            <h2> si estas leyendo esto, sos un makina, estudia y segui aprendiendo no seas pajero</h2>
            <h3>atte:sca</h3>

           

          </div>
        </div>
      )}

      <button style={{
               width: '10em',
              padding: '10px',
              backgroundColor: '#171ad3ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px',
              marginLeft:'77em'
        }} onClick={()=>setFormulario(!MostrarFormulario)}
        >
          crear cliente
        </button>

      

       {MostrarFormulario && (
        <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px', position:'relative' }}>
            
            <button onClick={() => setFormulario(false)} style={{cursor:'pointer', position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'none' }}>
              ✖
              </button>
            <h2>Nuevo Cliente</h2>

            <form onSubmit={enviarFormulario} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <input name="nombre_input" type="text" placeholder="Nombre" required style={{ padding: '10px' }} />
              <input name="email_input" type="email" placeholder="Email" required style={{ padding: '10px' }} />
              <input name="compania_input" type="text" placeholder="Compania" required style={{ padding: '10px' }} />
              <input name="web_input" type="text" placeholder="Website" required style={{ padding: '10px' }} />
              
              <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Guardar
              </button>
            </form>

          </div>
        </div>
      )}

      <h1 style={{ textAlign: 'center', color: '#333' }}>📂 Cartera de Clientes ({clientes.length})</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder='Buscar cliente...'
          style={{ padding: '10px', width: '300px', fontSize: '16px', border:'none', borderRadius:'10px', backgroundColor:'#d4ceceff', color:'black' }}
          onChange={(e) => setBuscando(e.target.value)}
        />  
        
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        
        
       {clientes  
          .filter((cliente) => {
             if (buscando === "") return true;
             return cliente.name.toLowerCase().includes(buscando.toLowerCase());
          })
          .map((cliente) => ( 
          <div key={cliente.id} style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{cliente.name}</h3>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Empresa:</strong> {cliente.company.name}</p>
            <p><strong>Web:</strong> {cliente.website}</p>
            
            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }} onClick={() => alert(`Contactando a ${cliente.name}...`)}>
              Contactar Cliente
            </button>

            <button style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#e20000ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '10px'
            }} onClick={() => setClientes(clientes.filter(c => c.id !== cliente.id )) }>
              Eliminar cliente
            </button>
          
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;