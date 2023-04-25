import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import ReactSwitch from 'react-switch';
import axios from 'axios';
import materialsSchool from '../data/materialsSchool';
import dataPrimero from '../data/primeroBasicoABC'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import primero_sexto_basicoACT from '../data/primero_sexto_basicoACT';
import primero_sexto_basicoATA from '../data/primero_sexto_basicoATA'
import GoBackToButton from '../components/GoBackButton';


export default function Tableplanification() {
    const toggleDuration = () => {
        setNormalTime((e) => (e === "normalTime" ? "schoolTime" : "normalTime"));
    };
    const toggleDate = () => {
        setDayWeek((e) => (e === "day" ? "week" : "day"));
    };


    const [duration, setDuration] = useState(null)
    const [schoolBlock, setSchoolBlock] = useState(null)
    const [classObjectives, setClassObjectives] = useState("")
    const [learningObjetives, setLearningObjetives] = useState("")
    const [evaluationIndicators, setEvaluationIndicators] = useState("")
    const [skills, setSkills] = useState("")
    const [activities, setActivities] = useState("")
    const [materials, setMaterials] = useState("")
    const [evaluationType, setEvaluationType] = useState("")

    const [content, setContent] = useState()

    const [dayWeek, setDayWeek] = useState("day")
    const [normalTime, setNormalTime] = useState("normalTime")

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const [userClassroom, setUserClassroom] = useState({})
    const animatedComponents = makeAnimated();
    const ojbTransversalesActitudes = [...primero_sexto_basicoACT, ...primero_sexto_basicoATA]

    let handleColor = (time) => {
        return time.getHours() > 6 ? "text-green-800" : "text-red-800";
    };

    const idPlanner = "6436efc2dfa4f4062385fa6c"


    const fetchData = async () => {
        try {
            /**
             * classroom find by id
             */
            const response = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${idPlanner}`);

            console.log(response.data.response)
            setUserClassroom(response.data.response)
        } catch (error) {
            console.log(error);
        }
    };



    useEffect(() => {

        fetchData();
        // eslint-disable-next-line
    }, []);



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
        onChange:toggleDuration,
        checked:normalTime === "schoolTime",
        onColor:"#8bce75",
        onHandleColor:" rgb(67 56 202)",
        handleDiameter:10,
        uncheckedIcon:false,
        checkedIcon:false,
        boxShadow:"0px 1px 5px rgba(0, 0, 0, 0.6)",
        activeBoxShadow:"0px 0px 1px 10px rgba(0, 0, 0, 0.2)",
        height:20,
        width:35,
        className:"react-switch",
        id:"small-radius-switch",
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


    return (

        <div className="  overflow-x-auto min-h-[80vh] pt-5 m-2  ">

            <GoBackToButton />

            <table className="min-w-max w-full rounded-lg border ">
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
                                <ReactSwitch {...switchDurationProps}    />
                                <label>{normalTime === "normalTime" ? (<p>Normal</p>) : (<p>Escolar</p>)}</label>
                            </div>
                        </th>
                        {tableHeaders.map((header) => (<th key={header} className="py-3 px-3 text-center w-20 ">{header}</th>))}
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-xs">
                    <tr className="border-b border-gray-200 min-h-[55vh] ">
                        {/* <td className=" border py-3 px-2 text-center w-[7rem] ">
                            <div className="flex flex-col items-center bg-gray-100 rounded-lg min-h-[10rem]">

                                {
                                    dayWeek === "week" ? (
                                        <div className='flex flex-col items-center justify-center gap-2  bg-gray-100  rounded-lg pt-1' >

                                            <div className=' bg-gray-100 p-1 rounded-lg' >
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
                                            <div className='border border-gray-50 bg-gray-100 p-1 rounded-lg' >
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
                                    ) : (


                                        <div className=' bg-gray-100 p-2 rounded-lg flex flex-col items-center justify-center  ' >
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

                                    )
                                }

                            </div>
                        </td> */}

                        <td className=" border py-3 px-2 text-center w-[7rem] ">
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
                        </td>

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
                            <div className="flex flex-col items-cente rounded-lg min-h-[8rem] w-[9rem]">
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50 h-[7rem] " />
                            </div>
                        </td>

                        <td className="py-3 px-2 border text-center ">
                            <div className="flex items-center flex-col gap-5 justify-center rounded-lg w-[12rem] min-h-[10rem]">

                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={dataPrimero}
                                    className='w-full'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
                                />
                            </div>
                        </td>

                        <td className="py-3 px-2 border text-center">
                            <div className="flex items-center flex-col gap-5 justify-center rounded-lg w-[10rem] min-h-[10rem]">
                                <span className="py-1 rounded-full text-xs text-justify ">Ejecutan una sesión de ejercicios, considerando los principios de
                                    Frecuencia, intensidad y tiempo de duración y el tipo de ejercicio.
                                </span>
                            </div>
                        </td>
                        <td className="py-3 px-2 border text-center">
                            <div className="flex items-center flex-col gap-5 justify-center  rounded-lg w-[12rem] min-h-[10rem]">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={ojbTransversalesActitudes}
                                    className='w-full'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona un objetivo'
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
                        <td className="py-3 px-2 border text-center">
                            <div className="flex items-center flex-col gap-5 justify-center rounded-lg w-[12rem] min-h-[10rem]">
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={materialsSchool}
                                    className='w-full'
                                    styles={customStyles}
                                    formatOptionLabel={formatOptionLabel}
                                    placeholder='Selecciona...'
                                    onChange={(selectedOptions) => {
                                        const selectedValues = selectedOptions.map(option => option.value);
                                        setMaterials(prevMaterials => {
                                            // Si la opción seleccionada ya está en el array, se elimina del array.
                                            // De lo contrario, se agrega al array.
                                            return prevMaterials.includes(selectedValues[0])
                                                ? prevMaterials.filter(material => material !== selectedValues[0])
                                                : [...prevMaterials, selectedValues[0]];
                                        });
                                    }}
                                />

                                <div className='rounded-lg' >
                                    <p>otros</p>
                                    <input

                                        value={materials}
                                        onChange={(e) => setMaterials(e.target.value)}
                                        className="w-full p-1 mt-1 border border-gray-300 rounded outline-none focus:bg-gray-50" />
                                </div>
                            </div>
                        </td>
                        <td className="py-3 px-6 text-justify border">
                            <span className="py-1 rounded-full text-xs">Formativa </span>
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
