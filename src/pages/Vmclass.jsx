import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import GoBackToButton from '../components/GoBackButton'
import { useParams } from 'react-router'
import { GiTeacher } from 'react-icons/gi'
import { BsPeopleFill, BsCalendarCheckFill, BsSendFill, BsSmartwatch, BsClock, BsCloudUpload, BsStopCircle, BsClockHistory } from 'react-icons/bs'
import axios from 'axios'
import Topcards from '../components/Topcards'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { AiOutlineFileText, AiOutlineDelete } from 'react-icons/ai'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlinePlayCircle, AiOutlinePauseCircle } from "react-icons/ai";
import { RiRestartLine } from "react-icons/ri";
import primero_sexto_basicoACT from '../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../data/primero_sexto_basicoATA'
import materialsSchool from '../data/materialsSchool';
import Modalindicators from '../components/modal/Modalindicators'
import dataPrimeroBasico from '../data/primeroBasicoABC'
import dataSegundoBasico from '../data/segundoBasicoABC'
import dataTerceroBasico from '../data/terceroBasicoABC'
import primeroBasicoIndicadores from '../data/primeroBasicoIndicadores'
import segundoBasicoIndicadores from '../data/segundoBasicoIndicadores'
import terceroBasicoIndicadores from '../data/terceroBasicoIndicadores'
import { MdSettingsBackupRestore, MdPostAdd } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiBookmarkAlt } from 'react-icons/bi';
import { useUpdatePlanificationMutation } from '../features/plannerAPI'
import { useDispatch } from 'react-redux'
import { reload } from '../features/reloadSlice'



const steps = [
  { label: 'Iniciar Clase', completed: true, img: GiTeacher },
  { label: 'Asistencia', completed: false, img: BsPeopleFill },
  { label: 'Actividades', completed: false, img: BsCalendarCheckFill },
  { label: 'Resumen', completed: false, img: BsSendFill },
  { label: 'Fin Clase', completed: false, img: BsSendFill },
];

