import { FaChalkboardTeacher } from 'react-icons/fa';

function Teachers({ userTeachersData }) {
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
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4'>
      <div className='flex flex-col w-full pb-2 gap-2'>
        <h2 className='text-2xl font-bold'>Profesores:</h2>
        {
          userTeachersData.length > 0 ? (
            <ul>
            {userTeachersData?.map((user, index) => (
              <li
                key={index}
                className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex justify-between items-center cursor-pointer'
              >
                <div className='flex items-center lg:w-[20%]'>
                  <div className='bg-purple-100 p-3 rounded-lg'>
                    <FaChalkboardTeacher className='text-purple-800' />
                  </div>
                  <p className='pl-4'>{`${user.name} ${user.lastName}`}</p>
                </div>
                <p className='text-gray-600 lg:w-[40%]'>
                  Email: {user.email}
                </p>
                <p className='text-gray-600 lg:w-[20%]'>Rut: {formatRut(user.rut)}</p>
                <p
                  className={`bg-${
                    user.role === 'SUPF' ? 'green' : 'yellow'
                  }-300 p-2 rounded-lg w-[9rem] text-${
                    user.role === 'SUPF' ? 'green' : 'yellow'
                  }-900 text-start`}
                >
                  {user.role === 'SUPF'
                    ? 'Profesor Titular'
                    : user.role === 'SUPS'
                    ? 'Profesor Suplente'
                    : 'Profesor'}
                </p>
              </li>
            ))}
          </ul>
          ) : (
            <p className='text-gray-600 lg:w-[40%]'>No tiene Profesores asignados</p>
          )
        }

      </div>
    </div>
  );
}

export default Teachers;
