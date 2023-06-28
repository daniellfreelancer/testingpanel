import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { reload } from '../../features/reloadSlice';
import { BsFileEarmarkPdf } from 'react-icons/bs'
import axios from 'axios';

export default function PlanificationViewWorkshop({ idPlanner }) {


    const [startDate, setStartDate] = useState(new Date());                 //FECHA Y HORA DE INICIO
    const [endDate, setEndDate] = useState(null);                           //FECHA DE FIN
    const [duration, setDuration] = useState(null)                          //DURACIÓN EN MINUTOS
    const [schoolBlock, setSchoolBlock] = useState(null)                    //BLOQUES
    const [content, setContent] = useState()                                //CONTENIDO
    const [learningObjetives, setLearningObjetives] = useState("")          //OBJ DE LA CLASE
    const [activities, setActivities] = useState("")                        //ACTIVIDADES
    const [materials, setMaterials] = useState([])                          //MATERIALES
    const [otherMaterials, setOtherMaterials] = useState("")                //OTROS MATERIALES
    const [quizDoc, setQuizDoc] = useState(null)                            //ARCHIVO
    const [dayWeek, setDayWeek] = useState("day")
    const [normalTime, setNormalTime] = useState("normalTime")
    const [userWorkshop, setuserWorkshop] = useState("")


    const fetchData = async () => {
        try {
            const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/workshop-planification/find/${idPlanner}`);

            setuserWorkshop(response.data.workshop)
            setDuration(response.data.duration)
            setSchoolBlock(response.data.schoolBlock)
            response.data.duration > 8 ? setNormalTime("normalTime") : setNormalTime("schoolTime")
            response.data.endDate !== null && response.data.endDate > response.data.startDate ? setDayWeek("week") : setDayWeek("day")
            setContent(response.data.content)
            setActivities(response.data.activities)
            setLearningObjetives(response.data.learningObjectives)
            setStartDate(new Date(response.data.startDate))
            setEndDate(new Date(response.data.endDate))
            setMaterials(response.data.materials)
            setOtherMaterials(response.data.otherMaterials)
            setQuizDoc(response.data.quiz)


        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, [reload]);

    const tableHeaders = [
        "Contenido",
        "Objetivos",
        "Actividades",
        "Materiales",
        "Detalle adjunto"
    ];

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }



    return (
        <div className="overflow-x-auto pt-5  ">
            {/* <GoBackToButton /> */}
            <table className="min-w-max w-full rounded-lg border my-4 ">
                <caption className="py-3 text-gray-600 border-t">Planificación: {userWorkshop.name}</caption>
                <thead className='border'>
                    <tr className="bg-gray-200 text-gray-500  text-xs">
                        <th className="text-center border w-16">
                            <p>Fecha</p>
                        </th>
                        <th className="py-1 px-3 text-center w-12 ">
                            <p>Duración</p>
                        </th>
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-[9rem] ">{header}</th>))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-xs">
                    <tr className="border-b border-gray-200 h-full">
                        <td className=" border py-3 px-2 text-center w-[7rem] ">
                            <div className="flex flex-col items-center  rounded-lg min-h-[15rem]">
                                {
                                    dayWeek === "week" ? (
                                        <div className='flex flex-col items-center justify-center gap-2' >
                                            <h3>Semana del:</h3>
                                            <h3> {formatDate(startDate)}</h3>
                                            <p>al</p>
                                            <h3>{formatDate(endDate)}</h3>
                                            {/* <h4>Hora: {getLocalTimeFromUTC(startDate)} </h4> */}
                                        </div>
                                    ) : (
                                        <div className='rounded-lg flex flex-col items-center justify-center  gap-2 ' >
                                            <h3> {formatDate(startDate)}</h3>
                                            {/* <h4>Hora: {getLocalTimeFromUTC(startDate)} </h4> */}
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                        <td className="py-3 px-1 border text-center">
                            <div className="flex flex-col items-center min-h-[15rem] ">
                                {
                                    normalTime === "normalTime" && duration > 8 ? (
                                        <div className='rounded-lg' >
                                            <p> {duration} Minutos</p>
                                        </div>
                                    ) : (
                                        <div className='rounded-lg' >
                                            <p> {schoolBlock} {schoolBlock === 1 ? 'Bloque' : 'Bloques'}</p>
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                        <td className="border text-center ">
                            <div className="flex flex-col items-center min-h-[15rem] px-3">
                                <ul className='flex justify-between list-disc w-fit'>
                                    <li className='text-justify'>{content}</li>
                                </ul>
                            </div>
                        </td>
                        <td className="text-center p-2 border ">

                            <div className="flex flex-col items-center min-h-[15rem] px-3">
                                <ul className='flex justify-between list-disc w-fit'>
                                    <li className='text-justify'>{learningObjetives}</li>
                                </ul>
                            </div>
                        </td>


                        <td className=" border px-2">
                            <div className="flex flex-col min-h-[15rem] px-3">
                                <ul className='flex justify-between list-disc w-fit'>
                                    <li className='text-justify'>{activities}</li>
                                </ul>
                            </div>
                        </td>

                        <td className="px-2 border ">
                            {
                                materials.length > 0 || otherMaterials !== "" ? (
                                    <div className="flex flex-col min-h-[15rem] gap-2 px-3">
                                        {
                                            materials.map((item) => (
                                                <ul key={item.id} className='flex list-disc w-fit'>
                                                    <li className='text-justify border-b pb-1'>{item.value}</li>
                                                </ul>
                                            ))
                                        }
                                        <ul className='flex justify-between list-disc w-fit'>
                                            {
                                                otherMaterials ? (<li> {otherMaterials} </li>) : (null)
                                            }

                                        </ul>

                                    </div>
                                ) : (
                                    <p>Sin materiales</p>
                                )
                            }

                        </td>
                        <td className="px-2 border ">
                            <div className="flex flex-col items-center min-h-[15rem] gap-2 px-3">


                                {
                                    quizDoc ? (
                                        <>
                                            <a
                                                href={`https://vmtestphotos.s3.sa-east-1.amazonaws.com/${quizDoc}`}
                                                target='_blank'
                                                className='text-blue-500 hover:text-blue-700'
                                                rel="noreferrer"
                                            >
                                                <BsFileEarmarkPdf size={40} />
                                            </a>

                                        </>
                                    ) : (
                                        <p> Sin archivos</p>
                                    )

                                }


                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
