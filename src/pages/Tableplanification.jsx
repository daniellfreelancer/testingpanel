import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from 'react-switch';
import axios from 'axios';
import materialsSchool from '../data/materialsSchool';
import { reload } from '../features/reloadSlice';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import primero_sexto_basicoACT from '../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../data/primero_sexto_basicoATA'
import GoBackToButton from '../components/GoBackButton';

import dataPrimeroBasico from '../data/primeroBasicoABC'
import dataSegundoBasico from '../data/segundoBasicoABC'
import dataTerceroBasico from '../data/terceroBasicoABC'
import { useDispatch } from 'react-redux';

import primeroBasicoIndicadores from '../data/primeroBasicoIndicadores'
import segundoBasicoIndicadores from '../data/segundoBasicoIndicadores'
import terceroBasicoIndicadores from '../data/terceroBasicoIndicadores'
import Modalindicators from '../components/modal/Modalindicators';
import {AiOutlineFileText} from 'react-icons/ai'


export default function Tableplanification() {

    /**
     * DATA DE PLANIFICACION PARA ENVIAR A BASE DE DATOS
     */
    const [startDate, setStartDate] = useState(new Date());                                     //FECHA Y HORA DE INICIO
    const [endDate, setEndDate] = useState(null);                                               //FECHA DE FIN
    const [duration, setDuration] = useState(null)                                              //DURACIÓN EN MINUTOS
    const [schoolBlock, setSchoolBlock] = useState(null)                                        //BLOQUES
    const [content, setContent] = useState()                                                    //CONTENIDO
    const [classObjectives, setClassObjectives] = useState([])                                  //OBJ BASALES Y COMPLEMENTARIOS
    const [indicatorsForEvaluateClass, setIndicatorsForEvaluateClass] = useState([])            //INDICADORES DEPENDIENTES DE OBJ BASALES/COMPLEMENTARIOS
    const [indicatorsForEvaluateClassManual, setIndicatorsForEvaluateClassManual] = useState([])//INDICADORES CARGA MANUAL POR EL PROFESOR
    const [learningObjetives, setLearningObjetives] = useState([])                              //OBJ TRANSVERSALES Y ACTITUDES
    const [activities, setActivities] = useState([])                                            //ACTIVIDADES
    const [materials, setMaterials] = useState([])                                              //MATERIALES
    const [evaluationType, setEvaluationType] = useState([])                                    //TIPO DE EVALUACION


    const toggleDuration = () => {
        setNormalTime((e) => (e === "normalTime" ? "schoolTime" : "normalTime"));
    };
    const toggleDate = () => {
        setDayWeek((e) => (e === "day" ? "week" : "day"));
    };

    /**
     * Datos para la planificación:
     * duraction
     */
    const [evaluationIndicators, setEvaluationIndicators] = useState([])
    
    
    


    
    
    const [skills, setSkills] = useState("")

    

    const [filteredIndicators, setFilteredIndicators] = useState([])

    

    const [dayWeek, setDayWeek] = useState("day")
    const [normalTime, setNormalTime] = useState("normalTime")




    const [userClassroom, setUserClassroom] = useState({})
    const animatedComponents = makeAnimated();
    const ojbTransversalesActitudes = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]
    const [objBasalesComplementarios, setObjBasalesComplementarios] = useState([])



    let handleColor = (time) => {
        return time.getHours() > 6 ? "text-green-800" : "text-red-800";
    };

   const idPlanner = "643db8323130e8bfaac6baee"
   // const idPlanner = "6436efc2dfa4f4062385fa6c"
    const dispatch = useDispatch()

    const evaluationArrayType = [
        {
            id:"formativa",
            label:"Formativa",
            value:"Formativa"
        },
        {
            id:"sumativa",
            label: "Sumativa",
            value: "Sumativa"
        }
    ]


    const fetchData = async () => {
        try {
            /**
             * classroom find by id
             */
            const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${idPlanner}`);

            setUserClassroom(response.data.response)
            dispatch(reload())



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

useEffect(() => {
    const filteredEvaluationIndicators = filterEvaluationIndicatorsByClassObjectives(evaluationIndicators, classObjectives);

   if (filteredEvaluationIndicators.length > 0) {
    setFilteredIndicators(filteredEvaluationIndicators)
   }  

   if(classObjectives.length === 0) {
    setFilteredIndicators([])
   }

}, [classObjectives])





    useEffect(() => {

        fetchData();
        handleUserData();



    }, [userClassroom]);



    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        })
    };

    const formatOptionLabel = ({ value, label }) => (
        <div title={value}>{label}</div>
    );

    const switchDateProps = {
        onChange: toggleDate,
        checked: dayWeek === "day",
        onColor: "#8bce75",
        onHandleColor: "rgb(67, 56, 202)",
        handleDiameter: 10,
        uncheckedIcon: false,
        checkedIcon: false,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
        activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
        height: 20,
        width: 35,
        className: "react-switch",
        id: "small-radius-switch"
    };

    const switchDurationProps = {
        onChange: toggleDuration,
        checked: normalTime === "schoolTime",
        onColor: "#8bce75",
        onHandleColor: " rgb(67 56 202)",
        handleDiameter: 10,
        uncheckedIcon: false,
        checkedIcon: false,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
        activeBoxShadow: "0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
        height: 20,
        width: 35,
        className: "react-switch",
        id: "small-radius-switch",
    }
    const tableHeaders = [
        "Contenido",
        "Objetivos Basales/Complementarios",
        "Indicadores de evaluacion",
        "Objetivos Transversales/Actitudes",
        "Actividades",
        "Materiales",
        "Tipo de Evaluación"
    ];

    const DateSelector = () => {
        return (
            <div className='rounded-lg'>
                <p className='mb-1'>Inicio</p>
                <DatePicker
                    showTimeSelect
                    showDisabledMonthNavigation
                    locale={es}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="cursor-pointer p-1 border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                    timeClassName={handleColor}
                />
            </div>
        );
    };

    const DateRangeSelector = () => {
        return (
            <>
                <div className='flex flex-col items-center justify-center gap-2   rounded-lg pt-1'>
                    <DateSelector />
                    <div className='border border-gray-50 rounded-lg'>
                        <p>Fin</p>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="p-1 cursor-pointer border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                        />
                    </div>
                </div>
            </>
        );
    };

    const handleCheckboxChange = (event, id, indicator) => {
        if (event.target.checked) {
            setIndicatorsForEvaluateClass((prevState) => [
                ...prevState,
                { id: id, indicator: indicator }
            ]);
        } else {
            setIndicatorsForEvaluateClass((prevState) =>
                prevState.filter((selected) => selected.id !== id || selected.indicator !== indicator)
            );
        }
    };

    const [selectedIndicators, setSelectedIndicators] = useState([]);


    const handleCheckboxChangeIndicators = (event, index, indicator) => {
        if (event.target.checked) {
            setIndicatorsForEvaluateClass([...indicatorsForEvaluateClass, indicator]);
            setSelectedIndicators([...indicatorsForEvaluateClass, indicator])
        } else {
            setIndicatorsForEvaluateClass(
                indicatorsForEvaluateClass.filter((value) => value !== indicator)
                
          );
          setSelectedIndicators(
            selectedIndicators.filter((value) => value !== indicator)
            
      )
        }
      };






    return (

        <div className="  overflow-x-auto min-h-[100vh] pt-5  ">

            <GoBackToButton />

            <table className="min-w-max w-full rounded-lg border my-4 ">
                <caption className="py-3 text-gray-600 border-t">Planificación: {`${userClassroom.grade}° ${userClassroom.level === 'basico' ? 'Básico' : 'Medio'} - Sección: "${userClassroom.section}"`}</caption>
                <thead className='border'>
                    <tr className="bg-gray-200 text-gray-500  text-xs">
                        <th className="text-center border w-16">
                            <p>Fecha</p>
                            <div className="flex items-center pl-4 ">
                                <ReactSwitch {...switchDateProps} />
                                <span className='mx-2' >{dayWeek === "day" ? (<p>Día</p>) : (<p>Semana</p>)}</span>
                            </div>
                        </th>
                        <th className="py-1 px-3 text-center w-12 ">
                            <p>Duración</p>
                            <div className="flex items-center justify-start gap-2 ">
                                <ReactSwitch {...switchDurationProps} />
                                <label>{normalTime === "normalTime" ? (<p>Normal</p>) : (<p>Escolar</p>)}</label>
                            </div>
                        </th>
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-20 ">{header}</th>))}
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-xs">
                    <tr className="border-b border-gray-200 min-h-[55vh] ">
                        <td className=" border py-3 px-2 text-center w-[7rem] ">
                            <div className="flex flex-col items-center  rounded-lg min-h-[10rem]">

                                {
                                    dayWeek === "week" ? (
                                        <div className='flex flex-col items-center justify-center gap-2' >

                                            <div className='rounded-lg' >
                                                <p className='mb-1'>Inicio</p>
                                                <DatePicker
                                                    showTimeSelect
                                                    showDisabledMonthNavigation
                                                    locale={es}
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    selectsStart
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    className="cursor-pointer p-1 border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                                                    timeClassName={handleColor}
                                                    dateFormat='dd/MM/yyyy'

                                                />
                                            </div>
                                            <div className='border border-gray-50  p-1 rounded-lg' >
                                                <p>Fin</p>

                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    selectsEnd
                                                    startDate={startDate}
                                                    endDate={endDate}
                                                    minDate={startDate}
                                                    className="p-1 cursor-pointer border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                                                    dateFormat='dd/MM/yyyy'
                                                    locale={es}
                                                />
                                            </div>

                                        </div>
                                    ) : (


                                        <div className='rounded-lg flex flex-col items-center justify-center  ' >
                                            <p className='mb-1' >Fecha</p>
                                            <DatePicker
                                                showTimeSelect
                                                showDisabledMonthNavigation
                                                locale={es}
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                className="cursor-pointer p-1 border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                                                timeClassName={handleColor}
                                                dateFormat='dd/MM/yyyy'

                                            />
                                        </div>

                                    )
                                }

                            </div>
                        </td>

                        {/* <td className=" border py-3 px-2 text-center w-[7rem] ">
                            <div className="flex flex-col items-center  rounded-lg min-h-[10rem]">
                                {dayWeek === "week" ? (
                                    <DateRangeSelector />
                                ) : (
                                    <div className='  p-2 rounded-lg flex flex-col items-center justify-center  ' >
                                        <p className='mb-1' >Fecha</p>
                                        <DatePicker
                                            showTimeSelect
                                            showDisabledMonthNavigation
                                            locale={es}
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            className="cursor-pointer p-1 border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                                            timeClassName={handleColor}
                                        />
                                    </div>
                                )}
                            </div>
                        </td> */}

                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[10rem]">
                                {
                                    normalTime === "normalTime" ? (
                                        <div className='rounded-lg' >
                                            <p>Minutos</p>
                                            <input

                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                        </div>
                                    ) : (
                                        <div className='rounded-lg' >
                                            <p>Bloque/s</p>
                                            <input
                                                value={schoolBlock}
                                                onChange={(e) => setSchoolBlock(e.target.value)}
                                                className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-[9rem]">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " />
                            </div>
                        </td>

                        <td className=" px-2 border text-center ">
                            <div className="flex mt-2 flex-col items-center rounded-lg min-h-[8rem] w-[12rem]">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={objBasalesComplementarios}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => ({ id: option.id, value: option.value }));
                                        setClassObjectives([...selectedValues]);
                                        dispatch(reload())
                                    }}
                                />
                            </div>
                        </td>

                        <td className="border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-[10rem] gap-2 ">
                                {
                                     filteredIndicators?.length > 0 ? (
                                        <Modalindicators title={"Ver Indicadores"} >
                                        <div>
    
                                            {
                                                filteredIndicators.map((item, index) => {
                                                    return (
                                                        <div className=' overflow-y-auto flex gap-2 p-5 border-lg my-5 bg-gray-100'>
                                                            <p className='w-[5rem] ' >Indicadores: {item.id} </p>
                                                            <ul className='flex flex-wrap p-10 gap-2 overflow-y-auto max-h-[20vh]'>
                                                                {
                                                                    item.indicators.map((indicator, indx)=>{
                                                                        const isChecked = selectedIndicators.includes(indicator);
                                                                        return (
                                                                            <li key={index} className='w-[15rem] font-thin'>
                                                                            <label className='flex  text-justify gap-3 my-2 border rounded-lg p-2 text-xs' >
                                                                                <input 
                                                                                type="checkbox" 
                                                                                // onChange={(event) => handleCheckboxChange(event, indx,indicator)} 
                                                                                onChange={(event) =>
                                                                                    handleCheckboxChangeIndicators(event, indx, indicator)
                                                                                  }
                                                                                  checked={isChecked}
                                                                                />
                                                                                {indicator}
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


                                <div className='rounded-lg' >
                                    <p>Otros indicadores</p>
                                    <textarea

                                        value={indicatorsForEvaluateClassManual}
                                        onChange={(e) => setIndicatorsForEvaluateClassManual(e.target.value)}
                                        className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[6rem] " />
                                </div>

                            </div>

                        </td>
                        <td className="px-2 border text-center">
                            <div className="flex mt-2 flex-col items-center rounded-lg min-h-[8rem] w-[10rem]">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={ojbTransversalesActitudes}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => ({ id: option.id, value: option.value }));
                                        setLearningObjetives([...selectedValues]);
                                        dispatch(reload())
                                    }}
                                />
                            </div>
                        </td>
                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-cente rounded-lg min-h-[8rem] w-[9rem]">
                                <textarea
                                    value={activities}
                                    onChange={(e) => setActivities(e.target.value)}
                                    className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " />
                            </div>
                        </td>
                        <td className="px-2 border text-center">
                            <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-[12rem] gap-2 ">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={materialsSchool.sort((a, b) => {
                                        if (a.label < b.label) return -1;
                                        if (a.label > b.label) return 1;
                                        return 0;
                                      })}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona...'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => option.value);
                                        setMaterials([...selectedValues]);
                                    }}
                                />
                                <div className="flex flex-col items-center rounded-lg h-[4rem] w-full">
                                    <p>Otros materiales</p>
                                    <textarea
                                        value={materials}
                                        onChange={(e) => setMaterials(e.target.value)}
                                        className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " />
                                </div>

                            </div>
                        </td>
                        <td className="py-3 px-2 text-justify border">
                            <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-[8rem] gap-2 ">
                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    options={evaluationArrayType}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona...'
                                    onChange={(selectedOption) => setEvaluationType(selectedOption.value)}
                                />
                                                             {
                                evaluationType === "Sumativa" ? (
                                    
                                        <div className='flex gap-2 border bg-gray-200 px-2 py-1 rounded ' >
                                            <AiOutlineFileText size={20} />
                                            <input className='w-full font-thin cursor-pointer'  type="file" onChange={(event) => {
                                                const selectedFile = event.target.files[0];
                                                console.log(selectedFile);
                                            }} />
                                        </div>
                                ) : (
                                    null
                                )
                             } 
                            </div>

      


                        </td>

                    </tr>
                </tbody>
            </table>
            <div className='flex bg-gray-50 hover:bg-gray-100 shadow-md border p-3 gap-2 justify-end'>
                <button className="btn-cancelar">
                    Cancelar
                </button>
                <button className="btn-guardar">
                    Guardar
                </button>
            </div>
        </div>
    )
}
