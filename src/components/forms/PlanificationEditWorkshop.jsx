import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from 'react-switch';
import axios from 'axios';
import materialsSchool from '../../data/materialsSchool';
import { reload } from '../../features/reloadSlice';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { BsCloudUpload } from 'react-icons/bs';
import LoadingModal from '../modal/LoadingModal';
import {  AiOutlineDelete } from 'react-icons/ai'
export default function PlanificationEditWorkshop({ idPlanner }) {

    const dispatch = useDispatch()


    const [startDate, setStartDate] = useState(new Date());                 //FECHA Y HORA DE INICIO
    const [endDate, setEndDate] = useState(null);                           //FECHA DE FIN
    const [duration, setDuration] = useState(null)                          //DURACIÓN EN MINUTOS
    const [schoolBlock, setSchoolBlock] = useState(null)                    //BLOQUES
    const [content, setContent] = useState("")                                //CONTENIDO
    const [learningObjetives, setLearningObjetives] = useState("")          //OBJ DE LA CLASE
    const [activities, setActivities] = useState("")                        //ACTIVIDADES
    const [materials, setMaterials] = useState([])                          //MATERIALES
    const [otherMaterials, setOtherMaterials] = useState("")                //OTROS MATERIALES
    const [quizDoc, setQuizDoc] = useState(null)                            //ARCHIVO
    const [isLoading, setIsLoading] = useState(false);
    const [progressIMG, setProgressIMG] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
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
            response.data.endDate !== null && response.data.endDate > response.data.startDate ? setEndDate(new Date(response.data.endDate)) : setEndDate(null)
            setContent(response.data.content)
            setActivities(response.data.activities)
            setLearningObjetives(response.data.learningObjectives)
            setStartDate(new Date(response.data.startDate))
           // setEndDate(new Date(response.data.endDate))
           
        response.data.endDate ? setEndDate(new Date(response.data.endDate)) : setEndDate(null)
          //  response.data.endDate ? console.log(response.data.endDate ) : console.log("sin endDate")
         
            setMaterials(response.data.materials)
            setOtherMaterials(response.data.otherMaterials)
            setQuizDoc(response.data.quiz)


        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
        console.log(endDate)
        // eslint-disable-next-line
    }, [reload]);

    async function handleEditPlaning() {

        Swal.fire({
            title: '¿Deseas actualizar?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Actualizar',
            denyButtonText: `No`,
            buttonsStyling: true,
            showLoaderOnConfirm:true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor:'#d33',
            showClass: {
              title: 'text-xs',
              confirmButton: 'text-green-500',
              denyButton: 'text-green-500',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                axios.patch(`https://whale-app-qsx89.ondigitalocean.app/workshop-planification/update/${idPlanner}`, {
                    startDate: startDate ? startDate.toISOString() : "",
                    endDate: endDate ? endDate.toISOString() : null,
                    duration: duration ? duration : 0,
                    schoolBlock: schoolBlock ? schoolBlock : 0,
                    content: content,
                    learningObjectives: learningObjetives,
                    activities: activities,
                    materials: materials,
                    otherMaterials: otherMaterials,
                    quiz: quizDoc
                }, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  }).then((response) => {
                    setIsLoading(false);
                   console.log(response)

                    if (response.data) {
                        Swal.fire({
                            text: response.data.message,
                            icon: "success",
                        });
                       
                    }

                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false);
                })

            } else if (result.isDenied) {
                Swal.fire('No se ha editado la planificación', '', 'info')
                
                dispatch(reload())
            }
        })



    }




    
    const toggleDuration = () => {
        setNormalTime((e) => (e === "normalTime" ? "schoolTime" : "normalTime"));
    };
    const toggleDate = () => {
        setDayWeek((e) => (e === "day" ? "week" : "day"));
    };

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
        "Objetivos",
        "Actividades",
        "Materiales",
        "Adjuntar detalle"
    ];

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

    const handleDeleteMaterials = (item) => {
        setMaterials(materials.filter(obj => obj.id !== item.id));
    }

    /**
     * BUSCAR LOS ID DE LOS MATERIALES YA SELECCIONADOS
     */
    const materialsIds = materials.map(obj => obj.id);

  return (
    <div className="  overflow-x-auto min-h-[75vh] pt-5  ">
    <table className="min-w-max w-full rounded-lg border my-4 ">
        <caption className="py-3 text-gray-600 border-t">Planificación: {userWorkshop.name}</caption>
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
                {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-[9rem] ">{header}</th>))}
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
                {/* CONTENIDO */}
                <td className="py-3 px-2 border text-center">
                    <div className="flex flex-col items-center rounded-lg min-h-[8rem] w-full">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " />
                    </div>
                </td>
                {/* OBJETIVOS */}
                <td className="px-2 border text-center">
                <div className="flex flex-col items-cente rounded-lg min-h-[8rem] w-full">
                        <textarea
                            value={learningObjetives}
                            onChange={(e) => setLearningObjetives(e.target.value)}
                            className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] "
                            spellCheck={true} />
                    </div>
                </td>
                {/* ACTIVIDADES */}
                <td className="py-3 px-2 border text-center">
                    <div className="flex flex-col items-cente rounded-lg min-h-[8rem] w-full">
                        <textarea
                            value={activities}
                            onChange={(e) => setActivities(e.target.value)}
                            className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] "
                            spellCheck={true} />
                    </div>
                </td>
                {/* MATERIALES */}
                <td className="px-2 border text-center">
                <h2>Materiales seleccionados</h2>

