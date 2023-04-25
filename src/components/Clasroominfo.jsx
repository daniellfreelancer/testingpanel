import React from 'react'
import {SiGoogleclassroom} from 'react-icons/si'

export default function Clasroominfo( {userClassroom} ) {
    return (
        <div className='bg-white rounded-lg w-full border p-4'>
            <div className='flex w-full pb-2 gap-2 items-center'>
            <div className='bg-blue-100 rounded-lg p-3'>
                        <SiGoogleclassroom className='text-purple-800' />
                      </div>
                <p className='text-2xl font-bold'>Grado: {`${userClassroom?.grade}° ${userClassroom?.level === 'basico' ? 'Básico' : 'Medio'}`} Sección: {userClassroom?.section}</p>
            </div>
        </div>
      )
}
