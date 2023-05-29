import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import GoBackToButton from '../components/GoBackButton'
import { useParams } from 'react-router';
import Clasroominfo from '../components/Clasroominfo';
import axios from 'axios';
import Teachers from '../components/Teachers';
import Students from '../components/Students';
import Planificationinfo from '../components/Planificationinfo';
import { useDispatch, useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
// import { reload } from '../features/reloadSlice';
import Modalcreateplaning from '../components/modal/Modalcreateplaning';
import PlanificationNewTable from '../components/forms/PlanificationNewTable';
import ScrollToTopOnRender from '../layout/ScrollToTopOnRender';
import { Link } from 'react-router-dom';
import { useGetClassroomDataMutation } from '../features/classroomAPI';
import ClasshistoryList from '../components/ClasshistoryList';

export default function ClassroomDetail() {
    const { id } = useParams();

    const [userClassroom, setuserClassroom] = useState([])
    const [userTeachersData, setuserTeachersData] = useState([])
    const [userStudents, setUserStudents] = useState([])
    const [userPlanner, setUserPlanner] = useState([])
    const [userClasshistory, setUserClasshistory] = useState([])
// eslint-disable-next-line
    const dispatch = useDispatch()
    const reloaded = useSelector(reloadValueState)

    const [getClassroomDetail] = useGetClassroomDataMutation()

    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/classroom/find/${id}`);
            //     setuserClassroom(data.response)
            //     setuserTeachersData(data.response.teacher)
            //     setUserStudents(data.response.students)
            //     setUserPlanner(data.response.planner)
            // setUserClasshistory(data.response.classHistory)
            // } catch (error) {
            //     console.log(error);
            // }
            try {
                const { data } = await getClassroomDetail(id);
                setuserClassroom(data.response)
                setuserTeachersData(data.response.teacher)
                setUserStudents(data.response.students)
                setUserPlanner(data.response.planner)
                setUserClasshistory(data.response.classHistory)
            
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id, reloaded]);



    return (
        <Sidebar>
            <ScrollToTopOnRender/>
            <main className='bg-gray-200 min-h-screen min-w-screen' >
                <Header />
                <GoBackToButton />

                <div className='w-full m-auto p-4 border rounded-lg overflow-y-auto' >
                    <div className='flex justify-between flex-wrap gap-2' >
                        <div className=' bg-white flex gap-4 rounded-lg w-[100%] border p-4 '>
                            <Modalcreateplaning title={"Crear planificación"} >
                               <PlanificationNewTable/>
                            </Modalcreateplaning>
                            <Link className='p-2 rounded-md bg-blue-500 text-white font-medium cursor-pointer hover:bg-indigo-500 transform duration-300 ease-in-out ' to={`/vmclass/${id}`} >Iniciar Clase</Link>
                        </div>
                        <Clasroominfo userClassroom={userClassroom} />
                        
                        <Teachers userTeachersData={userTeachersData} />
                        <Planificationinfo userPlanner={userPlanner} />
                        <ClasshistoryList userClassHistory={userClasshistory} />+
                        <Students userStudents={userStudents} />
                    </div>
                </div>

            </main>
        </Sidebar>
    )
}
