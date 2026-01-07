import React, { useState } from 'react';

function App() {
  const [cuenta, setCuenta] = useState(0);

  return (

    <body>
      
    <div style={{ textAlign: 'center', marginTop: '3em', marginLeft:'20em',fontFamily: 'Arial' }}>
      <h1>Codiguito boludo para contar clicks   </h1>
      <h2 >Contador: {cuenta}</h2>
      
      <button   
        onClick={() => setCuenta(cuenta + 1)} 
        style={{ padding: '15px', fontSize: '20px', cursor: 'pointer', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '8px' }}
      >
        Sumar +1
      </button>

      <button
        onClick={()=> setCuenta(cuenta*0)}
        style={{padding:'15px', fontSize:'20px', cursor:'pointer',backgroundColor:'red', marginLeft:'1em' ,color:'white',border:'none', borderRadius:'8px'}}
        >
          Resetear
      </button>

    </div>
        </body>

  );
}

export default App;