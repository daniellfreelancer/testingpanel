import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
import axios from 'axios';
import Teachers from '../components/Teachers';
import InstitutionInfo from '../components/InstitutionInfo';
import Schools from '../components/Schools';
import GoBackToButton from '../components/GoBackButton';
import UserPrograms from '../components/UserPrograms';
import ScrollToTopOnRender from '../layout/ScrollToTopOnRender';

export default function InstitutionDetail() {
    const { id } = useParams();
    // eslint-disable-next-line
    const reloaded = useSelector(reloadValueState)
    const [usersData, setUsersData] = useState([])
    const [usersAdmin, setUsersAdmin] = useState([])
    const [userPrograms, setUserPrograms] = useState([])
    const [userSchools, setUserSchools] = useState([])

    const [userTeachersData, setUserTeachersData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/insti/find/${id}`);
            setUsersData(data.response);
            setUsersAdmin(data.response.admins[0]);
            setUserPrograms(data.response.programs);
            setUserSchools(data.response.schools);
            setUserTeachersData(data.response.teachers);
           
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
         // eslint-disable-next-line
      }, [reloaded]);
      

    return (
        <Sidebar>
          <ScrollToTopOnRender/>
            <main className='bg-gray-200 min-h-screen w-fit pl-2 py-2' >
                <Header />
                <GoBackToButton/>

                    <div className='w-full border rounded-lg overflow-y-auto' >
                        <div className='flex justify-between flex-wrap gap-2' >
                            <InstitutionInfo usersData={usersData} usersAdmin={usersAdmin} />
                            <Schools userSchools={userSchools} />
                            <UserPrograms userPrograms={userPrograms} />
                            <Teachers userTeachersData={userTeachersData} />
                        </div>
                    </div>
            </main>
        </Sidebar>
    )
}