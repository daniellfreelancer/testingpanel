import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Teachers from '../components/Teachers';
import Students from '../components/Students';
import Planificationinfo from '../components/Planificationinfo';
import {  useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
import Modalcreateplaning from '../components/modal/Modalcreateplaning';
import ScrollToTopOnRender from '../layout/ScrollToTopOnRender';
import { Link } from 'react-router-dom';
import ClasshistoryList from '../components/ClasshistoryList';
import Workshopinfo from '../components/Workshopinfo';
import axios from 'axios';
import PlanificationNewWorkshop from '../components/forms/PlanificationNewWorkshop';

export default function WorkshopDetail() {
    const { id } = useParams();

    const [userWorkshop, setuserWorkshop] = useState([])
    const [userTeachersData, setuserTeachersData] = useState([])
    const [userStudents, setUserStudents] = useState([])
    const [userPlanner, setUserPlanner] = useState([])
    const [userWorkshopClasshistory, setWorkshopClassHistory] = useState([])

    const reloaded = useSelector(reloadValueState)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/workshop/find/${id}`);
                setuserWorkshop(data.response)
                setuserTeachersData([...data.response.teacher, ...data.response.teacherSubstitute])
                setUserStudents(data.response?.students)
                setUserPlanner(data.response?.planner)
                setWorkshopClassHistory(data.response.workshopHistory)
            } catch (error) {
                console.log(error);
            } 
        };
        fetchData();
    }, [id, reloaded]);



  return (
    <>
    <main className='bg-gray-200 min-h-screen min-w-screen' >
        <ScrollToTopOnRender/>
        <div className='w-full m-auto p-4 border rounded-lg overflow-y-auto' >
            <div className='flex justify-between flex-wrap gap-2' >
                <div className=' bg-white flex gap-4 rounded-lg w-[100%] border p-4 '>
                    <Modalcreateplaning title={"Crear planificación"} >
                        <PlanificationNewWorkshop/>
                    </Modalcreateplaning>
                    <Link className='p-2 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-indigo-500 transform duration-300 ease-in-out ' to={`/vmclass/${id}`} >Iniciar Clase</Link>
                </div>
                <Workshopinfo userWorkshop={userWorkshop} />
                <Teachers userTeachersData={userTeachersData} />
                <Planificationinfo userPlanner={userPlanner} />
                <ClasshistoryList userClassHistory={userWorkshopClasshistory} />
                <Students userStudents={userStudents} title={"Participantes"} />
            </div>
        </div>
    </main>
</>
  )
}