{
    materials.map((item) => (
        <div key={item.id} className='flex justify-between items-center py-2'>
            <p className='text-justify'>{item.value}</p>
            <button className='ml-2 px-2 py-1 bg-red-500 text-white rounded' onClick={() => handleDeleteMaterials(item)}> <AiOutlineDelete size={12} /> </button>
        </div>
    ))
}
                    <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-full gap-2 ">
                            
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
                                        const selectedValues = selected.map(option => ({value: option.value, id: option.id, label: option.label}));
                                        setMaterials([...selectedValues]);
                                    }}
                                    value={materials}
                                    backspaceRemovesValue={true}
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
                {/* ARCHIVOS */}
                <td className="py-3 px-2 text-justify border">
                    <div className="pt-1 flex flex-col items-center rounded-lg min-h-[8rem] w-full gap-2 ">



                                <div className='flex flex-col gap-1 px-2 py-1 rounded w-full items-center justify-center' >


                                    <label htmlFor="docOne" className="flex md:flex-col items-center p-2 gap-1 text-center h-[100%] rounded border border-gray-300 border-dashed  cursor-pointer hover:shadow-lg">
                                        <BsCloudUpload className="h-10 w-10 text-teal-700" />
                                        <div className="space-y-2">
                                            <h4 className="font-semibold text-gray-700">Actualizar Documento</h4>
                                            <span className="text-xs text-gray-300">pdf/word</span>
                                            {progressIMG === 100 && (
                                                <div className="mt-2 text-xs text-green-500">Archivo cargado con éxito</div>
                                            )}
                                        </div>
                                        <input type="file" id="docOne" name="docOne" hidden onChange={handleUploadFile}  />
                                    </label>

                                    {isUploading && (
                                        <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                            <div className="absolute top-0 left-0 h-full bg-teal-500 rounded-full" style={{ width: `${progressIMG}%` }} />
                                        </div>
                                    )}

                                </div>

                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <div className='flex bg-gray-50 hover:bg-gray-100 shadow-md border p-3 gap-2 justify-end w-[100%]'>

        <button className="btn-guardar" onClick={handleEditPlaning}>
            Actualizar
        </button>
    </div>
    {isLoading && <LoadingModal title={'Actualizando planificación'} />}
</div>
  )
}
