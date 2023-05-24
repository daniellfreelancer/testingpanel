import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { reload } from '../../features/reloadSlice';
import primero_sexto_basicoACT from '../../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../../data/primero_sexto_basicoATA'
import dataPrimeroBasico from '../../data/primeroBasicoABC'
import dataSegundoBasico from '../../data/segundoBasicoABC'
import dataTerceroBasico from '../../data/terceroBasicoABC'
import primeroBasicoIndicadores from '../../data/primeroBasicoIndicadores'
import segundoBasicoIndicadores from '../../data/segundoBasicoIndicadores'
import terceroBasicoIndicadores from '../../data/terceroBasicoIndicadores'
import { usePlanifitacionByIdMutation } from '../../features/plannerAPI';


export default function PlanificationViewTable({ idPlanner }) {
    /**
     * HOOKS / PARAMS
     */



    /**
     * DATA DE PLANIFICACIÓN PARA ENVIAR A BASE DE DATOS
     */
    const [startDate, setStartDate] = useState(new Date());                                     //FECHA Y HORA DE INICIO
    const [endDate, setEndDate] = useState(null);                                               //FECHA DE FIN
    const [duration, setDuration] = useState()                                                  //DURACIÓN EN MINUTOS
    const [schoolBlock, setSchoolBlock] = useState()                                            //BLOQUES
    const [content, setContent] = useState()                                                    //CONTENIDO
    const [classObjectives, setClassObjectives] = useState([])                                  //OBJ BASALES Y COMPLEMENTARIOS
    const [indicatorsForEvaluateClass, setIndicatorsForEvaluateClass] = useState([])            //INDICADORES DEPENDIENTES DE OBJ BASALES/COMPLEMENTARIOS
    const [indicatorsForEvaluateClassManual, setIndicatorsForEvaluateClassManual] = useState([])//INDICADORES CARGA MANUAL POR EL PROFESOR
    const [learningObjetives, setLearningObjetives] = useState([])                              //OBJ TRANSVERSALES Y ACTITUDES
    const [activities, setActivities] = useState([])                                            //ACTIVIDADES
    const [materials, setMaterials] = useState([])                                              //MATERIALES
    const [otherMaterials, setOtherMaterials] = useState([])                                    //OTROS MATERIALES
    const [evaluationType, setEvaluationType] = useState([])                                    //TIPO DE EVALUACION
    
    /**
     * ACTUALIZAR PLANIFICACIÓN
     */

    /**
     * ESTADOS DE INFORMACION Y COMPONENTES
     */
    const [filteredIndicators, setFilteredIndicators] = useState([])
    const [dayWeek, setDayWeek] = useState("day")
    const [normalTime, setNormalTime] = useState("normalTime")
    // eslint-disable-next-line
    const ojbTransversalesActitudes = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]
    // eslint-disable-next-line
    const [objBasalesComplementarios, setObjBasalesComplementarios] = useState([])
    const [evaluationIndicators, setEvaluationIndicators] = useState([])
    const [userClassroom, setUserClassroom] = useState({})
    // eslint-disable-next-line
    const [selectedIndicators, setSelectedIndicators] = useState([]);

    const [getPlanificationById] = usePlanifitacionByIdMutation()




    /**
     * PETICION AXIOS PARA OBTENER DATA A EDITAR DE PLANIFICACIÓN
     */
    const fetchData = async () => {
        try {
           // const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/planing/find/${idPlanner}`);
            const response = await getPlanificationById(idPlanner)
            setUserClassroom(response.data.classroom)
            setDuration(response.data.duration)
            setSchoolBlock(response.data.schoolBlock)
            response.data.duration > 8 ? setNormalTime("normalTime") : setNormalTime("schoolTime")
            response.data.endDate !== null && response.data.endDate > response.data.startDate ? setDayWeek("week") : setDayWeek("day")
            setContent(response.data.content)
            setClassObjectives(response.data.classObjectives)
            setActivities(response.data.activities)
            setEvaluationType(response.data.evaluationType)
            setLearningObjetives(response.data.learningObjectives)
            setStartDate(new Date(response.data.startDate))
            setEndDate(new Date(response.data.endDate))
            setMaterials(response.data.materials)
            setIndicatorsForEvaluateClass(response.data.evaluationIndicators)
            setSelectedIndicators(response.data.evaluationIndicators)
            setOtherMaterials(response.data.otherMaterials)
            setIndicatorsForEvaluateClassManual(response.data.evaluationIndicatorsTeacher)




        } catch (error) {
            console.log(error);
        }
    };
    const handleUserData = () => {
        switch (userClassroom.grade) {
            case "1":
                switch (userClassroom.level) {
                    case "basico":
                        setObjBasalesComplementarios(dataPrimeroBasico);
                        setEvaluationIndicators(primeroBasicoIndicadores)
                        break;
                    case "medio":
                        setObjBasalesComplementarios(dataPrimeroBasico);
                        break;
                    default:
                        console.log("El nivel no se encontró");
                }
                break;
            case "2":
                switch (userClassroom.level) {
                    case "basico":
                        setObjBasalesComplementarios(dataSegundoBasico);
                        setEvaluationIndicators(segundoBasicoIndicadores)
                        break;
                    case "medio":
                        setObjBasalesComplementarios(dataSegundoBasico);
                        break;
                    default:
                        console.log("El nivel no se encontró");
                }
                break;
            case "3":
                switch (userClassroom.level) {
                    case "basico":
                        setObjBasalesComplementarios(dataTerceroBasico);
                        setEvaluationIndicators(terceroBasicoIndicadores);
                        break;
                    case "medio":
                        setObjBasalesComplementarios(dataTerceroBasico);
                        break;
                    default:
                        console.log("El nivel no se encontró");
                }
                break;
            default:
                console.log("El valor no se encontró");
        }
    }
    function filterEvaluationIndicatorsByClassObjectives(evaluationIndicators, classObjectives) {
        const selectedIds = classObjectives.map(obj => obj.id);
        return evaluationIndicators.filter(indicator => selectedIds.includes(indicator.id));
    }
    // const handleCheckboxChangeIndicators = (event, index, indicator) => {
    //     if (event.target.checked) {
    //         setIndicatorsForEvaluateClass([...indicatorsForEvaluateClass, indicator]);
    //         setSelectedIndicators([...indicatorsForEvaluateClass, indicator])
    //     } else {
    //         setIndicatorsForEvaluateClass(
    //             indicatorsForEvaluateClass.filter((value) => value !== indicator)
    //         );
    //         setSelectedIndicators(
    //             selectedIndicators.filter((value) => value !== indicator)
    //         )
    //     }
    // };

    // function handleCheckboxChangeIndicators(event, id, value) {
    //     if (event.target.checked) {
    //       setIndicatorsForEvaluateClass(prevState => [...prevState, { id, value }]);
    //       setSelectedIndicators(prevState => [...prevState, { id, value }])
    //     } else {
    //       setIndicatorsForEvaluateClass(prevState =>
    //         prevState.filter(indicator => indicator.id !== id)
    //       );
    //       setSelectedIndicators(prevState =>
    //         prevState.filter(indicator => indicator.id !== id)
    //       );
    //     }
    //   }


    useEffect(() => {
        const filteredEvaluationIndicators = filterEvaluationIndicatorsByClassObjectives(evaluationIndicators, classObjectives);
        if (filteredEvaluationIndicators.length > 0) {
            setFilteredIndicators(filteredEvaluationIndicators)
        }
        if (classObjectives.length === 0) {
            setFilteredIndicators([])
        }
        // eslint-disable-next-line
    }, [classObjectives])

    useEffect(() => {
        fetchData();

        // eslint-disable-next-line
    }, [reload]);

    useEffect(() => {
        handleUserData();
        // eslint-disable-next-line
    }, [userClassroom])



    /**
     * FORMATOS Y RENDERIZADOS
     */


    const tableHeaders = [
        "Objetivos Basales/Complementarios",
        "Indicadores de evaluacion",
        "Objetivos Transversales/Actitudes",
        "Actividades",
    ];


    /**
     * BUSCAR LOS ID DE LOS OBJETIVOS BASALES Y COMPLEMENTARIOS YA SELECCIONADOS
     */
    // eslint-disable-next-line
    const classObjectivesIds = classObjectives.map(obj => obj.id);

    /**
     * BUSCAR LOS ID DE LOS OBJETIVOS TRANSVERSALES Y ACTITUDES YA SELECCIONADOS
     */
    // eslint-disable-next-line
    const learningObjectivesIds = learningObjetives.map(obj => obj.id);

    /**
     * BUSCAR LOS ID DE LOS MATERIALES YA SELECCIONADOS
     */
    // eslint-disable-next-line
    const materialsIds = materials.map(obj => obj.id);


    /**
     * VER
     */
    // eslint-disable-next-line
    const filteredIndicatorsArray = filteredIndicators.filter(indicator => 
        indicatorsForEvaluateClass.includes(indicator.indicators[0])
    );
    
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




    /**
     * RENDERIZADO WEB
     */
    return (

        <div className="  overflow-x-auto pt-5  ">
            {/* <GoBackToButton /> */}
            <table className="min-w-max w-full rounded-lg border my-4 ">
                <caption className="py-3 text-gray-600 border-t">Planificación: {`${userClassroom.grade}° ${userClassroom.level === 'basico' ? 'Básico' : 'Medio'} - Sección: "${userClassroom.section}"`}</caption>
                <thead className='border'>
                    <tr className="bg-gray-200 text-gray-500  text-xs">
                        <th className="text-center border w-16">
                            <p>Fecha</p>
                        </th>
                        <th className="py-1 px-3 text-center w-12 ">
                            <p>Duración</p>
                        </th>
                        <th className="py-1 px-3 text-center w-[10rem] ">
                            <p>Contenido</p>
                        </th>
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-[12rem] ">{header}</th>))}
                        <th className="py-1 px-3 text-center w-[10rem] ">
                            <p>Materiales</p>
                        </th>
                        <th className="py-1 px-3 text-center w-[7rem] ">
                            <p>Tipo de Evaluación</p>
                        </th>
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
                                            <h3> {formatDate(startDate) }</h3>
                                            <p>al</p>
                                            <h3>{formatDate(endDate) }</h3>
                                            {/* <h4>Hora: {getLocalTimeFromUTC(startDate)} </h4> */}
                                        </div>
                                    ) : (
                                        <div className='rounded-lg flex flex-col items-center justify-center  gap-2 ' >
                                             <h3> {formatDate(startDate) }</h3>
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
                                            <p> {schoolBlock} { schoolBlock === 1 ? 'Bloque' : 'Bloques' }</p>
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
                        <div className="flex flex-col items-center min-h-[15rem] gap-2 px-3">
                            {
                                classObjectives.map((item) => (
                                    <ul className='flex justify-between list-disc w-fit'>
                                        <li className='text-justify border-b pb-1'>{item.label}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</li>                                      
                                    </ul>
                                ))
                            }
                            </div>
                        </td>
                        <td className="text-left p-2">
                            <div className="flex flex-col items-center min-h-[15rem] gap-2">
                                {
                                    indicatorsForEvaluateClass.map((item) => (
                                        <ul className='flex justify-between items-center list-disc w-fit px-3'>
                                            <li className='text-justify border-b pb-1'>{item.value.substring(0, 50)}{item.value.length > 50 ? "..." : ""}</li>                                           
                                        </ul>
                                    ))
                                }
                                {
                                    indicatorsForEvaluateClassManual.length > 0 ? (
                                        <div>
                                        {
                                             indicatorsForEvaluateClassManual.map((item)=>{
                                                return (
                                                    <ul className='flex justify-between text-left items-center list-disc w-fit px-3'>
                                                        <li className='text-left border-b pb-1'>{item.value?.substring(0, 50)}{item.value?.length > 50 ? "..." : ""}</li>
        
                                                    </ul>
                                                )
                                             })
                                        }
        
                                        </div>
                                    ) : null
                                }


                            </div>
                        </td>
                        <td className="border p-2">
                            <div className="flex flex-col items-center min-h-[15rem] gap-2 px-3">
                                {
                                    learningObjetives.map((item) => (
                                        <ul className='justify-between items-center  gap-1  list-disc'>
                                            <li className='text-justify border-b pb-1'>{item.id}: {item.value.substring(0, 85)}{item.value.length > 85 ? "..." : ""}</li>

                                        </ul>
                                    ))
                                }
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
                        <div className="flex flex-col min-h-[15rem] gap-2 px-3">
                            {
                                materials.map((item) => (
                                    <ul  key={item.id} className='flex list-disc w-fit'>
                                        <li className='text-justify border-b pb-1'>{item.value}</li>
                                    </ul>
                                ))
                            }
                                <ul className='flex justify-between list-disc w-fit'>
                                    {
                                        otherMaterials ? (<li> {otherMaterials} </li> ):( null)
                                    }
                                    
                                </ul>
                            </div>
                        </td>
                        <td className="px-2 border ">
                        <div className="flex flex-col items-center min-h-[15rem] gap-2 px-3">
                            <p> {evaluationType} </p>
                        </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
