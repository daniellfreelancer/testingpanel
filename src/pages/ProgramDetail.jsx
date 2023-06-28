import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import Teachers from '../components/Teachers';
import ProgramInfo from '../components/ProgramInfo';
import Workshoplist from '../components/Workshoplist';
function ProgramDetail() {
    const { id } = useParams();

    const [infoProgram, setInfoProgram] = useState([])
    const [userTeachersData, setUserTeachersData] = useState([])
    const [userWorkshop, setUserWorkshop] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
          //  const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/school/find/${id}`);
            const { data } = await axios.get(`https://whale-app-qsx89.ondigitalocean.app/program/find/${id}`);
            setInfoProgram(data.response)
            setUserTeachersData(data.response.teachers);
            setUserWorkshop(data.response.workshops)

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

  return (
    <>
      <main className='bg-gray-200 min-h-screen w-full pl-2 py-2' >
        <div className='w-full border rounded-md overflow-y-auto' >
          <div className='flex justify-between flex-wrap gap-2' >
            <ProgramInfo infoProgram={infoProgram} />
            <Teachers userTeachersData={userTeachersData} />
            <Workshoplist userWorkshop={userWorkshop} />           
          </div>
        </div>

      </main>
    </>
  )
}

export default ProgramDetail
