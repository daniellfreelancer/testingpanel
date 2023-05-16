import React from 'react'

export default function Topcards({classroom,teacher,students}) {
    return (
        <div className='grid lg:grid-cols-6 gap-4 p-4' >
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-2 rounded' >
                <div className='flex flex-col w-full p-2' >
                    <p className='text-2xl' >{`${classroom?.grade}° Sección: "${classroom?.section}" `}</p>
                    <p className='text-gray-600' >{ classroom?.level === 'basico' ? 'Básico' : 'Medio' }</p>
                </div>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border px-4 md:p-3 rounded items-center' >            
            <div className='flex flex-col w-full pb-2 ' >
                {
                    teacher?.name ? (
                        <>
                        <p className='text-2xl' >{`${teacher?.name} ${teacher?.lastName}`}</p>
                        <p className='text-gray-600'>Profesor</p>
                        </>
                    ) : (
                        <>
                        <p className='text-2xl pb-4 ' >No tiene profesor</p>
                        </>
                    )
                }
            </div>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded items-start' >            
            <div className='flex flex-col w-full ' >
                <p className='text-2xl  ' >Alumnos</p>
            </div>
            <p className='bg-green-200 rounded flex justify-center items-center p-2 w-10 h-10'>
                    <span className='text-green-700 text-lg'>{students}</span>
                </p>
            </div>
        </div>
    )
}
