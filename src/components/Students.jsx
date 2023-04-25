import { SlUser, SlUserFemale } from 'react-icons/sl';

export default function Students({ userStudents }) {
  return (
    <div className='w-full md:col-span-1 relative lg:h-[70vh] h-[40vh] m-auto border rounded-lg bg-white overflow-scroll'>
      <p className='p-4 text-2xl font-bold'>Estudiantes:</p>
      {
        userStudents.length > 0 ? (
          <ul>
          {userStudents?.map((item, _id) => (
            <StudentItem key={_id} item={item} />
          ))}
        </ul>
        ) : (
          <p className='text-gray-700 pl-4'>No tiene estudiantes asignados</p>
        )
      }

    </div>
  );
}

function StudentItem({ item }) {
  
  const { name, lastName, age, weight, size, rut, email, phone, gender } = item;
  const fullName = `${lastName.charAt(0).toUpperCase() + lastName.slice(1)}, ${name.charAt(0).toUpperCase() + name.slice(1)}`;
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
    <li className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex justify-between items-center cursor-pointer text-start'>
      <div className='flex items-center lg:w-[25%]'>
        <div className='bg-purple-100 p-3 rounded-lg'>
          {gender === 'male' ? (
            <SlUser className='text-purple-800' />
          ) : (
            <SlUserFemale className='text-purple-800' />
          )}
        </div>
        <p className='text-gray-700 pl-4'>{fullName}</p>
      </div>
      <p className='text-gray-400 text-sm lg:w-[10%]'>Edad: {age}</p>
      <p className='text-gray-400 text-sm lg:w-[10%]'>Peso: {weight} kg</p>
      <p className='text-gray-400 text-sm lg:w-[15%]'>Estatura: {size} cm</p>
      <p className='text-gray-400 text-sm lg:w-[15%]'>Rut: {formatRut(rut)}</p>
      <p className='text-gray-400 text-sm lg:w-[20%]'>Email: {email}</p>
      <p className='text-gray-400 text-sm lg:w-[15%]'>Tel: +56 {phone}</p>
    </li>
  );
}
