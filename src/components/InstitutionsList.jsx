import React from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineEye} from 'react-icons/ai'
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
            <li key={_id} className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex gap-1 items-center cursor-pointer' aria-label={user.name} title={user.name}>
              <p className=' text-gray-600 lg:text-left md:text-start w-[25%]'>{`${user.name}`}</p>
              <p className='text-gray-600 w-[15%]'>{formatRut(user.rut)}</p>
              <p className='text-gray-600 w-[30%]'>{user.email}</p>
              <p className='text-gray-600 w-[20%]'>+56 {user.phone}</p>
                <Link to={`/institutions/${user._id}`} className='flex items-center md:w-12 lg:w-[10%] justify-end'>
                <AiOutlineEye size={20} className='text-indigo-400' aria-label="Ver mas" title="Ver mas" />
                </Link>
            </li>
          ))}
        </ul>
      );


}
