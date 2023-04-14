import { FaChalkboardTeacher } from 'react-icons/fa';

function Teachers({ userTeachersData }) {
  return (
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg w-full border p-4'>
      <div className='flex flex-col w-full pb-2 gap-2'>
        <h2 className='text-2xl font-bold'>Profesores:</h2>
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
              <p className='text-gray-600 lg:w-[20%]'>Rut: {user.rut}</p>
              <p
                className={`bg-${
                  user.role === 'SUPF' ? 'green' : 'red'
                }-200 p-2 rounded-lg w-[9rem] text-${
                  user.role === 'SUPF' ? 'green' : 'red'
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
      </div>
    </div>
  );
}

export default Teachers;
