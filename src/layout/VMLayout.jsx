import { Link } from 'react-router-dom'
import React from 'react'
import { RxPerson } from 'react-icons/rx'
// eslint-disable-next-line
import { HiOutlineBell } from 'react-icons/hi'
import logoVM from '../assets/logoVMDark.png'
// eslint-disable-next-line
import { GrPlan } from 'react-icons/gr'
// eslint-disable-next-line
import { MdOutlineSchool } from 'react-icons/md'
import { BiHomeAlt2, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'
import { useState } from 'react'
import UserLogout from '../components/UserLogout'
import HeaderLogo from '../components/HeaderLogo'
import { useSelector } from 'react-redux'
import { adminValue } from '../features/userApi'


const SidebarLink = ({ to, icon, text }) => {
    return (
        <Link to={to} aria-details={text} title={text}>
            <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md flex gap-5 w-[12rem] items-center">
                {icon}
                <h2>{text}</h2>
            </div>
        </Link>
    );
};

const SidebarLinkColapsed = ({ to, icon, text }) => {
    return (
        <Link to={to} aria-details={text} title={text} >
            <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md flex gap-5 items-center">
                {icon}

            </div>
        </Link>
    );
};

export default function VMLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const adminPanel = useSelector(adminValue);

    const showButton = adminPanel?.email?.endsWith('@gmail.com');

    const toggleClosedSidebar = () => {
        setIsSidebarOpen(false);
    };

    const tooggleOpenSidebar = () => {
        setIsSidebarOpen(true);
    }

    return (
        <>
            <div className='flex justify-between text-xs bg-gray-200'>
                <div className="relative  ">
                    {isSidebarOpen ? (<div
                        className={`top-0 left-0 right-0 bottom-0 sticky lg:w-[16rem] p-2 overflow-y-auto text-center border-r-[1px] bg-white h-full `}
                    >
                        <div className="text-gray-100 text-xs">
                            <div className="p-2.5 mt-1 flex items-center justify-around">
                                <img
                                    src={logoVM}
                                    alt="logo-vitalmove"
                                    width={70}
                                    height={20}
                                    className="ml-12"
                                    aria-details="VitalMove Panel"
                                    title="VitalMove Panel"
                                />
                                <BiArrowToLeft
                                    className="cursor-pointer text-gray-500 self-start hover:rounded-md hover:shadow-lg w-8 h-8 p-2 hover:border"
                                    size={20}
                                    onClick={toggleClosedSidebar}
                                    aria-details="Cerrar menú"
                                    title="Cerrar menú"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-xs mx-2">
                            <span className="border-b-[1px] border-gray-200 w-full p-2 mb-5" />

                            <SidebarLink to="/dashboard" icon={<BiHomeAlt2 size={20} />} text="Home" />

                            {
                                showButton && (
                                    <SidebarLink to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
                                )
                            }
                            {/* <SidebarLink to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" /> */}
                            <SidebarLink to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
                            {/* <SidebarLink to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" /> */}
                            {/* <SidebarLink to="/planifications" icon={<GrPlan size={20} />} text="Planificación educativa" /> */}
                            <span className="border-b-[1px] border-gray-200 w-full p-2" />
                        </div>

                        <div className="flex items-center rounded-md  duration-300 cursor-pointer justify-center">
                            <UserLogout />
                        </div>
                    </div>) : (
                        <div
                            className={`top-0 left-0 right-0 bottom-0 sticky w-[6rem] p-2 overflow-y-auto text-center border-r-[1px] bg-white h-full `}
                        >
                            <div className="text-gray-100 text-xs ">
                                <div className="p-2.5 mt-1 flex items-center justify-center flex-col gap-2">
                                    <img
                                        src={logoVM}
                                        alt="logo-vitalmove"
                                        width={50}
                                        className=""
                                        aria-details="VitalMove Panel"
                                        title="VitalMove Panel"
                                    />
                                    <BiArrowToRight
                                        className="cursor-pointer text-gray-500  hover:rounded-md hover:shadow-lg  hover:border"
                                        size={20}
                                        onClick={tooggleOpenSidebar}
                                        aria-details="Abrir menú"
                                        title="Abrir menú"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-xs mx-2">
                                <span className="border-b-[1px] border-gray-200 w-full p-2 mb-5" />

                                <SidebarLinkColapsed to="/dashboard" icon={<BiHomeAlt2 size={20} />} text="Home" />
                                {
                                showButton && (
                                    <SidebarLinkColapsed to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
                                )
                            }
                                
                                {/* <SidebarLinkColapsed to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" /> */}
                                <SidebarLinkColapsed to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
                                {/* <SidebarLinkColapsed to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" />
                            <SidebarLinkColapsed to="/planifications" icon={<GrPlan size={20} />} text="Planificación Educativa" /> */}

                                <span className="border-b-[1px] border-gray-200 w-full p-2" />
                            </div>


                        </div>
                    )}
                </div>
                <div className='bg-gray-200 w-full'>
                    <HeaderLogo />
                    <main className={`min-h-[100vh] flex-grow `}>
                        {children}
                    </main>

                </div>

            </div>
        </>
    );
};