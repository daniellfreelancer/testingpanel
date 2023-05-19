import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineDelete, AiOutlineSchedule} from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { reload } from '../features/reloadSlice';
import Modaleditplanification from './modal/Modaleditplanification';
import Modalviewplaning from './modal/Modalviewplaning';
import { useDeletePlanificationMutation } from '../features/plannerAPI';
export default function PlanificationInfo({ userPlanner }) {
    const sortedPlanner = [...userPlanner].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
  
    const totalPages = Math.ceil(sortedPlanner.length / itemsPerPage);
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
          <p className='px-4 py-2 text-2xl font-bold'>Planificación:</p>
          {sortedPlanner.length > 0 ? (
            <>
              <ul>
                {sortedPlanner.slice(startIndex, endIndex).map((item, _id) => (
                  <PlanificationItem
                    key={_id}
                    startDate={item.startDate}
                    endDate={item.endDate}
                    duration={item.duration}
                    schoolBlock={item.schoolBlock}
                    content={item.content}
                    evaluationType={item.evaluationType}
                    idPlanner={item._id}
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
            <p className='text-gray-700 pl-4'>No hay planificaciones asignadas</p>
          )}
           
        </div>
      );
}



function PlanificationItem({ startDate, endDate, duration, schoolBlock, content, evaluationType, idPlanner }) {

    const dispatch = useDispatch();
    const { id } = useParams()

    const [deleteSelectedPlanification] = useDeletePlanificationMutation()

    async function requestDeletePlanification(idPlanificationForDelete, idClassroomForDelete) {
       await axios.delete(`https://whale-app-qsx89.ondigitalocean.app/planing/delete-planification/${idPlanificationForDelete}/classroom/${idClassroomForDelete}`).then((response) => {
            if (response.data) {
                dispatch(reload())
                Swal.fire(response.data.message, '', 'success')
            }
        }).catch((error) => {
            console.log(error)
        })

    }

    async function requestDeletePlanificationByquery(planificationID, idClassroom ){
      let planificationInfo = {
        idPlanification: planificationID,
        idClassroom: idClassroom
      }
      try {
        let res = await deleteSelectedPlanification(planificationInfo)
        if (res.data){
          dispatch(reload())
          Swal.fire(res.data.message, '', 'success')
        }

      } catch (error) {
        console.log(error)
      }

    }


    async function handleDelete(planificationID, idClassroom) {



        Swal.fire({
            title: '¿Deseas eliminar la planificacion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
                // requestDeletePlanification(planificationID, id)
                requestDeletePlanificationByquery(planificationID, idClassroom )

            } else if (result.isDenied) {
                Swal.fire('No se ha eliminado la planificación', '', 'info')
                dispatch(reload())
            }
        })
    }


    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
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
            <div className='flex items-center w-full'>
                <div className='flex items-center gap-2 lg:w-[14rem]'>
                    <AiOutlineSchedule size={20} />
                    {
                        endDate !== null && endDate > startDate ? (
                            <p className='text-gray-700 w-full text-justify'>Desde: {formatDate(startDate)} <br /> Hasta: {formatDate(endDate)}</p>
                        ) : (
                            <p className='text-gray-700 w-full text-justify  '>Fecha: {formatDate(startDate)}</p>
                        )
                    }
                </div>
                {/* <p className='text-gray-700 pl-4 w-[20%]'>Inicio: {getLocalTimeFromUTC(startDate)}</p> */}
                <p className='text-gray-700 pl-4 w-[20%]'>Duración: {duration !== 0 ? `${duration} minutos `  : `${schoolBlock} ${schoolBlock !== 1 ? 'bloques' : 'bloque' }  `}</p>
                <p className='text-gray-700 pl-4 w-[30%]'>Contenido: {content}</p>
                <p className='text-gray-700 pl-4 w-[20%]'>Evaluación: {evaluationType}</p>
                <div className='flex justify-center w-[10%] gap-1'>
                    
                   <Modalviewplaning idPlanner={idPlanner} />
                    <Modaleditplanification idPlanner={idPlanner}  />
                    <AiOutlineDelete onClick={() => handleDelete(idPlanner, id)} size={20} className='text-gray-400 cursor-pointer hover:text-red-500' />
                    
                </div>
            </div>
        </li>
    );
}
