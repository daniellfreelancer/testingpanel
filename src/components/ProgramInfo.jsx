import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

export default function ProgramInfo({infoProgram}) {

    const [rutNumber, setRutNumber] = useState("")

    function formatRut(rut) {
      // Eliminar cualquier caracter que no sea un número ni la letra K
      const cleaned = rut.toString().replace(/[^0-9kK]/g, '');
    
      // Separar el número de la letra verificadora
      const number = cleaned.slice(0, -1);
      const verifier = cleaned.slice(-1).toUpperCase();
    
      // Dividir el número en los tres bloques correspondientes
      const block1 = number.slice(0, 2);
      const block2 = number.slice(2, 5);
      const block3 = number.slice(5);
    
      // Combinar los bloques en el formato deseado y agregar la letra verificadora
      return `${block1}.${block2}.${block3}-${verifier}`;
    }
  
    useEffect(() => {
      if (infoProgram && infoProgram.rut) {
        setRutNumber(formatRut(infoProgram.rut));
      }
    }, [infoProgram]);
  
  
   
  return (
    <div className='bg-white flex justify-between rounded-lg w-full border p-4'>
    <div className='flex flex-col w-full pb-2 gap-2'>
      <p className='text-2xl font-bold'>Datos del Programa:</p>
      <p className='text-gray-600'>Nombre: {infoProgram?.name}</p>
      <p className='text-gray-600'>Direccion: {infoProgram?.address}</p>
      <p className='text-gray-600'>Telefono: +56 {infoProgram?.phone}</p>
      <p className='text-gray-600'>Email: {infoProgram?.email}</p>
      <p className='text-gray-600'>Rut: {rutNumber}</p>
      {/* <p className='text-gray-600'>
        Administrador: {usersAdmin?.name + ' ' + usersAdmin?.lastName}
      </p> */}
    </div>
  </div>
  )
}
