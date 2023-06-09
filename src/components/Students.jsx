
import {MdOutlineMeetingRoom, MdOutlineMailOutline} from 'react-icons/md'
import {TbWeight} from 'react-icons/tb'
import { GiBodyHeight} from 'react-icons/gi'
import {HiOutlineIdentification} from 'react-icons/hi'
import {BsTelephone} from 'react-icons/bs'
import studentIcon from '../assets/iconStudent.png'

export default function Students({ userStudents, title }) {
  return (
    <div className='w-full md:col-span-1 relative  m-auto border rounded-lg bg-white overflow-scroll'>
      <p className='p-4 text-2xl font-bold'>{title}:</p>
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
  // eslint-disable-next-line
  const { name, lastName, age, weight, size, rut, email, phone, imgUrl, classroom } = item;
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
    <li className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex items-center cursor-pointer gap-4 w-full justify-start'>
      <div className='flex items-center min-w-[10rem] gap-2'>
        <div className='shadow-md rounded-full w-12 h-12'>
          {/* <img src={`https://whale-app-qsx89.ondigitalocean.app/public/${imgUrl}`} alt='img' className='w-full h-full object-cover rounded-full' /> */}
          <img src={studentIcon} alt='img' className='w-full h-full object-cover rounded-full' />
        </div>
        <p className='text-gray-700'>{fullName}</p>
      </div>
      <p className='text-gray-400 text-sm  flex gap-1 items-center w-14 '>{age} años</p>
      <p className='text-gray-400 text-sm  flex gap-1 items-center w-16 '><TbWeight size={20} /> {weight} kg</p>
      <p className='text-gray-400 text-sm  flex gap-1 items-center w-26 '><GiBodyHeight size={20} />{size} cm</p>
      <p className='text-gray-400 text-sm flex gap-1 items-center w-18 lg:flex md:hidden '><HiOutlineIdentification size={20} /> {formatRut(rut)}</p>
      <p className='text-gray-400 text-sm flex gap-1 items-center min-w-[14rem] lg:flex md:hidden'><MdOutlineMailOutline size={20} />  {email}</p>
      <p className='text-gray-400 text-sm flex gap-1 items-center'><BsTelephone size={20} /> {phone}</p>

{
  classroom?.length > 0 ? (
    <div className='text-gray-400 flex gap-1 items-center '>
      
        
    <MdOutlineMeetingRoom size={20}/>
    <p>{ `${classroom[0].grade}° ${classroom[0].level === 'basico' ? 'Básico': 'Medio'} "${classroom[0].section}" ` } </p>
  </div>
 
  ) :
  (
    <p className='text-gray-400 ' >No tiene Salon asignado </p>
  )
}

    </li>
  );
}
