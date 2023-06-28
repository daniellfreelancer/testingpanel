import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from 'react-switch';
import axios from 'axios';
import materialsSchool from '../../data/materialsSchool';
import { reload } from '../../features/reloadSlice';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import primero_sexto_basicoACT from '../../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../../data/primero_sexto_basicoATA';
import septimo_octavo_basicoACT from '../../data/septimo_octavo_basicoACT'
import septimo_octavo_basicoATA from '../../data/septimo_octavo_basicoATA'

import dataPrimeroBasico from '../../data/primeroBasicoABC'
import dataSegundoBasico from '../../data/segundoBasicoABC'
import dataTerceroBasico from '../../data/terceroBasicoABC'
import dataCuartoBasico from '../../data/cuartoBasicoABC'
import dataQuintoBasico from '../../data/quintoBasicoABC'
import dataSextoBasico from '../../data/sextoBasicoABC'
import dataSeptimoBasico from '../../data/septimoBasicoABC'
import dataOctavoBasico from '../../data/octavoBasicoABC'

import primeroBasicoIndicadores from '../../data/primeroBasicoIndicadores'
import segundoBasicoIndicadores from '../../data/segundoBasicoIndicadores'
import terceroBasicoIndicadores from '../../data/terceroBasicoIndicadores'
import cuartoBasicoIndicadores from '../../data/cuartoBasicoIndicadores'
import quintoBasicoIndicadores from '../../data/quintoBasicoIndicadores'
import sextoBasicoIndicadores from '../../data/sextoBasicoIndicadores'
import septimoBasicoIndicadores from '../../data/septimoBasicoIndicadores'
import octavoBasicoIndicadores from '../../data/octavoBasicoIndicadores'

