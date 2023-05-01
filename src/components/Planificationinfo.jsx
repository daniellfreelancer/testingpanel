import axios from 'axios';
import React from 'react'
import { AiOutlineDelete, AiOutlineFilePpt, AiOutlineEye } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { reload } from '../features/reloadSlice';
import Modaleditplaning from './modal/Modaleditplaning';
import Modaleditplanification from './modal/Modaleditplanification';
export default function PlanificationInfo({ userPlanner }) {
    const sortedPlanner = [...userPlanner].sort((a, b) => new Date(a.date) - new Date(b.date));


    return (
        <div className='w-full md:col-span-1 relative lg:h-[70vh] h-[40vh] m-auto border rounded-lg bg-white overflow-scroll'>
            <p className='p-4 text-2xl font-bold'>Planificación:</p>
            {
                sortedPlanner.length > 0 ? (
                    <ul>
                        {sortedPlanner?.map((item, _id) => (
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
                ) : (
                    <p className='text-gray-700 pl-4'>No tiene planificaciones asignadas</p>
                )
            }
        </div>
    );
}



function PlanificationItem({ startDate, endDate, duration, schoolBlock, content, evaluationType, idPlanner }) {

    const dispatch = useDispatch();
    const { id } = useParams()

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


    async function handleDelete(planificationID) {

        Swal.fire({
            title: '¿Deseas eliminar la planificacion?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Eliminar',
            denyButtonText: `No`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
                requestDeletePlanification(planificationID, id)
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

    function getLocalTimeFromUTC(utcDateString) {
        const utcDate = new Date(utcDateString);
        const localTime = utcDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
        return localTime;
      }

    return (
        <li className='bg-gray-50 hover:bg-gray-100 rounded-lg m-3 p-2 flex justify-between items-center cursor-pointer text-start'>
            <div className='flex items-center w-full'>
                <div className='flex items-center gap-2 lg:w-[30%]'>
                    <AiOutlineFilePpt size={20} />
                    {
                        endDate !== null ? (
                            <p className='text-gray-700'>Desde: {formatDate(startDate)} <br/> Hasta: {formatDate(endDate)}</p>

                        ) : (
                            <p className='text-gray-700'>Fecha: {formatDate(startDate)}</p>
                        )
                    }
                    
                </div>
                <p className='text-gray-700 pl-4 w-[20%]'>Inicio: {getLocalTimeFromUTC(startDate)}</p>
                <p className='text-gray-700 pl-4 w-[20%]'>Duración: {duration !== 0 ? `${duration} minutos `  : `${schoolBlock} bloques `}</p>
                <p className='text-gray-700 pl-4 w-[30%]'>Contenido: {content}</p>
                <p className='text-gray-700 pl-4 w-[20%]'>Evaluación: {evaluationType}</p>
                <div className='flex justify-end w-[10%] gap-1'>
                    <AiOutlineEye size={20} className='text-gray-400 cursor-pointer hover:text-blue-500 mr-2' />
                    <AiOutlineDelete onClick={() => handleDelete(idPlanner)} size={20} className='text-gray-400 cursor-pointer hover:text-red-500' />
                    <Modaleditplanification idPlanner={idPlanner}  />
                </div>
            </div>
        </li>
    );
}
