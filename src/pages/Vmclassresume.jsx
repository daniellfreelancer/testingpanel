import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { GiTeacher } from 'react-icons/gi'
import { BsPeopleFill, BsInfoCircle, BsClockHistory, BsCalendarDate } from 'react-icons/bs'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";
import Presentstudents from '../components/Presentstudents'
import Modalviewplaning from '../components/modal/Modalviewplaning'


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
);



export default function Vmclassresume() {

    const [classResume, setClassResume] = useState([])
    const [studentsResume, setStudentsResume] = useState([])
    const [attendance, setAttendance] = useState([]);
    const [noAttendance, setNoAttendance] = useState([])
    const [evaluationCriteria, setEvaluationCriteria] = useState([])
    const [plannerClass, setPlannerClass] = useState([])
    const { idresume } = useParams()
    const [elapsedTime, setelapsedTime] = useState()
    const [startClassTime, setStartClassTime] = useState("")
    const [endClassTime, setEndClassTime] = useState("")
    const elapsedMinutes = Math.floor(elapsedTime / 60);
    const elapsedSeconds = elapsedTime - elapsedMinutes * 60;

    const classifyStudentsByAttendance = (presentStudents) => {
        setAttendance([]);
        setNoAttendance([]);
        presentStudents?.forEach((student) => {
            if (student.attendance === "true") {
                setAttendance((prevAttendance) => [...prevAttendance, student]);
            } else if (student.attendance === "false") {
                setNoAttendance((prevNoAttendance) => [...prevNoAttendance, student]);
            }
        });
    };

    useEffect(() => {

        async function fetchData(id) {
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/vmclass/vmresume/${id}`)

            if (data) {
                setClassResume(data.response)
                setStudentsResume(data.response.presentStudents)
                setEvaluationCriteria(data.response.evaluationNotation)
                setelapsedTime(data.response.elapsedClassTime)
                setStartClassTime(data.response.startClassTime)
                setEndClassTime(data.response.endClassTime)
                setPlannerClass(data.response.plannerClass)
            }

        }

        fetchData(idresume)

    }, [idresume])


    useEffect(() => {
        classifyStudentsByAttendance(classResume.presentStudents)
    }, [classResume])

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    function getLocalTimeFromUTC(utcDateString) {
        const utcDate = new Date(utcDateString);
        const localTime = utcDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' , hour12: true });
        return localTime;
    }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
      
        const formattedDate = date.toLocaleDateString(undefined, options)
          .replace(/(^|\s)\S/g, (match) => match.toUpperCase());
        
        return formattedDate;
      }



    return (
        <>
            <main className='bg-gray-200 w-full min-h-[100vh]' >

                <div className='w-full m-auto p-4'  >
                    <div className='flex sm:flex sm:flex-wrap justify-between gap-4 w-full' >

                        <div className='rounded shadow-lg bg-white p-3 lg:w-[23.5%] sm:w-[48%] h-[6rem] items-center justify-evenly text-gray-600 flex gap-4'>
                            <div className='bg-indigo-100 rounded-full p-3'>
                                <GiTeacher className='text-indigo-700' size={20} />
                            </div>
                            <div className=' px-2 flex flex-col'>
                                <h4 className='text-xs '>Profesor:</h4>
                                <p className='font-bold text-xl text-2x1 text-gray-800 ' >{`${classResume.byTeacher?.name}, ${classResume.byTeacher?.lastName}`}</p>
                            </div>
                        </div>

                        <div className='rounded shadow-lg bg-white p-3 lg:w-[23.5%] sm:w-[48%]  h-[6rem] items-center justify-evenly text-gray-600 flex gap-4'>
                            <div className='bg-indigo-100 rounded-full p-3'>
                                <BsPeopleFill className='text-teal-700' size={20} />
                            </div>
                            <div className=' px-2 flex flex-col gap-1'>
                                <h4 className='text-xs '>Asistencia:</h4>
                                <div className='flex gap-2' >
                                    <span className='bg-green-200 font-light px-1 rounded text-green-600 text-sm' >Presentes:{attendance?.length} </span>
                                    <span className='bg-red-200 font-light px-1 rounded text-red-600 text-sm' >Ausentes: {noAttendance?.length}</span>
                                </div>

                            </div>
                        </div>

                        <div className='rounded shadow-lg bg-white p-3 lg:w-[23.5%] sm:w-[48%]  h-[6rem] items-center justify-evenly text-gray-600 flex gap-4'>
                            <div className='bg-indigo-100 rounded-full p-3'>
                                <BsCalendarDate className='text-indigo-700' size={20} />
                            </div>
                            <div className=' px-2 flex flex-col '>
                                <h4 className='text-xs '>Fecha:</h4>

                                        <p className='font-bold text-xl text-2x1 text-gray-800 ' >{formatDate(classResume?.createdAt)}</p>

                            </div>
                        </div>
                        <div className='rounded shadow-lg bg-white p-3 lg:w-[23.5%] sm:w-[48%]  h-[6rem] items-center justify-evenly text-gray-600 flex gap-4'>
                            <div className='bg-indigo-100 rounded-full p-3'>
                                <BsInfoCircle className='text-indigo-700' size={20} />
                            </div>
                            <div className=' px-2 flex flex-col '>
                                <h4 className='text-xs '>Observaciones:</h4>
                                {
                                    classResume?.observationsClass?.length > 0 ? (
                                        <ul>
                                            {
                                                classResume?.observationsClass.map((observation, index) => (
                                                    <li className='font-bold text-gray-800' key={index}>{observation}</li>
                                                ))
                                            }
                                        </ul>
                                    ) : (
                                        <p className='font-bold text-xl text-2x1 text-gray-800' >{`Sin observaciones`}</p>
                                    )
                                }

                            </div>
                        </div>

                    </div>

                    <div className='flex lg:justify-between sm:justify-around gap-4 w-full mt-4'>

                        <div className='lg:w-[49.3%] sm:w-[48%] min-h-[20rem] bg-white rounded shadow-lg p-4 ' >
                            <h2 className='font-bold text-xl text-2x1 text-gray-800  mb-2' >Criterio de evaluacion:</h2>
                            <div className=' h-full ' >
                                <ul className='flex flex-col gap-3  ' >
                                    {
                                        evaluationCriteria.map((item) => {
                                            const formattedValue = capitalizeFirstLetter(item.value);
                                            let strokeColor;

                                            switch (item.evaluationCriteria) {
                                              case "4":
                                                strokeColor = '#14B8A6';
                                                break;
                                              case "3":
                                                strokeColor = '#6366F1'; // Color naranja hexadecimal
                                                break;
                                              case "2":
                                                strokeColor = '#FFA500'; // Color amarillo hexadecimal
                                                break;
                                              case "1":
                                                strokeColor = '#FF0000'; // Color rojo hexadecimal
                                                break;
                                              default:
                                                strokeColor = '#14B8A6';
                                                break;
                                            }
                                            return (
                                                <li className='flex w-full justify-between items-center gap-4 p-2 border-b border-gray-100 text-sm font-thin ' key={item.id} > <p className='w-[70%] ' > {formattedValue} </p><span>
                                                    <CircularProgressbar className='rounded-full' value={item.evaluationCriteria * 25} text={item.evaluationCriteria} styles={{
                                                        root: { width: '2.5rem' },
                                                        path: {
                                                            stroke: strokeColor,
                                                        },
                                                        text: {
                                                            fontSize: '40px',
                                                        }

                                                    }} />
                                                </span>  </li>
                                            )
                                        })
                                    }
                                </ul>

                            </div>


                        </div>

                        <div className='lg:w-[49.3%] sm:w-[48%] min-h-[20rem] flex flex-col gap-4' >

                            <div className='bg-white rounded shadow-lg h-[50%] '>
                                <h2 className='font-bold text-xl text-2x1 text-gray-800 px-4 pt-4' >Datos Reloj:</h2>

                                <div className='flex justify-around h-full'>
                                    <div className='w-[30%] lg:h-[65%] sm:h-[55%] p-4'>
                                        <div className=' h-full' >
                                            <CircularProgressbar className='rounded-full w-full h-full' value={69} text={'12570'} styles={{
                                                root: { width: '100%' },
                                                path: {
                                                    stroke: '#14B8A6',
                                                },
                                                text: {
                                                    fontSize: '20px',
                                                }

                                            }} />
                                        </div>
                                        <h2 className='text-center font-thin mt-1' >Pasos Promedio</h2>
                                    </div>

                                    <div className='w-[30%]  lg:h-[65%] sm:h-[55%]  p-4'>
                                        <div className=' h-full' >
                                            <CircularProgressbar className='rounded-full w-full h-full' value={62} text={'92'} styles={{
                                                root: { width: '100%' },
                                                path: {
                                                    stroke: '#10B981',
                                                },
                                                text: {
                                                    fontSize: '20px',
                                                }

                                            }} />
                                        </div>
                                        <h2 className='text-center font-thin mt-1' >Latidos Promedio</h2>
                                    </div>

                                    <div className='w-[30%] lg:h-[65%] sm:h-[55%] p-4'>
                                        <div className=' h-full' >
                                            <CircularProgressbar className='rounded-full w-full h-full' value={89} text={'3200'} styles={{
                                                root: { width: '100%' },
                                                path: {
                                                    stroke: '#F97316',
                                                },
                                                text: {
                                                    fontSize: '20px',
                                                }

                                            }} />
                                        </div>
                                        <h2 className='text-center font-thin mt-1 ' >Gasto Promedio</h2>
                                    </div>
                                </div>

                            </div>

                            <div className='bg-white rounded shadow-lg h-[50%] p-4'>
                                <h2 className='font-bold text-xl text-2x1 text-gray-800  mb-4' >Duración:</h2>
                                <div className='flex h-full justify-evenly' >
                                    <div className='flex w-[50%] h-fit mt-2 ' >
                                        <p className='lg:text-lg sm:text-sm text-gray-500 pl-4 '>Inicio: {getLocalTimeFromUTC(startClassTime)}</p>

                                        <p className='lg:text-lg sm:text-sm  text-gray-500 pl-4 '>Fin: {getLocalTimeFromUTC(endClassTime)}</p>
                                    </div>


                                    <div className='flex items-center gap-4 justify-center h-fit w-[40%] ' >
                                        <BsClockHistory size={40} className="text-teal-700" />
                                        <div className='flex flex-col justify-center items-center'>
                                            <div className="text-xl  font-bold text-gray-500 text-center">
                                                {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')}
                                            </div>
                                            <h3 className='text-gray-500 text-center ' >Tiempo efectivo</h3>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className='lg:w-full mt-4 lg:mx-0 sm:mx-1 bg-white rounded shadow-lg '>
                        <Presentstudents presentStudents={studentsResume} />
                    </div>


                    <div className="lg:w-full mt-4 lg:mx-0 sm:mx-1 flex justify-between ">

                    <div className='bg-white rounded shadow-lg w-[49%] p-4 '>
                        <h2 className="font-bold text-xl text-2x1 text-gray-800">Adecuaciones:</h2>
                        <div className="flex gap-4 ">
                           {
                            classResume?.extraActivities?.length > 0 ? (
                                <ul>
                                    {
                                        classResume?.extraActivities?.map((item)=>(
                                            <li key={item} > {item} </li>
                                        ))
                                    }
                                </ul>
                            ) : (<p>Sin adecuaciones para esta clase</p> )
                           }
                        </div>
                        </div>

                        <div className='bg-white rounded shadow-lg w-[49%] p-4 '>
                        <h2 className="font-bold text-xl text-2x1 text-gray-800">Planificación:</h2>
                        <div className="flex gap-4 justify-between w-full items-center ">
                           <p>Planificación de la clase</p>
                           {
                            plannerClass?._id ? (
                                <Modalviewplaning idPlanner={plannerClass?._id} />
                            ) : (
                                <p>Clase realizada sin planificación</p>
                            )
                           } 
                            
                        </div>
                        </div>




                    </div>




                    <div className='lg:w-full mt-4 lg:mx-0 sm:mx-1 bg-white rounded shadow-lg flex justify-between '>
                        {
                            classResume.imgFirstVMClass ? (
                                <img src={classResume.imgFirstVMClass} alt='img-class' className='rounded shadow-lg w-[30%]' />
                            ) : null
                        }
                        {
                            classResume.imgSecondVMClass ? (
                                <img src={classResume.imgSecondVMClass} alt='img-class' className='rounded shadow-lg w-[30%]' />
                            ) : null
                        }
                        {
                            classResume.imgThirdVMClass ? (
                                <img src={classResume.imgThirdVMClass} alt='img-class' className='rounded shadow-lg w-[30%]' />
                            ) : null
                        }
                    </div>


                </div>
            </main>
        </>
    )
}