import Modalindicators from '../../components/modal/Modalindicators';
import {AiOutlineDelete} from 'react-icons/ai'
import { useParams } from 'react-router';
import swal from 'sweetalert2'
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import { MdPostAdd } from 'react-icons/md'
import LoadingModal from '../modal/LoadingModal';
import { BsCloudUpload } from 'react-icons/bs';
export default function PlanificationNewTable() {

        const dispatch = useDispatch()
        const {id} = useParams()

    

    /**
     * DATA DE PLANIFICACIÓN PARA ENVIAR A BASE DE DATOS
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
    const [activities, setActivities] = useState("")                                            //ACTIVIDADES
    const [materials, setMaterials] = useState([])                                              //MATERIALES
    const [otherMaterials, setOtherMaterials] = useState("")                                    //OTROS MATERIALES
    const [evaluationType, setEvaluationType] = useState([])                                    //TIPO DE EVALUACION
    const [addExtraIndicator, setAddExtraIndicator] = useState([])
    const [quizDoc, setQuizDoc] = useState(null)
    const [isLoading, setIsLoading] = useState(false);


      function handleClear(){
        setStartDate(new Date())
        setEndDate(null)
        setDuration(null)
        setSchoolBlock(null)
        setContent("")
        setClassObjectives([])
        setIndicatorsForEvaluateClass([])
        setIndicatorsForEvaluateClassManual([])
        setLearningObjetives([])
        setActivities("")
        setMaterials([])
        setOtherMaterials([])
        setEvaluationType("")
        dispatch(reload())
    }

      /**
       * CREAR PLANIFICACIÓN
       */
    async function handleCreatePlaning() {




        Swal.fire({
            title: '¿Deseas crear la planificación?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Crear',
            denyButtonText: `No`,
            buttonsStyling: true,
            showLoaderOnConfirm: true,
            customClass: {
                title: 'text-xs',
                confirmButton: 'text-green-500',
                denyButton: 'text-green-500',
            },
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */

            if (result.isConfirmed) {
                setIsLoading(true);

                axios.post('https://whale-app-qsx89.ondigitalocean.app/planing/create', {
                    classroom: id,
                    startDate: startDate ? startDate.toISOString() : "",
                    endDate: endDate ? endDate.toISOString() : null,
                    duration: duration ? duration : 0,
                    schoolBlock: schoolBlock ? schoolBlock : 0,
                    content: content,
                    classObjectives: classObjectives,
                    evaluationIndicators: indicatorsForEvaluateClass,
                    evaluationIndicatorsTeacher: indicatorsForEvaluateClassManual,
                    learningObjectives: learningObjetives,
                    activities: activities,
                    materials: materials,
                    otherMaterials: otherMaterials,
                    evaluationType: evaluationType,
                    quiz: quizDoc
                }, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }).then((response) => {
                    setIsLoading(false);
                   

                    if (response.data) {
                        swal.fire({
                            text: response.data.message,
                            icon: "success",
                        });
                        handleClear()
                    }

                })
                .catch((error) => {
                    console.log(error)
                })

                // newPlanification(planificationData)
                //     .then((response) => {

                //         if (response.data) {
                //             swal.fire({
                //                 text: response.data.message,
                //                 icon: "success",
                //             });
                //             handleClear()
                //         }

                //     })
                //     .catch((error) => {
                //         console.log(error)
                //     })

            } else if (result.isDenied) {
                Swal.fire('No se ha creado la planificación', '', 'info')

                dispatch(reload())
            }
        })

    }

    /**
     * ESTADOS DE INFORMACION Y COMPONENTES
     */
    const [filteredIndicators, setFilteredIndicators] = useState([])
    const [dayWeek, setDayWeek] = useState("day")
    const [normalTime, setNormalTime] = useState("normalTime")
    const [ojbTransversalesActitudes, setOjbTransversalesActitudes] = useState([])
    const primero_sexto_transversales_actitud  = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]
    const septimo_octavo_transversales_actitud = [...septimo_octavo_basicoACT, ...septimo_octavo_basicoATA]
    const [objBasalesComplementarios, setObjBasalesComplementarios] = useState([])
    const [evaluationIndicators, setEvaluationIndicators] = useState([])
    const [userClassroom, setUserClassroom] = useState({})
    const [selectedIndicators, setSelectedIndicators] = useState([]);


    const evaluationArrayType = [
        {
            id: "formativa",
            label: "Formativa",
            value: "Formativa"
        },
        {
            id: "sumativa",
            label: "Sumativa",
            value: "Sumativa"
        }
    ]


    /**
     * FUNCIONES PARA ORDENAR DATA
     */
    const toggleDuration = () => {
        setNormalTime((e) => (e === "normalTime" ? "schoolTime" : "normalTime"));
    };
    const toggleDate = () => {
        setDayWeek((e) => (e === "day" ? "week" : "day"));
    };
    let handleColor = (time) => {
        return time.getHours() > 6 ? "text-green-800" : "text-red-800";
    };

    /**
     * PETICIONES Y UseEFFECTS
     */
    const fetchData = async () => {
        try {
            const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${id}`);
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
                        setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
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
                        setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
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
                        setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
                        break;
                    case "medio":
                        setObjBasalesComplementarios(dataTerceroBasico);
                        break;
                    default:
                        console.log("El nivel no se encontró");
                }
                break;
                case "4":
                    switch (userClassroom.level) {
                        case "basico":
                            setObjBasalesComplementarios(dataCuartoBasico);
                            setEvaluationIndicators(cuartoBasicoIndicadores);
                            setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
                            break;
                        case "medio":
                            setObjBasalesComplementarios(dataTerceroBasico);
                            break;
                        default:
                            console.log("El nivel no se encontró");
                    }
                    break;
                case "5":
                switch (userClassroom.level) {
                    case "basico":
                        setObjBasalesComplementarios(dataQuintoBasico);
                        setEvaluationIndicators(quintoBasicoIndicadores);
                        setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
                        break;
                    default:
                        console.log("El nivel no se encontró");
                }
                break;
                case "6":
                    switch (userClassroom.level) {
                        case "basico":
                            setObjBasalesComplementarios(dataSextoBasico);
                            setEvaluationIndicators(sextoBasicoIndicadores);
                            setOjbTransversalesActitudes(primero_sexto_transversales_actitud)
                            break;
                        default:
                            console.log("El nivel no se encontró");
                    }
                    break;
                    case "7":
                        switch (userClassroom.level) {
                            case "basico":
                                setObjBasalesComplementarios(dataSeptimoBasico);
                                setEvaluationIndicators(septimoBasicoIndicadores);
                                setOjbTransversalesActitudes(septimo_octavo_transversales_actitud)
                                break;
                                default:
                                    console.log("El nivel no se encontró");
                                    }
                                    break;
                    case "8":
                        switch (userClassroom.level) {
                            case "basico":
                                setObjBasalesComplementarios(dataOctavoBasico);
                                setEvaluationIndicators(octavoBasicoIndicadores);
                                setOjbTransversalesActitudes(septimo_octavo_transversales_actitud)
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

          console.log(indicatorsForEvaluateClass)
          
    }, [indicatorsForEvaluateClass])


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
    const animatedComponents = makeAnimated();
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer"
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
    
    const handleDeleteClassObjective = (item) => {
        setClassObjectives(classObjectives.filter(obj => obj.id !== item.id));
    }
    const handleDeleteIndicatorsEvaluation = (item) => {
        setIndicatorsForEvaluateClass(indicatorsForEvaluateClass.filter(obj => obj.id !== item.id))
        setSelectedIndicators(selectedIndicators.filter(obj => obj.id !== item.id))

    }
    
    const handleDeleteLearningObjectives = (item) => {
        setLearningObjetives(learningObjetives.filter(obj => obj.id !== item.id));
    }

    const addIndicatorsForEvaluateClassManual = () => {
        if (addExtraIndicator.trim() !== '') {
          const newIndicator = {
            id: uuidv4(),
            value: addExtraIndicator
          };
          setIndicatorsForEvaluateClassManual(prevState => [...prevState, newIndicator]);
          setAddExtraIndicator('');
        }
      };
      
      const handleDeleteIndicatorsForEvaluateClassManual = (index) => {
        setIndicatorsForEvaluateClassManual(prevState => {
          const newState = [...prevState];
          newState.splice(index, 1);
          return newState;
        });
      };
      const [progressIMG, setProgressIMG] = useState(0);
      const [isUploading, setIsUploading] = useState(false);
    
      const handleUploadFile = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
          setIsUploading(true);
          setQuizDoc(selectedImage);
    
          // Simulating file upload progress
          let progress = 0;
          const timer = setInterval(() => {
            progress += 25;
            setProgressIMG(progress);
            if (progress === 100) {
              clearInterval(timer);
              setIsUploading(false);
            }
          }, 250);
        }
      };


    /**
     * RENDERIZADO WEB
     */
    return (

        <div className="  overflow-x-auto min-h-[75vh] pt-5  ">           
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
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-24 ">{header}</th>))}
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
                                                   showTimeSelect={false}
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
                                                    required
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
                                                showTimeSelect={false}
                                                showDisabledMonthNavigation
                                                locale={es}
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                className="cursor-pointer p-1 border border-gray-300 rounded outline-none focus:bg-gray-50 text-center w-[5rem]"
                                                timeClassName={handleColor}
                                                dateFormat='dd/MM/yyyy'
                                                required
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </td>
                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-center rounded-lg min-h-[10rem]">
                                {
                                    normalTime === "normalTime" ? (
                                        <div className='rounded-lg' >
                                            <p>Minutos</p>
                                            <input
                                                type="number"
                                                min={10}
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                        </div>
                                    ) : (
                                        <div className='rounded-lg' >
                                            <p>Bloque/s</p>
                                            <input
                                                max={8}
                                                min={0}
                                                type="number"
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
                            {
                                classObjectives.length > 0 ? (<h2>Objetivos seleccionados</h2>) : (<h2>No hay objetivos seleccionados</h2>)
                            }
                        

{
    classObjectives.map((item) => (
        <div className='flex justify-between items-center py-2'>
            <p className='text-justify'>{item.label}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
            <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteClassObjective(item)}> <AiOutlineDelete size={12} /> </button>
        </div>
    ))
}
                            <div className="flex mt-2 flex-col items-center rounded-lg min-h-[8rem] w-[11rem]">
                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    isMulti
                                    options={objBasalesComplementarios}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
                                    onChange={(selected) => {
                                        const selectedValues = selected.map(option => ({ id: option.id, label:option.label, value: option.value }));
                                        setClassObjectives([...selectedValues]);
                                        dispatch(reload())
                                    }}
                                    value={classObjectives}
                                    backspaceRemovesValue={true}
                                />
                            </div>
                        </td>
                        <td className="border text-center">
                        {
    selectedIndicators.map((item) => (
        <div className='flex justify-between items-center p-2'>
            <p className='text-justify'>{item.value.substring(0, 50)}{item.value.length > 50 ? "..." : ""}</p>
            <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteIndicatorsEvaluation(item)}> <AiOutlineDelete size={12} /> </button>
        </div>
    ))
}
                            <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-[10rem] gap-2 ">
                                {
                                    filteredIndicators?.length > 0 ? (
                                        <Modalindicators title={"Ver Indicadores"} >
                                            <div>
                                                {
                                                    filteredIndicators.map((item) => {
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
                                <div className='' >
                                <h2 className=''>Ingresar indicadores de evaluación:</h2>
                                <div className="flex items-center border border-gray-300 rounded px-1 mt-1">
                                  <input
                                    placeholder='ingresar indicador de evaluación'
                                    type="text"
                                    value={addExtraIndicator}
                                    onChange={(e) => setAddExtraIndicator(e.target.value)}
                                    className="w-full p-1 mt-1 outline-none focus:bg-gray-100"
                                  />
                                  <MdPostAdd
                                    onClick={addIndicatorsForEvaluateClassManual}
                                    size={30}
                                    className="text-white cursor-pointer bg-teal-500 rounded-md m-1"
                                    aria-label='Agregar'
                                    title='Agregar'
                                  />
                                </div>
                                <ul className="mt-2 flex flex-col gap-2">
                                  {indicatorsForEvaluateClassManual?.map((indicator, index) => (
                                    <li key={indicator.id} className="flex items-center justify-between border-b text-gray-700">
                                      <span className="mr-2">{indicator.value}</span>
                                      <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteIndicatorsForEvaluateClassManual(index)}> <AiOutlineDelete size={12} /> </button>

                                    </li>
                                  ))}
                                </ul>
                                </div>
                            </div>
                        </td>
                        <td className="px-2 border text-center">
                        <h2>Objetivos de Aprendizaje</h2>

{
    learningObjetives.map((item) => (
        <div className='flex justify-between items-center py-2'>
            <p className='text-justify'>{item.id}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
            <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteLearningObjectives(item)}> <AiOutlineDelete size={12} /> </button>
        </div>
    ))
}
                            <div className="flex mt-2 flex-col items-center rounded-lg min-h-[8rem] w-[10rem]">
                                <Select
                                    closeMenuOnSelect={true}
                                    components={animatedComponents}
                                    isMulti
                                    options={ojbTransversalesActitudes}
                                    className='w-full font-thin'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
                                    onChange={(selectedTA) => {
                                        const selectedTransversalActitud = selectedTA.map(option => ({ id: option.id, label:option.label, value: option.value }));
                                        setLearningObjetives([...selectedTransversalActitud]);
                                    }}
                                    value={learningObjetives}
                                    backspaceRemovesValue={true}
                                />
                            </div>
                        </td>
                        <td className="py-3 px-2 border text-center">
                            <div className="flex flex-col items-cente rounded-lg min-h-[8rem] w-[9rem]">
                                <textarea
                                    value={activities}
                                    onChange={(e) => setActivities(e.target.value)}
                                    className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] "
                                    spellCheck={true} />
                            </div>
                        </td>
                        <td className="px-2 border text-center">
                            <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-[12rem] gap-2 ">
                                <Select
                                    closeMenuOnSelect={true}
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
                                        const selectedValues = selected.map(option => ({value: option.value, id: option.id, label: option.label}));
                                        setMaterials([...selectedValues]);
                                    }}
                                    value={materials}
                                />
                                <div className="flex flex-col items-center rounded-lg h-[4rem] w-full">
                                    <p>Ingresar materiales</p>
                                    <textarea
                                        value={otherMaterials}
                                        onChange={(e) => setOtherMaterials(e.target.value)}
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

                                        <div className='flex flex-col gap-1 px-2 py-1 rounded w-full items-center justify-center' >
                                            {/* <AiOutlineFileText size={20} />
                                            <input className='w-full font-thin cursor-pointer' type="file" onChange={handleUploadFile} /> */}

                                            <label htmlFor="docOne" className="flex md:flex-col items-center p-2 gap-1 text-center h-[100%] rounded border border-gray-300 border-dashed  cursor-pointer hover:shadow-lg">
                                                <BsCloudUpload className="h-10 w-10 text-teal-700" />
                                                <div className="space-y-2">
                                                    <h4 className="font-semibold text-gray-700">Agregar Documento</h4>
                                                    <span className="text-xs text-gray-300">pdf/word</span>
                                                    {progressIMG === 100 && (
                                                        <div className="mt-2 text-xs text-green-500">Archivo cargado con éxito</div>
                                                    )}
                                                </div>
                                                <input type="file" id="docOne" name="docOne" hidden onChange={handleUploadFile} />
                                            </label>

                                            {isUploading && (
                                                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                                    <div className="absolute top-0 left-0 h-full bg-teal-500 rounded-full" style={{ width: `${progressIMG}%` }} />
                                                </div>
                                            )}

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
            <div className='flex bg-gray-50 hover:bg-gray-100 shadow-md border p-3 gap-2 justify-end w-[100%]'>
    <button className="btn-cancelar" onClick={handleClear}>
        Borrar
    </button>
    <button className="btn-guardar" onClick={handleCreatePlaning}>
        Guardar
    </button>
</div>
{isLoading && <LoadingModal title={'Creando planificación'} />}
        </div>
    )
}

