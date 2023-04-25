import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { reload } from '../../features/reloadSlice';
import swal from 'sweetalert2'

export default function PlanificationForm() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [duration, setDuration] = useState("")
    const [classObjectives, setClassObjectives] = useState("")
    const [learningObjetives, setLearningObjetives] = useState("")
    const [evaluationIndicators, setEvaluationIndicators] = useState("")
    const [skills, setSkills] = useState("")
    const [activities, setActivities] = useState("")
    const [materials, setMaterials] = useState("")
    const [evaluationType, setEvaluationType] = useState("")
    const [content, setContent] = useState("")
    const [userClassroom, setUserClassroom] = useState([])


    const dispatch = useDispatch()


    function handleClear(){
        setDuration("")
        setClassObjectives("")
        setLearningObjetives("")
        setEvaluationIndicators("")
        setSkills("")
        setActivities("")
        setMaterials("")
        setEvaluationType("");
        setContent("");
    }


    const {id} = useParams()

// eslint-disable-next-line


    function handleError(error) {
        if (error.response) {
          console.log('La solicitud no se pudo completar:', error.response);
          alert(`La solicitud no se pudo completar: ${error.response.data}`);
        } else if (error.request) {
          console.log('No se recibió respuesta del servidor:', error.request);
          alert('No se recibió respuesta del servidor. Por favor, inténtelo de nuevo más tarde.');
        } else {
          console.log('Ocurrió un error al procesar la solicitud:', error.message);
          alert(`Ocurrió un error al procesar la solicitud: ${error.message}`);
        }
      }
      

    async function handleCreatePlaning(){

        const durationAsNumber = parseInt(duration);

        let planificationObj = {
            classroom : id,
            date: selectedDate.toISOString(),
            duration: durationAsNumber,
            classObjectives: classObjectives,
            learningObjectives: learningObjetives,
            evaluationIndicators :evaluationIndicators,
            skills: skills,
            activities: activities,
            materials: materials,
            evaluationType: evaluationType,
            content: content
        }

        axios.post('https://whale-app-qsx89.ondigitalocean.app/planing/create', planificationObj)
        .then(response => {
          console.log('La solicitud POST se realizó con éxito:', response);
          dispatch(reload())

          if (response.data) {
            swal.fire({
                text: response.data.message,
                icon: "success",
              });
          }

          // Aquí puedes realizar cualquier otra acción que desees realizar después de una respuesta exitosa
        })
        .catch(handleError);

    }




    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${id}`);
           console.log(data)
           setUserClassroom(data.response)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
        // eslint-disable-next-line
      }, [reload]);





    return (

            <div className="bg-white rounded shadow py-2">
                <div className="lg:block">
                    <div className="px-7 header flex bg-white lg:justify-around md:justify-around justify-start py-[1rem] border-b-[2px] border-slate-100 flex-wrap gap-x-4 ">

                            <div className="pl-3 heading-container flex items-center ">
                                <p className="text-base font-medium leading-none text-slate-800 ">
                                    Planificacion Escolar 
                                </p>
                            </div>
                    </div>
                </div>
                <div className="mt-10 px-7">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-7 ">
                            <div>
                            <p className='text-base font-medium leading-none text-gray-800'>Salon de clase</p>
                            <input 
                            value={`${userClassroom?.grade}° ${userClassroom?.level === 'basico' ? 'Básico' : 'Medio'} Sección:  ${userClassroom?.section}`}  
                            disabled
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>

                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Fecha
                            </p>
                                     <DatePicker
                                     selected={selectedDate}
                                     onChange={(date) => setSelectedDate(date)}
                                     dateFormat="yyyy-MM-dd"
                                     className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                                 />
                        </div>
                    </div>
                </div>

                <div className="mt-10 px-7">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 mt-7 text-base font-medium leading-none text-gray-800">

                        <div>
                            <p>Duración</p>
                            <input 
                            value={duration} 
                            onChange={(e)=> setDuration(e.target.value) } 
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p>Objetivos de la clase</p>
                            <input 
                            value={classObjectives} 
                            onChange={(e)=> setClassObjectives(e.target.value) }  
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p>Objetivos de aprendizaje</p>
                            <input 
                            value={learningObjetives} 
                            onChange={(e)=> setLearningObjetives(e.target.value) }  
                            className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Indicadores de evaluación
                            </p>
                            <input value={evaluationIndicators} onChange={(e)=> setEvaluationIndicators(e.target.value) }  className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Habilidades
                            </p>
                            <input value={skills} onChange={(e)=> setSkills(e.target.value) }  className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Actividades
                            </p>
                            <input value={activities} onChange={(e)=> setActivities(e.target.value) }  className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                                Materiales
                            </p>
                            <input value={materials} onChange={(e)=> setMaterials(e.target.value) }  className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                        <div>
                            <p className="text-base font-medium leading-none text-gray-800">
                               Tipo de evaluación
                            </p>
                            <input value={evaluationType} onChange={(e)=> setEvaluationType(e.target.value) }  className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>

                    </div>
                    <div className='mt-4' >
                            <p className="text-base font-medium leading-none text-gray-800">
                                Contenido
                            </p>
                            <textarea value={content} onChange={(e)=> setContent(e.target.value) }   className="w-full min-h-[5rem] p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                        </div>
                </div>
                <hr className="h-[1px] bg-gray-100 my-5" />

                <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 pb-4 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                    <button onClick={handleClear} className="bg-white border-indigo-700 rounded hover:bg-gray-50 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-indigo-700 border lg:max-w-[110px]  w-full ">
                        Cancelar
                    </button>
                    <button onClick={handleCreatePlaning} className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-white lg:max-w-[110px] w-full ">
                        Guardar
                    </button>
                </div>



            </div>

    )
}

