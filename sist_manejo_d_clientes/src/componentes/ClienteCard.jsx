import React from 'react';

function ClienteCard({ cliente, onContactar, onEliminar }) {
  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '10px', padding: '20px', width: '300px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      
      <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>{cliente.name}</h3>
      <p><strong>Email:</strong> {cliente.email}</p>
      {/* Usamos el operador ?. para evitar errores si no hay company */}
      <p><strong>Empresa:</strong> {cliente.company?.name || "Sin empresa"}</p>
      <p><strong>Web:</strong> {cliente.website}</p>
      
      <button 
        style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}
        onClick={() => onContactar(cliente)}
      >
        Contactar Cliente
      </button>

      <button 
        style={{ width: '100%', padding: '10px', backgroundColor: '#e20000ff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }} 
        onClick={() => onEliminar(cliente.id)}
      >
        Eliminar cliente
      </button>
    </div>
  );
}

export default ClienteCard;