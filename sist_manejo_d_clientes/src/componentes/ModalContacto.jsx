import React from 'react';

function ModalContacto({ cliente, onClose }) {
  
  const abrirGmail = () => {
    const urlGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${cliente.email}`;
    window.open(urlGmail, '_blank');
  };

  const abrirWhatsApp = () => {
    const telefono = cliente.phone || "00000000";
    const numeroLimpio = telefono.replace(/\D/g, ''); 
    const mensaje = encodeURIComponent(`Hola ${cliente.name}, te contacto desde mi App de clientes.`);
    const urlWhatsApp = `https://wa.me/${numeroLimpio}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div style={{ position: 'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(12, 12, 12, 0.14)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:1000 }}>
      <div style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '300px', position:'relative' }}>
        
        <button onClick={onClose} style={{cursor:'pointer', position: 'absolute', top: '5px', right: '10px', border: 'none', background: 'none' }}>✖</button>
        <h2>Contactar a {cliente.name}</h2>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={abrirGmail} style={{ width: '45%', padding: '15px', backgroundColor: '#e20000ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Via mail
            </button>

            <button onClick={abrirWhatsApp} style={{ width: '45%', padding: '15px', backgroundColor: '#40e200ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Via teléfono
            </button>
        </div>
      </div>
    </div>
  );
}

export default ModalContacto;