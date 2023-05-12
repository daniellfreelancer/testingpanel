import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { reloadValueState } from '../features/reloadSlice';
import axios from 'axios';
import GoBackToButton from '../components/GoBackButton';
import Schoolinfo from '../components/Schoolinfo';
import Teachers from '../components/Teachers';
import Classroomlist from '../components/Classroomlist';
import Students from '../components/Students';
import ScrollToTopOnRender from '../layout/ScrollToTopOnRender';


export default function SchoolDetail() {

    const { id } = useParams();
    // eslint-disable-next-line
    const reloaded = useSelector(reloadValueState)
    const [infoSchool, setInfoSchool] = useState([])
    const [userTeachersData, setUserTeachersData] = useState([])

    const [userClassroom, setUserClassroom] = useState([])
    const [userStudents, setUserStudents] = useState([])
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/school/find/${id}`);
           setInfoSchool(data.response)
           setUserTeachersData(data.response.teachers);
           setUserClassroom(data.response.classrooms)
           setUserStudents(data.response.students)
           console.log(data.response.students)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

  return (
      <Sidebar>
        <ScrollToTopOnRender/>
          <main className='bg-gray-200 min-h-screen min-w-screen' >
              <Header />
              <GoBackToButton />

              <div className=''>
                  <div className='w-full m-auto p-4 border rounded-lg overflow-y-auto' >
                      <div className='flex justify-between flex-wrap gap-2' >
                        <Schoolinfo infoSchool={infoSchool} />
                        <Teachers userTeachersData={userTeachersData}  />
                        <Classroomlist userClassroom={userClassroom} />
                        <Students userStudents={userStudents} />
                      </div>
                  </div>
              </div>
          </main>
      </Sidebar>
  )
}
