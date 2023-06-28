import { FaSchool } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'

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
                  className='p-2 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center cursor-pointer'
                >
                  <div className='bg-blue-200 rounded-lg p-3'>
                    <FaSchool className='text-purple-800' />
                  </div>
                  <div className='pl-4 w-full flex items-center justify-between gap-5'>
                    <p className='text-gray-800 font-bold'>{item.name}</p>
                    <Link to={`/school/${item._id}`}>
                      {/* <div className='flex items-center gap-2 bg-white border-indigo-700 rounded hover:bg-indigo-200 transform duration-300 ease-in-out text-sm font-medium px-3 py-1 text-indigo-700 border lg:max-w-full '>
                    <h3 className='text-indigo-500'>ver mas</h3> 
                   
                  </div>*/}
                      <AiOutlineEye size={20} className='text-indigo-500' aria-label="Ver mas"
                        title="Ver mas" />
                    </Link>


                    {/* <p className='text-gray-400 text-sm'>Tel: +56 {item.phone}</p>
                    <p className='text-gray-400 text-sm'>Rut: {item.rut}</p> */}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (<p className='text-gray-600'>No tiene escuelas asignados</p>)}
      </div>
    </div>
  );
}

export default Schools;