export default function Vmclass() {
  const { id } = useParams()

  const dispatch = useDispatch()

  /**
   * DATA Y STATES
   */
  const [currentStep, setCurrentStep] = useState(0);
  const [userClassroom, setuserClassroom] = useState([])
  const [teacher, setTeacher] = useState({})                                                  // PROFESOR
  const [currentActivity, setCurrentActivity] = useState(null);                               // PLANIFICACION DEL DIA
  const [planner, setPlanner] = useState([]);                                                 // SELECCIONAR LA FECHA DE PLANIFICACION, FILTRA Y RETORNA PLANIFICACION DEL DIA
  const [students, setStudents] = useState([])
  const [studentsOnClass, setStudentsOnClass] = useState(0);
  const [studentsOutClass, setStudentsOutClass] = useState(0);


  /**
* DATA DE PLANIFICACIÓN PARA ENVIAR A BASE DE DATOS
*/
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState(new Date());                                     //FECHA Y HORA DE INICIO
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState(null);                                               //FECHA DE FIN
  const [duration, setDuration] = useState()                                                  //DURACIÓN EN MINUTOS
  const [schoolBlock, setSchoolBlock] = useState()                                            //BLOQUES
  const [content, setContent] = useState()                                                    //CONTENIDO
  const [classObjectives, setClassObjectives] = useState([])                                  //OBJ BASALES Y COMPLEMENTARIOS
  const [indicatorsForEvaluateClass, setIndicatorsForEvaluateClass] = useState([])            //INDICADORES DEPENDIENTES DE OBJ BASALES/COMPLEMENTARIOS
  const [indicatorsForEvaluateClassManual, setIndicatorsForEvaluateClassManual] = useState("")//INDICADORES CARGA MANUAL POR EL PROFESOR
  const [learningObjetives, setLearningObjetives] = useState([])                              //OBJ TRANSVERSALES Y ACTITUDES
  const [activities, setActivities] = useState([])                                            //ACTIVIDADES
  const [materials, setMaterials] = useState([])                                              //MATERIALES
  const [otherMaterials, setOtherMaterials] = useState("")                                    //OTROS MATERIALES
  const [evaluationType, setEvaluationType] = useState([])                                    //TIPO DE EVALUACION
  const [addObservations, setAddObservations] = useState('');
  const [observationsList, setObservationsList] = useState([]);
  const [addExtraActivities, setAddExtraActivities] = useState('')
  const [extraActivitiesList, setExtraActivitiesList] = useState([])



  // eslint-disable-next-line
  const [startClassTime, setStartClassTime] = useState(null)
  // eslint-disable-next-line
  const [endClassTime, setendClassTime] = useState(null)

  /**
   * ESTADOS DE INFORMACION Y COMPONENTES
   */
  const [filteredIndicators, setFilteredIndicators] = useState([])
  const [normalTime, setNormalTime] = useState("normalTime")
  const ojbTransversalesActitudes = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]
  const [objBasalesComplementarios, setObjBasalesComplementarios] = useState([])
  const [evaluationIndicators, setEvaluationIndicators] = useState([])
  const [selectedIndicators, setSelectedIndicators] = useState([]);

  function handleNext() {
    setCurrentStep((prev) => prev + 1);
  }
  function handlePrevious() {
    setCurrentStep((prev) => prev - 1);
  }

  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  // eslint-disable-next-line
  const fecha = today.toLocaleDateString('es-ES', options);


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${id}`);


        console.log(data.response)
        setStudents(data.response.students)
        setuserClassroom(data.response)       // TENGO LA DATA DEL GRADO Y NIVEL 
        setTeacher(data.response.teacher[0])  // PROFESOR DEL SALON DE CLASE
        setPlanner(data.response.planner)     // PLANIFICACIONES
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // const today = new Date();
    // const todayLocalDateString = today.toLocaleDateString();
    // const current = planner.find(
    //   (activity) => {
    //     const startDate = new Date(activity.startDate);
    //     return startDate.toLocaleDateString() === todayLocalDateString;
    //   }
    // );

    const today = new Date();
    const todayLocalDateString = today.toLocaleDateString();
    const current = planner.find((activity) => {
      const startDate = new Date(activity.startDate);
      const endDate = new Date(activity.endDate);
      const isTodayOrLater = startDate <= today && endDate >= today;
      return startDate.toLocaleDateString() === todayLocalDateString || isTodayOrLater;
    });

    setCurrentActivity(current || null);
  
    if (current) {
      setContent(current.content);
      setClassObjectives(current.classObjectives);
      setIndicatorsForEvaluateClass(current.evaluationIndicators);
      setIndicatorsForEvaluateClassManual(current.evaluationIndicatorsTeacher);
      setActivities(current.activities);
      setLearningObjetives(current.learningObjectives);
      setMaterials(current.materials);
      setDuration(current.duration);
      current.duration > 8 ? setNormalTime("normalTime") : setNormalTime("schoolTime");
      setSchoolBlock(current.schoolBlock);
      setEvaluationType(current.evaluationType);
      setEvaluationIndicators(current.evaluationIndicators);
      setSelectedIndicators(current.evaluationIndicators);
      handleUserData();
    }
    console.log(current);
    // eslint-disable-next-line
  }, [planner]);
  



  useEffect(() => {
    const filteredEvaluationIndicators = filterEvaluationIndicatorsByClassObjectives(evaluationIndicators, classObjectives);
    if (filteredEvaluationIndicators.length > 0) {
      setFilteredIndicators(filteredEvaluationIndicators)
    }
    if (classObjectives.length === 0) {
      setFilteredIndicators([])
    }

  }, [evaluationIndicators, classObjectives])

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

  const handleDeleteClassObjective = (item) => {
    setClassObjectives(classObjectives.filter(obj => obj.id !== item.id));
  }

  const handleDeleteLearningObjectives = (item) => {
    setLearningObjetives(learningObjetives.filter(obj => obj.id !== item.id));
  }
  const handleDeleteMaterials = (item) => {
    setMaterials(materials.filter(obj => obj.id !== item.id));
  }

  /**
   * BUSCAR LOS ID DE LOS OBJETIVOS BASALES Y COMPLEMENTARIOS YA SELECCIONADOS
   */
  const classObjectivesIds = classObjectives.map(obj => obj.id);

  /**
   * BUSCAR LOS ID DE LOS OBJETIVOS TRANSVERSALES Y ACTITUDES YA SELECCIONADOS
   */
  const learningObjectivesIds = learningObjetives?.map(obj => obj.id);

  /**
   * BUSCAR LOS ID DE LOS MATERIALES YA SELECCIONADOS
   */
  const materialsIds = materials.map(obj => obj.id);


  /**
   * VER
   */
  // eslint-disable-next-line
  const filteredIndicatorsArray = filteredIndicators.filter(indicator =>
    indicatorsForEvaluateClass.includes(indicator.indicators[0])
  );



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

  /**
* FUNCIONES PARA ORDENAR DATA
*/

  function filterEvaluationIndicatorsByClassObjectives(evaluationIndicators, classObjectives) {
    const selectedIds = classObjectives.map(obj => obj.id);
    return evaluationIndicators.filter(indicator => selectedIds.includes(indicator.id));
  }

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

  const evaluationCriteriaArray = [
    {
      id:"destacado",
      label: "Destacado (4 puntos)",
      value:4
    },
    {
      id:"competente",
      label: "Competente (3 puntos)",
      value:3
    },
    {
      id:"basico",
      label: "Basico (2 puntos)",
      value:2
    },
    {
      id:"necesita_mejorar",
      label: "Necesita mejorar (1 punto)",
      value:1
    }
  ]




  const [noPresentStudents, setNoPresentStudents] = useState([])


  // eslint-disable-next-line
  function handleToggleAttendance(student) {
    if (isPresent(student)) {
      return;
    }
    setPresentStudents([...presentStudents, student]);
    setNoPresentStudents(
      noPresentStudents.filter((noPresentStudent) => noPresentStudent._id !== student._id)
    );
  }
  // eslint-disable-next-line
  function handleRemoveAttendance(student) {
    if (!isPresent(student)) {
      return; // Si el estudiante no está presente, no hacemos nada
    }
    setNoPresentStudents([...noPresentStudents, student]);
    setPresentStudents(
      presentStudents.filter((presentStudent) => presentStudent._id !== student._id)
    );
  }

  const isPresent = (student) => presentStudents.some((s) => s._id === student._id);


  const [presentStudents, setPresentStudents] = useState([{
    _id: null,
    name: null,
    lastName: null,
    attendance: null,
    toiletMaterials: null,
    attendanceJustification: null
  }]);

  const addFieldsToPresentStudents = (students) => {
    const updatedPresentStudents = students.map((student) => ({
      ...student,
      _id: student._id || '',
      name: student.name || '',
      lastName: student.lastName || '',
      attendance: null,
      toiletMaterials: null,
      attendanceJustification: null,
    }));

    setPresentStudents(updatedPresentStudents);
  };

  useEffect(() => {
    addFieldsToPresentStudents(students);
    console.log(presentStudents)
  }, [currentActivity]);

  const [evaluationNotation, setEvaluationNotation] = useState([{
    id:null,
    value:null,
    evaluationCriteria:null
  }])

  const addFieldsToEvaluationNotation = (indicatorsForClass) => {

    const updatedEvaluationNotation = indicatorsForClass.map((indicator) => ({
      ...indicator,
      id: indicator.id || '',
      value: indicator.value || '',
      evaluationCriteria: indicator.evaluationCriteria || ''
      }));

      setEvaluationNotation(updatedEvaluationNotation);


  }

  useEffect(() => {

    addFieldsToEvaluationNotation(indicatorsForEvaluateClass)

  }, [indicatorsForEvaluateClass])
  






  const handleAttendanceToggle = (studentId, attendance) => {
    const updatedPresentStudents = presentStudents.map((student) => {
      if (student._id === studentId) {
        return {
          ...student,
          attendance,
        };
      } else {
        return student;
      }
    });

    setPresentStudents(updatedPresentStudents);
  };

  const handleToiletMaterialsToggle = (studentId, toiletMaterials) => {
    const updatedPresentStudents = presentStudents.map((student) => {
      if (student._id === studentId) {
        return {
          ...student,
          toiletMaterials,
        };
      } else {
        return student;
      }
    });

    setPresentStudents(updatedPresentStudents);
  };
  const handleAttendanceJustificationToggle = (studentId, attendanceJustification) => {
    const updatedPresentStudents = presentStudents.map((student) => {
      if (student._id === studentId) {
        return {
          ...student,
          attendanceJustification,
        };
      } else {
        return student;
      }
    });

    setPresentStudents(updatedPresentStudents);
  };

  const countAttendances = () => {
    let attended = 0;
    let notAttended = 0;

    presentStudents.forEach((student) => {
      if (student.attendance === true) {
        attended++;
      } else if (student.attendance === false) {
        notAttended++;
      }
    });

    return { attended, notAttended };
  }

  useEffect(() => {
    const { attended, notAttended } = countAttendances();
    setStudentsOnClass(attended);
    setStudentsOutClass(notAttended);
  }, [presentStudents]);

  const handleRestarAttendanceList = () => {
    setStudentsOnClass(0);
    setStudentsOutClass(0);
    addFieldsToPresentStudents(students);
  }


  /**
   * TIEMPO DE ACTIVIDAD EN CLASE
   */
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  let interval = null;


  useEffect(() => {


    if (isActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
      setStartClassTime(new Date())
    } else if (!isActive && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setElapsedTime(timer);
    setTimer(0);
    setendClassTime(new Date())
  };
  const handleResetTimer = () => {
    setTimer(0)
    setElapsedTime(0)
    setIsActive(false);
    setendClassTime(null)
    setStartClassTime(null)
  }

  const minutes = Math.floor(timer / 60);
  const seconds = timer - minutes * 60;
  const elapsedMinutes = Math.floor(elapsedTime / 60);
  const elapsedSeconds = elapsedTime - elapsedMinutes * 60;
  const progress = Math.min((elapsedTime / (90 * 60)) * 100, 100);
  const progressRounded = Math.round(progress);


  const [activityImage, setActivityImage] = useState(null);
  const [activityImageError, setActivityImageError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressIMG, setProgressIMG] = useState(0);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (!selectedImage) {
      alert("Debe seleccionar una imagen");
      return;
    }
    setActivityImage(selectedImage);
    setIsUploading(true);
    setProgressIMG(0);

    // Simulate upload progress
    const timer = setInterval(() => {
      setProgressIMG((prevProgress) => prevProgress + 10);
    }, 100);

    // Simulate upload completion
    setTimeout(() => {
      setIsUploading(false);
      clearInterval(timer);
      setProgressIMG(100);
    }, 1000);
  };

  useEffect(() => {
    if (activityImage && activityImage.size > 5000000) {
      setActivityImageError("La imagen no debe exceder 5MB");
    } else {
      setActivityImageError(null);
    }
  }, [activityImage]);

  const handleAddObservation = () => {
    if (addObservations !== '') {
      setObservationsList([...observationsList, addObservations]);
      setAddObservations('');
    }
  };

  const handleDeleteObservation = (index) => {
    const updatedList = [...observationsList];
    updatedList.splice(index, 1);
    setObservationsList(updatedList);
  };

  const handleAddExtraActivities = () => {
    if (addExtraActivities !== '') {
      setExtraActivitiesList([...extraActivitiesList, addExtraActivities]);
      setAddExtraActivities('');
    }
  };

  const handleDeleteExtraActivities = (index) => {
    const updatedList = [...extraActivitiesList];
    updatedList.splice(index, 1);
    setExtraActivitiesList(updatedList);
    };

    const [updatePlanification] = useUpdatePlanificationMutation()

        /**
     * ACTUALIZAR PLANIFICACIÓN
     */
  async function handleEditPlaning() {

    let planificationData = {
      classroom : id,
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
      evaluationType: evaluationType

    }

    const dataForUpdate = {
      idPlanner: currentActivity._id,
      ...planificationData
    }

    try {

      let response = await updatePlanification(dataForUpdate)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }

    
  }

  useEffect(() => {

    if (currentStep  === 1) {
      handleEditPlaning()
    }

  
  }, [currentStep])
  
  

  




  return (
    <Sidebar>
      <main className='bg-gray-200 min-h-screen min-w-screen' >
        <Header />
        <GoBackToButton />

        <Topcards students={userClassroom.students ? userClassroom.students.length : null} teacher={teacher} classroom={userClassroom} />
        <div className=" min-h full mx-4 bg-white shadow-lg rounded-md overflow-hidden">
          <div className=" mb-10">
            
            <div className="mx-4 p-2">
              <div className="flex items-center">
                <div className="flex items-center text-white relative">
                  <div className={`flex justify-center items-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 cursor-pointer ${currentStep === 0 ? 'bg-teal-600 border-teal-600 text-red shadow-lg' : 'border-gray-300 text-gray-500'}`}>
                    <GiTeacher size={24} onClick={() => setCurrentStep(0)} />
                  </div>
                  <p className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs  text-teal-600">Inicio</p>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 1 ? 'border-teal-600' : 'border-gray-300'}`}></div>

                <div className="flex items-center relative">
                  <div className={`flex justify-center cursor-pointer text-gray-500 items-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${currentStep === 1 ? 'border-teal-600 bg-teal-600 text-white shadow-lg' : 'border-gray-300'}`}>
                    <BsPeopleFill size={24} onClick={() => setCurrentStep(1)} />
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs   text-teal-600">Asistencia</div>
                </div>

                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 2 ? 'border-teal-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center text-gray-500 relative">
                  <div className={`flex justify-center cursor-pointer items-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${currentStep === 2 ? 'border-teal-600 bg-teal-600 text-white shadow-lg' : 'border-gray-300'}`}>
                    <BsCalendarCheckFill size={24} onClick={() => setCurrentStep(2)} />
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs   text-gray-500">Clase</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 3 ? 'border-teal-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center text-gray-500 relative">
                  <div className={`flex items-center cursor-pointer justify-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${currentStep === 3 ? 'border-teal-600 bg-teal-600 text-white shadow-lg' : 'border-gray-300'}`}>
                    <BiBookmarkAlt size={24} onClick={() => setCurrentStep(3)} />
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs   text-gray-500">Resumen</div>
                </div>
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${currentStep >= 4 ? 'border-teal-600' : 'border-gray-300'}`}></div>
                <div className="flex items-center text-gray-500 relative">
                  <div className={`flex items-center cursor-pointer justify-center rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${currentStep === 4 ? 'border-teal-600 bg-teal-600 text-white shadow-lg' : 'border-gray-300'}`}>
                    <BsSendFill size={24} onClick={() => setCurrentStep(4)} />
                  </div>
                  <div className="absolute top-0 -ml-10 text-center mt-12 w-32 text-xs   text-gray-500">Fin</div>
                </div>
              </div>
            </div>

            <div className="mt-4 px-4 py-2 min-h-[60vh] flex flex-col justify-between">
              {currentStep === 0 && (
                <div className="">
                  <div >
                    {currentActivity ? (
                      <div className='flex flex-wrap justify-between gap-1' >
                        <div className='w-[45%]'>
                          <div className='text-gray-700 min-h-[5rem] p-2 hover:bg-gray-100  rounded-lg cursor-pointer '>
                            <h2 className='underline '>Objetivos de la clase:</h2>
                            <textarea
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                          </div>
                          <div className='text-gray-700 min-h-[5rem] p-2 hover:bg-gray-100  rounded-lg cursor-pointer '>
                            <h2 className='underline '>Objetivos de aprendizaje Basales/Complementarios:</h2>

                            {
                              classObjectives.map((item) => (
                                <div className='flex justify-between items-center py-2'>
                                  <p className='text-justify'>{item.label}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
                                  <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteClassObjective(item)}> <AiOutlineDelete size={12} /> </button>
                                </div>
                              ))
                            }
                            <div className="flex mt-1 flex-col items-center rounded-lg w-full">
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
                                  const selectedValues = selected.map(option => ({ id: option.id, label: option.label, value: option.value }));
                                  setClassObjectives([...selectedValues]);
                                }}
                                value={classObjectives}
                                backspaceRemovesValue={true}
                              />
                            </div>
                          </div>
                          <div className='text-gray-700 min-h-[5rem] p-2 hover:bg-gray-100  rounded-lg cursor-pointer ' >

                            <div className='rounded-lg' >

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

                              <h2 className='underline mt-2 '>Indicadores de evaluacion:</h2>
                              {
                                indicatorsForEvaluateClass.map((item) => (
                                  <ul className='flex justify-between items-center list-disc w-full px-3'>
                                    <li className='text-justify border-b pb-1'>{item.value.substring(0, 80)}{item.value.length > 80 ? "..." : ""}</li>
                                  </ul>
                                ))
                              }
                              <h2 className='underline '>Ingresar indicadores de evaluación:</h2>
                              <textarea
                                value={indicatorsForEvaluateClassManual}
                                onChange={(e) => setIndicatorsForEvaluateClassManual(e.target.value)}
                                className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                            </div>
                          </div>
                          <div className='text-gray-700  p-2 hover:bg-gray-100  rounded-lg cursor-pointer '  >

                            {
                              normalTime === "normalTime" ? (
                                <div className='rounded-lg flex items-center gap-2 ' >
                                  <h3 className='underline'>Tiempo de clase:</h3>

                                  <input
                                    type="number"
                                    min={10}
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 w-[20%] " />
                                  <p>Minutos</p>
                                </div>
                              ) : (
                                <div className='rounded-lg flex items-center gap-2 ' >
                                  <h3 className='underline' >Tiempo de clase:</h3>

                                  <input
                                    type="number"
                                    max={8}
                                    min={0}
                                    value={schoolBlock}
                                    onChange={(e) => setSchoolBlock(e.target.value)}
                                    className="p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 w-[20%] " />
                                  <p>Bloque/s ({` ${schoolBlock * 45} minutos `}) </p>
                                </div>
                              )
                            }
                          </div>




                        </div>
                        <div className=' border '> </div>

                        <div className='w-[40%] h-full text-gray-700 divide-y divide-gray-100'>
                          <div className='text-gray-700 min-h-[5rem]  p-2 hover:bg-gray-100  rounded-lg cursor-pointer '>
                            <h2 className='underline' >Objetivos Transversales/Actitudes</h2>
                            {
                              learningObjetives.map((item) => (
                                <div className='flex justify-between items-center py-2'>
                                  <p className='text-justify'>{item.id}: {item.value.substring(0, 85)}{item.value.length > 100 ? "..." : ""}</p>
                                  <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteLearningObjectives(item)}> <AiOutlineDelete size={12} /> </button>
                                </div>
                              ))
                            }
                            <Select
                              closeMenuOnSelect={true}
                              components={animatedComponents}
                              isMulti
                              options={ojbTransversalesActitudes.filter(obj => !learningObjectivesIds?.includes(obj.id)).map(obj => ({ ...obj, isDisabled: false }))}
                              className='w-full font-thin'
                              styles={customStyles}
                              formatOptionLabel={formatOptionLabel}
                              placeholder='Selecciona un objetivo'
                              onChange={(selectedTA) => {
                                const selectedTransversalActitud = selectedTA.map(option => ({ id: option.id, label: option.label, value: option.value }));
                                setLearningObjetives([...selectedTransversalActitud]);
                              }}
                              value={learningObjetives}
                              backspaceRemovesValue={true}
                            />
                          </div>

                          <div className='text-gray-700 min-h-[5rem] p-2 hover:bg-gray-100  rounded-lg cursor-pointer'>
                            <h2 className='underline'>Materiales:</h2>
                            <div className='flex flex-wrap ' >
                              {
                                materials.map((item) => (
                                  <div key={item.id} className='flex justify-between items-center p-2 border-r'>
                                    <p className='text-justify'>{item.value}</p>
                                    <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteMaterials(item)}> <AiOutlineDelete size={12} /> </button>
                                  </div>
                                ))
                              }
                            </div>
                            <div className="pt-1 flex flex-col flex-initial rounded-lg  gap-2 ">

                              <Select
                                closeMenuOnSelect={true}
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
                                  const selectedValues = selected.map(option => ({ value: option.value, id: option.id, label: option.label }));
                                  setMaterials([...selectedValues]);
                                }}
                                value={materials}
                                backspaceRemovesValue={true}
                              />
                              <div className="flex flex-col rounded-lg w-full">
                                <h3 className='text-left underline' >Otros materiales:</h3>
                                <textarea
                                  value={otherMaterials}
                                  onChange={(e) => setOtherMaterials(e.target.value)}
                                  className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                              </div>
                            </div>
                          </div>
                          <div className='text-gray-700 min-h-[5rem] p-2 hover:bg-gray-100  rounded-lg cursor-pointer '>
                            <h2 className='underline ' >Actividades:</h2>
                            <textarea
                              value={activities}
                              onChange={(e) => setActivities(e.target.value)}
                              className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50  "
                            />
                          </div>


                          <div className='text-gray-700 min-h-[5rem]  p-2 hover:bg-gray-100  rounded-lg cursor-pointer' >
                            <h2 className='underline'>Tipo de evaluación</h2>
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

                                <div className='flex gap-2 border px-2 py-1 rounded ' >
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
                          </div>

                        </div>
                        <div className=' border '> </div>

                        <div className='p-2 text-gray-700 w-fit ' >
                          <h3 className='w-max' >Relojes disponibles:</h3>
                          <ul className='py-2 flex flex-col md:flex-row md:flex-wrap gap-2 w-fit' >
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-001' > <BsSmartwatch /> <p className='px-1'>RV-001</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-002' > <BsSmartwatch /> <p className='px-1'>RV-002</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-003' > <BsSmartwatch /> <p className='px-1'>RV-003</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-004' > <BsSmartwatch /> <p className='px-1'>RV-004</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-005' > <BsSmartwatch /> <p className='px-1'>RV-005</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-006' > <BsSmartwatch /> <p className='px-1'>RV-006</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-007' > <BsSmartwatch /> <p className='px-1'>RV-007</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-008' > <BsSmartwatch /> <p className='px-1'>RV-008</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100  p-1' aria-details='Pulsera RV-001' title='Pulsera RV-009' > <BsSmartwatch /> <p className='px-1'>RV-009</p> </li>
                            <li className='flex items-center cursor-pointer hover:bg-gray-100 p-1' aria-details='Pulsera RV-001' title='Pulsera RV-0010' > <BsSmartwatch /> <p className='px-1'>RV-0010</p> </li>

                          </ul>
                        </div>


                      </div>

                    ) : (
                      <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded" role="alert">
                        <p>No hay actividad programada para hoy</p>
                      </div>


                    )}
                  </div>



                </div>
              )}
              {currentStep === 1 && (
                <div className=" text-gray-700 px-4">

                  <div className='flex text-gray-500 gap-2' >
                    <p className=' px-3 py-2 shadow-md rounded-md flex gap-2 items-center'><BsClock size={20} /> 11 : 00 AM  </p>
                    <p className=' px-3 py-2 shadow-md rounded-md'>Presentes: {studentsOnClass} </p>
                    <p className=' px-3 py-2  shadow-md rounded-md'>Ausentes: {studentsOutClass} </p>
                    <p className=' px-3 py-2  shadow-md rounded-md ml-auto cursor-pointer hover:bg-gray-100'><RiRestartLine size={20} onClick={handleRestarAttendanceList} />  </p>
                  </div>

                  <div className="">
                    <h2 className="text-lg font-medium mt-4">Lista de Asistentes</h2>

                    <div className="flex gap-2 flex-wrap">
                      {presentStudents.map((student) => (
                        <div
                          key={student._id}
                          className="p-2 flex flex-col rounded-md shadow-md"
                        >
                          <div className="flex justify-between items-center gap-2 min-w-[10rem]">
                          <div className='shadow-md rounded-full w-8 h-8'>
          <img src={`https://whale-app-qsx89.ondigitalocean.app/public/${student.imgUrl}`} alt='img' className='w-full h-full object-cover rounded-full' />
        </div>
                            <h2 className=" font-medium min-w-[7rem] ">{`${student.lastName}, ${student.name}`}</h2>
                            {/* <p> {student.attendance ? 'Asistente' : student.attendance === false ? 'No asistente' : null} </p> */}

                            <div
                              className={`rounded-full flex items-center justify-center px-3 py-1 gap-2 shadow ${student.attendance ? 'bg-green-200' : student.attendance === false ? 'bg-red-200' : 'bg-white'
                                }`}
                            >
                              <p className='font-thin' >Asistencia:</p>
                              <AiOutlineCheckCircle
                                size={20}
                                className={`bg-green-500 rounded-full text-white cursor-pointer ${student.attendance && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleAttendanceToggle(student._id, true)}
                              />
                              <AiOutlineCloseCircle
                                size={20}
                                className={`bg-red-500 rounded-full text-white cursor-pointer ${!student.attendance && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleAttendanceToggle(student._id, false)}
                              />
                            </div>

                            <div
                              className={`rounded-full flex items-center justify-center px-3 py-1 gap-2 shadow ${student.toiletMaterials ? 'bg-green-200' : student.toiletMaterials === false ? 'bg-red-200' : 'bg-white'
                                }`}
                            >
                              {/* <p> {student.toiletMaterials ? 'si' : student.toiletMaterials === false ? 'No' : null} </p> */}
                              <p className='font-thin'>Materiales de aseo:</p>
                              <AiOutlineCheckCircle
                                size={20}
                                className={`bg-green-500 rounded-full text-white cursor-pointer ${student.toiletMaterials && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleToiletMaterialsToggle(student._id, true)}
                              />
                              <AiOutlineCloseCircle
                                size={20}
                                className={`bg-red-500 rounded-full text-white cursor-pointer ${!student.toiletMaterials && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleToiletMaterialsToggle(student._id, false)}
                              />
                            </div>
                            <div
                              className={`rounded-full flex items-center justify-center px-3 py-1 gap-2 shadow ${student.attendanceJustification ? 'bg-green-200' : student.attendanceJustification === false ? 'bg-red-200' : 'bg-white'
                                }`}
                            >
                              {/* <p> {student.attendanceJustification ? 'si' : student.attendanceJustification === false ? 'No' : null} </p> */}
                              <p className='font-thin' >Justificacion:</p>
                              <AiOutlineCheckCircle
                                size={20}
                                className={`bg-green-500 rounded-full text-white cursor-pointer ${student.attendanceJustification && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleAttendanceJustificationToggle(student._id, true)}
                              />
                              <AiOutlineCloseCircle
                                size={20}
                                className={`bg-red-500 rounded-full text-white cursor-pointer ${!student.attendanceJustification && 'bg-opacity-50'
                                  }`}
                                onClick={() => handleAttendanceJustificationToggle(student._id, false)}
                              />
                            </div>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>




                </div>
              )}
              {currentStep === 2 && (
                <div className="flex flex-wrap justify-evenly gap-4 md:justify-around md:gap-2 md:px-1">
                  <div className="min-h-[10rem] w-[25rem] p-2 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    <h2 className="underline text-gray-600">Actividades</h2>
                    <textarea
                      value={activities}
                      onChange={(e) => setActivities(e.target.value)}
                      className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-fit"
                      disabled
                    />

                    <h2 className="underline text-gray-600 mt-1">Agregar Actividades Extra</h2>
                    <div className="flex items-center border border-gray-300 rounded px-1 mt-1">
                      <input
                        placeholder='ingresar actividad'
                        type="text"
                        value={addExtraActivities}
                        onChange={(e) => setAddExtraActivities(e.target.value)}
                        className="w-full p-1 mt-1  outline-none focus:bg-gray-100"
                      />
                      <MdPostAdd
                        onClick={handleAddExtraActivities}
                        size={30}
                        className="text-white cursor-pointer bg-teal-500 rounded-md m-1"
                        aria-label='Agregar' title='Agregar'
                      />
                    </div>
                    <ul className="mt-2 flex flex-col gap-2">
                      {extraActivitiesList.map((activityExtra, index) => (
                        <li key={index} className="flex items-center justify-between border-b text-gray-700">
                          <span className="mr-2">{activityExtra}</span>
                          <RiDeleteBin6Line
                            className="text-red-500 cursor-pointer" size={15}
                            onClick={() => handleDeleteExtraActivities(index)}
                          />
                        </li>
                      ))}
                    </ul>


                  </div>

                  <div className="min-h-[10rem] w-[25rem] p-2 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    <h2 className="underline text-gray-600">Agregar Observaciones</h2>
                    <div className="flex items-center border border-gray-300 rounded px-1 mt-1">
                      <input
                        placeholder='ingresar observacion'
                        type="text"
                        value={addObservations}
                        onChange={(e) => setAddObservations(e.target.value)}
                        className="w-full p-1 mt-1  outline-none focus:bg-gray-100"
                      />
                      <MdPostAdd
                        onClick={handleAddObservation}
                        size={30}
                        className="text-white cursor-pointer bg-teal-500 rounded-md m-1"
                        aria-label='Agregar' title='Agregar'
                      />
                    </div>
                    <ul className="mt-2 flex flex-col gap-2">
                      {observationsList.map((observation, index) => (
                        <li key={index} className="flex items-center justify-between border-b text-gray-700">
                          <span className="mr-2">{observation}</span>
                          <RiDeleteBin6Line
                            className="text-red-500 cursor-pointer" size={15}
                            onClick={() => handleDeleteObservation(index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="min-h-[10rem] w-[25rem] p-2 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    <label for="doc" className="flex items-center p-4 gap-3 rounded-md border border-gray-300 border-dashed  cursor-pointer h-full">
                      <BsCloudUpload className="h-16 w-16 text-teal-700 " />
                      <div className="space-y-2">
                        <h4 className="text-base font-semibold text-gray-700">Agregar Foto</h4>
                        <span className="text-xs text-gray-300">png/jpg</span>
                        {progressIMG === 100 && (
                          <div className="mt-2 text-sm text-green-500">Imagen cargada con éxito</div>
                        )}
                        {activityImageError && <span className="text-red-400">{activityImageError}</span>}
                      </div>
                      <input type="file" id="doc" name="doc" accept="png, jpg" hidden onChange={handleImageChange} />
                    </label>
                    {isUploading && (
                      <div className="relative w-full h-2 mt-4 bg-gray-200 rounded-full">
                        <div className="absolute top-0 left-0 h-full bg-teal-500 rounded-full" style={{ width: `${progressIMG}%` }} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center justify-center   w-[25rem] p-2 rounded-md shadow-md md:w-[45%]">
                    <div className='flex justify-center gap-2 items-center'>
                      <h2 className="text-lg text-gray-700 text-center">Tiempo efectivo de clase:</h2>
                      {elapsedTime > 0 && timer === 0 && (
                        <div className="text-lg font-bold text-gray-400 text-center">
                          {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')}
                        </div>
                      )}
                    </div>

                    <div className="text-5xl font-bold text-gray-400 mb-2">
                      {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="flex items-center gap-4">
                      <AiOutlinePlayCircle
                        size={30}
                        className='bg-green-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100'
                        onClick={handleStart}
                      />
                      <AiOutlinePauseCircle
                        size={30}
                        className='bg-blue-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100'
                        onClick={handlePause}
                        disabled={interval === null}
                      />
                      {
                        timer !== 0 ? (
                          <BsStopCircle
                            size={30}
                            className='bg-red-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-10
                            active:scale-100'
                            onClick={handleReset}
                          />
                        ) : null
                      }
                      {
                        timer >= 0 || interval !== null ? (
                          <MdSettingsBackupRestore
                            size={30}
                            className='bg-blue-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100'
                            onClick={handleResetTimer}
                          />
                        ) : null
                      }
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="px-4 flex flex-wrap justify-evenly gap-4 md:justify-around md:gap-2 md:px-1">
                  <div className="min-h-[10rem] w-[25rem] p-2 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    <h2 className="underline text-gray-600">Actividades</h2>
                    <textarea
                      value={activities}
                      onChange={(e) => setActivities(e.target.value)}
                      className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-fit"
                      disabled
                    />

<h2 className="underline text-gray-600">Actividades Extra</h2>
                    {extraActivitiesList.length === 0 ? (
                      <h3 className="text-gray-500">No hay actividades extra</h3>
                    ) : (
                      <ul className="mt-2 flex flex-col gap-2">
                        {extraActivitiesList.map((activityExtra, index) => (
                          <li key={index} className="flex items-center justify-between border-b text-gray-700">
                            <span className="mr-2">{activityExtra}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                  </div>

                  <div className="min-h-[10rem] w-[25rem] p-2 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    <h2 className="underline text-gray-600">Observaciones</h2>
                    {observationsList.length === 0 ? (
                      <h3 className="text-gray-500">No hay observaciones</h3>
                    ) : (
                      <ul className="mt-2 flex flex-col gap-2">
                        {observationsList.map((observation, index) => (
                          <li key={index} className="flex items-center justify-between border-b text-gray-700">
                            <span className="mr-2">{observation}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="min-h-[10rem] w-[25rem] p-3 hover:bg-gray-100 rounded-md cursor-pointer shadow-md md:w-[45%]">
                    {!activityImage ? (
                      <h3 className="text-gray-500">No hay imagen adjunta</h3>
                    ) : (
                      <div className="flex items-center justify-center">
                        <img
                          src={URL.createObjectURL(activityImage)}
                          alt="Foto de actividades"
                          className="w-[13rem] md:h-fit rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center hover:bg-gray-100 cursor-pointer justify-center w-[25rem] p-2 rounded-md shadow-md md:w-[45%]">
                    <BsClockHistory size={40} className="text-teal-700" />
                    {
                      elapsedTime === 0 ? (
                        <div className="flex justify-center gap-2 items-center">
                          <h2 className="text-lg text-gray-700 text-center">No hay tiempo de clase</h2>
                        </div>
                      ) : (
                        <div className="flex justify-center gap-2 items-center">
                          <h2 className="text-lg text-gray-700 text-center">Tiempo efectivo de clase:</h2>
                          {elapsedTime > 0 && timer === 0 ? (
                            <div className="text-lg font-bold text-gray-400 text-center">
                              {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')}
                            </div>
                          ) : null}
                        </div>
                      )
                    }
                  </div>
                </div>
              )}
                            {currentStep === 4 && (
                <div className="px-4 flex flex-wrap justify-between md:justify-around md:gap-2 md:px-1">

                  <div className=' flex flex-col p-4 gap-4 w-[48%]'>

                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >

                      <h2 className='underline pb-1'>Horario:</h2>
                      <p className=''> 11 : 00 am a 1:00 pm  </p>
                    </div>


                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                      <h2 className='underline pb-1'>Asistencia:</h2>
                      <p className=''>Alumnos asistentes: {studentsOnClass} </p>
                      <p className=''>Alumnos ausentes: {studentsOutClass} </p>
                    </div>


                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                      <h2 className='underline pb-1'>Objetivos de Aprendizaje Basales y Complementarios:</h2>
                      {
                        classObjectives.map((item) => (
                          <div className='flex justify-between items-center py-2'>
                            <p className='text-justify'>{item.label}: {item.value.substring(0, 120)}{item.value.length > 100 ? "..." : ""}</p>

                          </div>
                        ))
                      }
                    </div>

                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                      <h2 className='underline pb-1'>Objetivos de la clase:</h2>
                      {content}
                    </div>

                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                      <h2 className='underline pb-1'>Materiales:</h2>
                      {
                        materials.map((item) => (
                          <div key={item.id} className=''>
                            <p className='text-justify'>{item.value}</p>

                          </div>
                        ))
                      }
                      {otherMaterials}
                    </div>


                    <div>
                      {
                        elapsedTime === 0 ? (

                          <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                            <h2 className='underline pb-1'>No hay tiempo de clase:</h2>
                          </div>
                        ) : (
                          <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                            <h2 className='underline pb-1'>Tiempo efectivo de clase:</h2>
                            {elapsedMinutes.toString().padStart(2, '0')}:{elapsedSeconds.toString().padStart(2, '0')} Minutos
                          </div>
                        )
                      }

                    </div>

                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >
                      <h2 className='underline pb-1'>Tipo de evaluación:</h2>
                      {evaluationType}
                    </div>

                  </div>

                  <div className=' flex flex-col p-4 gap-4  w-[50%]'>

                    <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >

                      <h2 className='underline pb-1'>Actividades:</h2>
                      {activities}
                    </div>

                    {
                      extraActivitiesList.length > 0 ? (

                        <div className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >

                          <h2 className='underline pb-1'>Actividades Extra:</h2>
                          <ul className="mt-2 flex flex-col gap-2">
                            {extraActivitiesList.map((activityExtra, index) => (
                              <li key={index} className="flex items-center justify-between border-b text-gray-700">
                                <span className="mr-2">{activityExtra}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null
                    }

                    {
                      evaluationNotation.map((item) => (

                        <div key={item.id} className='text-gray-600 border-teal-500 rounded p-2 border-l-4 h-fit shadow-lg cursor-pointer bg-gray-50' >

                          <h2 className='underline pb-1'>Indicador de evaluacion: {item.id} </h2>
                         <p className='pb-1'>{item.value}</p>
                          
                         <Select
                                closeMenuOnSelect={true}
                                components={animatedComponents}
                                options={evaluationCriteriaArray}
                                className='w-full font-thin'
                                styles={customStyles}
                                formatOptionLabel={formatOptionLabel}
                                placeholder='selecciona un criterio de evaluación'

                                value={evaluationCriteriaArray.find((option) => option.value === item.evaluationCriteria)}
                                onChange={(selectedOption) => {
                                  const selectedCriteria = selectedOption ? selectedOption.value : null;
                                  const updatedNotation = evaluationNotation.map((notationItem) =>
                                    notationItem.id === item.id ? { ...notationItem, evaluationCriteria: selectedCriteria } : notationItem
                                  );
                                  setEvaluationNotation(updatedNotation);
                                }}
                                backspaceRemovesValue={true}
                              />

                         

                          
                        </div>
                      ))
                    }




                  </div>

                </div>
              )}
              {
                currentActivity ? (
                  <div className="mt-4 flex justify-end">
                    {currentStep > 0 && (
                      <button
                        type="button"
                        className="text-base  focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
      hover:bg-gray-200
      bg-gray-100
      text-gray-700
      border duration-200 ease-in-out
      border-gray-600 transition"
                        onClick={handlePrevious}
                      >
                        Atrás
                      </button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <button
                        type="button"
                        className="text-base  ml-2 hover:text-gray-50  focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
      hover:bg-teal-600
      bg-teal-600
      text-teal-100
      border duration-200 ease-in-out
      border-teal-600 transition"
                        onClick={handleNext}
                      >
                        Continuar
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="text-base  ml-2 hover:text-gray-50 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer
      hover:bg-teal-600
      bg-teal-600
      text-teal-100
      border duration-200 ease-in-out
      border-teal-600 transition"
                      >
                        Finalizar clase
                      </button>
                    )}
                  </div>
                ) : (
                  null
                )
              }


            </div>
          </div>
        </div>
      </main>
    </Sidebar>
  )
}
