import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { SiGoogleclassroom} from 'react-icons/si'
import {AiOutlineEye} from 'react-icons/ai'

export default function ClasshistoryList({ userClassHistory }) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    const totalPages = Math.ceil(userClassHistory.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    const handlePrevPageClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNextPageClick = () => {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
      }
    };

    return (
        <div className='w-full md:col-span-1 relative lg:h-[75vh] h-[45vh] m-auto border rounded-lg bg-white overflow-scroll'>
          <p className='px-4 py-2 text-2xl font-bold'>VMClass:</p>
          {userClassHistory.length > 0 ? (
            <>
              <ul>
                {userClassHistory.slice(startIndex, endIndex).map((item, _id) => (
                  <ClassHistoryItem
                    key={_id}
                    startClassTime={item.startClassTime}
                    duration={item.plannerClass.duration}
                    schoolBlock={item.plannerClass.schoolBlock}
                    content={item.plannerClass.content}
                    byTeacherName={item.byTeacher.name}
                    byTeacherLastName={item.byTeacher.lastName}
                    elapsedClassTime={item.elapsedClassTime}
                    idResume={item._id}
                  />
                ))}
              </ul>
              <div className='flex justify-center space-x-2 mt-4'>
                <button
                  onClick={handlePrevPageClick}
                  disabled={currentPage === 1}
                  className='px-2 py-1 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-indigo-500 transform duration-300 ease-in-out'
                >
                  Anterior
                </button>
                <button
                  onClick={handleNextPageClick}
                  disabled={currentPage === totalPages}
                  className='px-2 py-1 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-indigo-500 transform duration-300 ease-in-out'
                >
                  Siguiente
                </button>
              </div>
              <p className='text-center mt-2 text-gray-400'>
                Página {currentPage} de {totalPages}
              </p>
            </>
          ) : (
            <p className='text-gray-700 pl-4'>No hay historial VmClass</p>
          )}
           
        </div>
      );
}



function ClassHistoryItem({ startClassTime, duration, schoolBlock, content, byTeacherName, byTeacherLastName, elapsedClassTime, idResume   }) {

    const dispatch = useDispatch();
    const elapsedMinutes = Math.floor(elapsedClassTime / 60);
    const elapsedSeconds = elapsedClassTime - elapsedMinutes * 60;




    function formatDate(startClassTime) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(startClassTime).toLocaleDateString('es-ES', options);
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
 // eslint-disable-next-line
    function getLocalTimeFromUTC(utcDateString) {
        const utcDate = new Date(utcDateString);
        const localTime = utcDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
        return localTime;
      }

    return (
        <li className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex justify-between items-center cursor-pointer text-start'>
            <div className='flex items-center w-full justify-around'>
                <div className='flex items-center gap-2 lg:w-[14rem]'>
                    <SiGoogleclassroom size={20} className='text-gray-600' />
                    <p className='text-gray-700 w-full text-justify  '>Fecha: {formatDate(startClassTime)}</p>
                </div>
                {/* <p className='text-gray-700 pl-4 w-[20%]'>Inicio: {getLocalTimeFromUTC(startDate)}</p> */}
                <p className='text-gray-700 pl-4 w-[30%]'>Contenido: {content}</p>
                <p className='text-gray-700 pl-4 w-[20%]'>Por: {byTeacherName}, {byTeacherLastName}</p>
                <div className='text-gray-700 pl-4 flex gap-2'>
                <h2 className=''>Tiempo efectivo:</h2>
                     {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')} Minutos
                </div>
                <AiOutlineEye size={20} className='text-indigo-600' />
            </div>
        </li>
    );
}
