import React from 'react'
import {Link} from 'react-router-dom'
export default function InstitutionsList({ usersData }) {

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
  
    return (
        <ul>
          {usersData.map((user, _id) => (
            <li key={_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer'>
              <div className='flex items-center'>
                <p className=''>{`${user.name}`}</p>
              </div>
              <p className='text-gray-600 sm:text-left text-right'>{formatRut(user.rut)}</p>
              <p className='text-gray-600 sm:text-left text-right'>{user.email}</p>
              <div className='sm:flex hidden justify-between items-center'>
                <p>+56 {user.phone}</p>
                <Link to={`/institutions/${user._id}`}>
                  <div className='flex items-center gap-2 bg-white border-indigo-700 rounded hover:bg-indigo-200 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-indigo-700 border lg:max-w-full '>
                    <h3 className='text-indigo-500'>ver mas</h3>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      );


}
