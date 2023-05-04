import React, { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { reload } from '../../features/reloadSlice';
import primero_sexto_basicoACT from '../../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../../data/primero_sexto_basicoATA'
import dataPrimeroBasico from '../../data/primeroBasicoABC'
import dataSegundoBasico from '../../data/segundoBasicoABC'
import dataTerceroBasico from '../../data/terceroBasicoABC'
import primeroBasicoIndicadores from '../../data/primeroBasicoIndicadores'
import segundoBasicoIndicadores from '../../data/segundoBasicoIndicadores'
import terceroBasicoIndicadores from '../../data/terceroBasicoIndicadores'
import Modalindicators from '../../components/modal/Modalindicators';


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
    const ojbTransversalesActitudes = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]
    const [objBasalesComplementarios, setObjBasalesComplementarios] = useState([])
    const [evaluationIndicators, setEvaluationIndicators] = useState([])

    const [userClassroom, setUserClassroom] = useState({})
    const [selectedIndicators, setSelectedIndicators] = useState([]);

console.log([ojbTransversalesActitudes, objBasalesComplementarios])





    /**
     * PETICION AXIOS PARA OBTENER DATA A EDITAR DE PLANIFICACIÓN
     */
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/planing/find/${idPlanner}`);
            console.log(response.data)

            setUserClassroom(response.data.classroom)
            setDuration(response.data.duration)
            setSchoolBlock(response.data.schoolBlock)
            response.data.duration > 8 ? setNormalTime("normalTime") : setNormalTime("schoolTime")
            response.data.endDate !== null ? setDayWeek("week") : setDayWeek("day")
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

    function handleCheckboxChangeIndicators(event, id, value) {
        if (event.target.checked) {
          setIndicatorsForEvaluateClass(prevState => [...prevState, { id, value }]);
          setSelectedIndicators(prevState => [...prevState, { id, value }])
        } else {
          setIndicatorsForEvaluateClass(prevState =>
            prevState.filter(indicator => indicator.id !== id)
          );
          setSelectedIndicators(prevState =>
            prevState.filter(indicator => indicator.id !== id)
          );
        }
      }


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
    }, [userClassroom])



    /**
     * FORMATOS Y RENDERIZADOS
     */


    const tableHeaders = [
        "Contenido",
        "Objetivos Basales/Complementarios",
        "Indicadores de evaluacion",
        "Objetivos Transversales/Actitudes",
        "Actividades",
        "Materiales",
        "Tipo de Evaluación"
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

    function getLocalTimeFromUTC(utcDateString) {
        const utcDate = new Date(utcDateString);
        const localTime = utcDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true});
        return localTime;
      }




    /**
     * RENDERIZADO WEB
     */
    return (

        <div className="  overflow-x-auto min-h-[75vh] pt-5  ">
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
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-[13rem] ">{header}</th>))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-xs">
                    <tr className="border-b border-gray-200 min-h-[55vh] ">
                        <td className=" border py-3 px-2 text-center w-[7rem] ">
                            <div className="flex flex-col items-center  rounded-lg min-h-[10rem]">
                                {
                                    dayWeek === "week" ? (
                                        <div className='flex flex-col items-center justify-center gap-2' >
                                            <h3>Semana del:</h3>
                                            <h3> {formatDate(startDate) }</h3>
                                            <p>al</p>
                                            <h3>{formatDate(endDate) }</h3>
                                            <h4>Hora: {getLocalTimeFromUTC(startDate)} </h4>
                                        </div>
                                    ) : (
                                        <div className='rounded-lg flex flex-col items-center justify-center  ' >
                                             <h3> {formatDate(startDate) }</h3>
                                             <h4>Hora: {getLocalTimeFromUTC(startDate)} </h4>
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                        <td className="py-3 px-1 border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[10rem]">
                                {
                                    normalTime === "normalTime" ? (
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
                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-[9rem]">
                                <p> {content} </p>
                            </div>
                        </td>
                        <td className=" px-2 border text-center ">

                            {
                                classObjectives.map((item) => (
                                    <div className='flex justify-between items-center py-2'>
                                        <p className='text-justify'>{item.label}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
                                        {/* <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteClassObjective(item)}> <AiOutlineDelete size={12} /> </button> */}
                                    </div>
                                ))
                            }


                            {/* <div className="flex mt-2 flex-col items-center rounded-lg min-h-[8rem] w-[12rem]">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={objBasalesComplementarios.filter(obj => !classObjectivesIds.includes(obj.id)).map(obj => ({ ...obj, isDisabled: false }))}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='agrega un objetivo'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => ({ id: option.id, label:option.label, value: option.value }));
                                        setClassObjectives([...selectedValues]);
                                    }}
                                    value={classObjectives}
                                    backspaceRemovesValue={true}
                                />



                            </div> */}
                        </td>
                        <td className="text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-fit gap-2 px-2 ">
                                {
                                    filteredIndicators?.length > 0 ? (
                                        <Modalindicators title={"Ver Indicadores"} >
                                            <div>
                                                {
                                                    filteredIndicators.map((item, index) => {
                                                        return (
                                                            <div className=' overflow-y-auto flex items-center  gap-2 px-4 border-lg my-4 bg-gray-200 shadow rounded-lg'>
                                                                <p className='w-[5rem] text-sm text-center font-thin ' >Indicadores: {item.id} </p>
                                                                <ul className='flex flex-wrap p-4 gap-2 overflow-y-auto max-h-[20vh] w-full'>
                                                                    {
                                                                        item.indicators.map((indicator) => {
                                                                            // const isChecked = selectedIndicators.includes(indicator.value);
                                                                            const isChecked = selectedIndicators.some(selected => selected.id === indicator.id);
                                                                            return (
                                                                                <li key={indicator.id} className='w-[16rem] font-thin '>
                                                                                    <label className='flex text-justify gap-3 border rounded-lg p-2 text-xs bg-white  min-h-[3rem]' >
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            onChange={(event) =>
                                                                                                handleCheckboxChangeIndicators(event, indicator.id, indicator.value)
                                                                                            }
                                                                                            checked={isChecked}
                                                                                            disabled
                                                                                        />
                                                                                        {indicator.value}
                                                                                    </label>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Modalindicators>
                                    ) : (
                                        null
                                    )
                                }
                                {
                                    indicatorsForEvaluateClassManual.length > 0 ? (
                                        <div className='rounded bg-green-200 mx-1 p-1' >
                                    
                                        <h2>Otros indicadores:</h2>
                                        <p> {indicatorsForEvaluateClassManual}. </p>
                                        {/* <textarea
                                            value={indicatorsForEvaluateClassManual}
                                            onChange={(e) => setIndicatorsForEvaluateClassManual(e.target.value)}
                                            className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[6rem] " /> */}
                                    </div>
                                    ) : (
                                        null
                                    )
                                }

                            </div>
                        </td>
                        <td className="px-2 border text-center">


                            {/* <h2>Objetivos de Aprendizaje</h2> */}

                            {
                                learningObjetives.map((item) => (
                                    <div className='flex justify-between items-center py-2'>
                                        <p className='text-justify'>{item.id}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
                                        {/* <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteLearningObjectives(item)}> <AiOutlineDelete size={12} /> </button> */}
                                    </div>
                                ))
                            }

                        </td>
                        <td className="py-3 px-2 border">
                            <div className="rounded-lg min-h-[8rem] w-[9rem] flex justify-center items-start">
                                <p> {activities} </p>
                                {/* <textarea
                                    value={activities}
                                    onChange={(e) => setActivities(e.target.value)}
                                    className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] "
                                /> */}
                            </div>
                        </td>

                        <td className="px-2 border text-justify w-[8rem] ">
                            {/* <h2>Materiales seleccionados</h2> */}

                            {
                                materials.map((item) => (
                                    <div key={item.id} className='py-2'>
                                        <p className='text-center'>{item.value}</p>
                                        {/* <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteMaterials(item)}> <AiOutlineDelete size={12} /> </button> */}
                                    </div>
                                ))
                            }
                                                            <div className="flex flex-col items-center rounded-lg h-[4rem] w-full">
                                    <h2>Otros materiales</h2>
                                    <p> {otherMaterials} </p>
                                    {/* <textarea
                                        value={otherMaterials}
                                        onChange={(e) => setOtherMaterials(e.target.value)}
                                        className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " /> */}
                                </div>
                            {/* <div className="pt-1 flex flex-col flex-initial rounded-lg min-h-[8rem] w-[12rem] gap-2 ">
                            
                               <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={materialsSchool.sort((a, b) => {
                                        if (a.label < b.label) return -1;
                                        if (a.label > b.label) return 1;
                                        return 0;
                                    }).filter(obj => !materialsIds.includes(obj.id)).map(obj => ({ ...obj, isDisabled: false }))}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona...'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => ({value: option.value, id: option.id, label: option.label}));
                                        setMaterials([...selectedValues]);
                                    }}
                                    value={materials}
                                    backspaceRemovesValue={true}
                                /> 

                            </div> */}
                        </td>
                        <td className="py-3 px-2 text-justify border">
                            <p> {evaluationType} </p>

                            {/* <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-[8rem] gap-2 ">
                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    options={evaluationArrayType}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona...'
                                    value={evaluationArrayType.find(element => element.value === evaluationType)}
                                    onChange={(selectedOption) => setEvaluationType(selectedOption.value)}
                                />
                                {
                                    evaluationType === "Sumativa" ? (

                                        <div className='flex gap-2 border bg-gray-200 px-2 py-1 rounded ' >
                                            <AiOutlineFileText size={20} />
                                            <input className='w-full font-thin cursor-pointer' type="file" onChange={(event) => {
                                                const selectedFile = event.target.files[0];
                                                console.log(selectedFile);
                                            }} />
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                            </div> */}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}