import {Link } from 'react-router-dom'
import React from 'react'
import { RxPerson} from 'react-icons/rx'
import {HiOutlineBell} from 'react-icons/hi'
import logoVM from '../assets/logoVMDark.png'
import {GrPlan} from 'react-icons/gr'
import { MdOutlineSchool } from 'react-icons/md'
import {BiHomeAlt2} from 'react-icons/bi'
import {VscOrganization} from 'react-icons/vsc'


export default function Sidebar({children}) {
  return (
    <div className='flex justify-between' >
        <div className='fixed sm:w-[15%] md:w-[20rem] h-screen p-4 bg-white border-r-[1px] flex flex-col items-center justify-start ' >
            <div className='flex flex-col items-center' >
                <Link to={'/dashboard'} >
                    <div className=" text-white p-3 rounded-lg inline-block" >
                        <img src={logoVM}alt='logo-vitalmove' width={20} height={20} />
                        {/* <RxSketchLogo size={20} /> */}
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
                <Link to={'/dashboard'}  >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[15rem] " >
                        <BiHomeAlt2 size={20} />
                        <h2>Home</h2> 
                    </div>
                </Link>
                <Link to={'/users'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[15rem] " >
                        <RxPerson size={20} />
                        <h2>Usuarios</h2> 
                    </div>
                </Link>
                <Link to={'/notifications'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg flex gap-5 w-[15rem]" >
                        <HiOutlineBell size={20} />
                        <h2>Notificaciones</h2> 
                    </div>
                </Link>
                <Link to={'/institutions'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg flex gap-5 w-[15rem]" >
                        <VscOrganization size={20} />
                        <h2>Instituciones</h2> 
                    </div>
                </Link>
                <Link to={'/vmclass'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  mb-3 rounded-lg flex gap-5 w-[15rem]" >
                        <MdOutlineSchool size={20} />
                        <h2>Vm Class</h2> 
                    </div>
                </Link>
                <Link to={'/planifications'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[15rem]" >
                        <GrPlan size={20} />
                        <h2>Planificación Educativa</h2> 
                    </div>
                </Link>
                <Link to={'/table'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[15rem] " >
                        <GrPlan size={20} />
                        <h2>Tablero Planificación</h2> 
                    </div>
                </Link>

            </div>

        </div>
       
        <main className=' ml-[20rem] w-full min-w-screen' > {children} </main>
    </div>
  )
}
