import {Link } from 'react-router-dom'
import React from 'react'
import { RxPerson} from 'react-icons/rx'
import {HiOutlineBell} from 'react-icons/hi'
import logoVM from '../assets/logoVMDark.png'
import {GrPlan} from 'react-icons/gr'
import { MdOutlineSchool } from 'react-icons/md'
import {BiHomeAlt2} from 'react-icons/bi'
import {VscOrganization} from 'react-icons/vsc'
import { BiFilter  } from "react-icons/bi";
import {AiOutlineClose} from 'react-icons/ai'
import { useState } from 'react'

const Sidebar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='flex justify-between text-xs'>
            <div className="relative">
                <span
                    className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                    onClick={toggleSidebar}
                >
                    <BiFilter className="px-2 bg-indigo-800 rounded-md" />
                </span>
                <div
                    className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-fit overflow-y-auto text-center bg-white border-r-[1px]  ${isSidebarOpen ? "" : "hidden"
                        }`}
                >
                    <div className="text-gray-100 text-xs">
                        <div className="p-2.5 mt-1 flex items-center">
                            <Link to={'/dashboard'} >
                                <img src={logoVM} alt='logo-vitalmove' width={70} height={20} className="mx-20" />
                            </Link>
                            <AiOutlineClose
                                className="cursor-pointer text-gray-400 self-start md:hidden" size={20}
                                onClick={toggleSidebar}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col items-center text-xs mx-5 gap-2' >
                        <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
                        <SidebarLink to={'/dashboard'} icon={<BiHomeAlt2 size={18} />} label="Home" />
                        <SidebarLink to={'/users'} icon={<RxPerson size={18} />} label="Usuarios" />
                        <SidebarLink to={'/notifications'} icon={<HiOutlineBell size={18} />} label="Notificaciones" />
                        <SidebarLink to={'/institutions'} icon={<VscOrganization size={18} />} label="Instituciones" />
                        <SidebarLink to={'/vmclass'} icon={<MdOutlineSchool size={18} />} label="Vm Class" />
                        <SidebarLink to={'/planifications'} icon={<GrPlan size={18} />} label="Planificación Educativa" />
                        <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5' > </span>
                    </div>
                </div>
            </div>
            <main className='md:ml-[16rem] z-0 w-full min-w-screen' > {children} </main>
        </div>
    );
};

const SidebarLink = ({ to, icon, label }) => (

    <Link to={to}>
        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 rounded-md flex gap-5 w-[12rem] items-center">
            {icon}
            <h2>{label}</h2>
        </div>
    </Link>
);
export default Sidebar;