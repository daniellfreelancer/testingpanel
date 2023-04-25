import React from 'react'
import {SiGoogleclassroom} from 'react-icons/si'
import {Link} from 'react-router-dom'

export default function Classroomlist({userClassroom}) {
    return (
        <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg lg:w-[100%] md:w-full  border p-4'>
          <div className='flex flex-col w-full pb-2 gap-2'>
            <p className='text-2xl font-bold'>Grados:</p>
            {userClassroom.length > 0 ? (
              <ul>
                {userClassroom.map((item, _id) => {
                  return (
                    <li
                      key={_id}
                      className='p-2 m-3 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center cursor-pointer'
                    >
                      <div className='bg-blue-100 rounded-lg p-3'>
                        <SiGoogleclassroom className='text-purple-800' />
                      </div>
                      <div className='pl-4 w-full flex items-center justify-between gap-5'>
                        <p className='text-gray-800 font-bold'> {`${item.grade}° ${item.level === 'basico' ? 'Básico' : 'Medio'}`}</p>
                        <p className='text-gray-800 '>Sección: {item.section}</p>
                        <Link to={`/classroom/${item._id}`}>
                      <div className='flex items-center gap-2 bg-white border-indigo-700 rounded hover:bg-indigo-200 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-indigo-700 border lg:max-w-full '>
                        <h3 className='text-indigo-500'>ver mas</h3>
                      </div>
                    </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (<p className='text-gray-700 '>No tiene grados asignados</p>)}
          </div>
        </div>
    )
}
