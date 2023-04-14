import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
import axios from 'axios';
import Students from '../components/Students';
import Teachers from '../components/Teachers';
import InstitutionInfo from '../components/InstitutionInfo';
import Schools from '../components/Schools';
import GoBackToInstitutions from '../components/GoBackToInstitutions';
import UserPrograms from '../components/UserPrograms';

export default function InstitutionDetail() {
    const { id } = useParams();
    // eslint-disable-next-line
    const reloaded = useSelector(reloadValueState)
    const [usersData, setUsersData] = useState([])
    const [usersAdmin, setUsersAdmin] = useState([])
    const [userPrograms, setUserPrograms] = useState([])
    const [userSchools, setUserSchools] = useState([])
    // eslint-disable-next-line
    const [userTeachers, setUserTeachers] = useState([])
    const [userStudents, setUserStudents] = useState([])
    const [userTeachersData, setUserTeachersData] = useState([])

    // useEffect(() => {
    //     axios.get('https://whale-app-qsx89.ondigitalocean.app/insti/find/' + id).then((res) => {
    //         console.log(res.data.response)
    //         setUsersData(res.data.response)
    //         setUsersAdmin(res.data.response.admins[0])
    //         setUserPrograms(res.data.response.programs)
    //         setUserSchools(res.data.response.schools)
    //         setUserTeachersData(res.data.response.teachers)
    //         let mySchool = res.data.response.schools
    //         mySchool ? mySchool.map(item => setUserTeachers(item.teachers)) : setUserTeachers([])
    //         mySchool ? mySchool.map(item => setUserStudents(item.students)) : setUserStudents([])
    //     }).catch((error) => {
    //         console.log(error);
    //     })
    // }, [id])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/insti/find/${id}`);
            setUsersData(data.response);
            setUsersAdmin(data.response.admins[0]);
            setUserPrograms(data.response.programs);
            setUserSchools(data.response.schools);
            setUserTeachersData(data.response.teachers);
            const mySchool = data.response.schools;
            mySchool ? mySchool.forEach(item => setUserTeachers(item.teachers)) : setUserTeachers([]);
            mySchool ? mySchool.forEach(item => setUserStudents(item.students)) : setUserStudents([]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);
      

    return (
        <Sidebar>
            <main className='bg-gray-200 min-h-screen min-w-screen' >
                <Header />
                <GoBackToInstitutions/>
                <div className='p-4'>
                    <div className='w-full m-auto p-4 border rounded-lg overflow-y-auto' >
                        <div className='flex justify-between flex-wrap gap-2' >
                            <InstitutionInfo usersData={usersData} usersAdmin={usersAdmin} />
                            <Schools userSchools={userSchools} />
                            <UserPrograms userPrograms={userPrograms} />
                            <Teachers userTeachersData={userTeachersData} />
                            <Students userStudents={userStudents} />
                        </div>
                    </div>
                </div>
            </main>
        </Sidebar>
    )
}