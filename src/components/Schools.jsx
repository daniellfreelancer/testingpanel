import { FaSchool } from 'react-icons/fa';

function Schools({ userSchools }) {
  return (
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg lg:w-[49.5%] md:w-full  border p-4'>
      <div className='flex flex-col w-full pb-2 gap-2'>
        <p className='text-2xl font-bold'>Escuelas:</p>
        {userSchools ? (
          <ul>
            {userSchools.map((item, _id) => {
              return (
                <li
                  key={_id}
                  className='p-2 m-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center cursor-pointer'
                >
                  <div className='bg-blue-200 rounded-lg p-3'>
                    <FaSchool className='text-purple-800' />
                  </div>
                  <div className='pl-4 w-full flex items-center justify-between gap-5'>
                    <p className='text-gray-800 font-bold'>{item.name}</p>
                    <p className='text-gray-400 text-sm'>Tel: +56 {item.phone}</p>
                    <p className='text-gray-400 text-sm'>Rut: {item.rut}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export default Schools;
