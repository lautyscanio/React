import React from 'react';

function ModalFormulario({ onClose, onGuardar }) {
  return (
    <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px', position:'relative' }}>
        
        <button onClick={onClose} style={{ cursor:'pointer', position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'none' }}>✖</button>
        <h2>Nuevo Cliente</h2>

        <form onSubmit={onGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
  );
}

export default ModalFormulario;