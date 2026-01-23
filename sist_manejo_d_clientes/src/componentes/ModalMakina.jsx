import React from 'react';

function ModalMakina({ onClose }) {
  return (
    <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.5)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
        <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px', position:'relative' }}>
        
        <button onClick={onClose} style={{cursor:'pointer', position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'none' }}>✖</button>
        
        <h2>Si estás leyendo esto, sos un makina, estudia y seguí aprendiendo, no seas pajero</h2>
        <h3>atte: sca</h3>

        </div>
    </div>
  );
}

export default ModalMakina;