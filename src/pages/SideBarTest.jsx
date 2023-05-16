import React, { useState } from "react";
import { BiFilter,  BiAperture, BiX, BiSearch,  BiDoorOpen,  BiBookmarks,  BiChat, BiChevronDown,  BiBox,  } from "react-icons/bi";
import {Link } from 'react-router-dom'
import logoVM from '../assets/logoVMDark.png'
import {GrPlan} from 'react-icons/gr'
import { MdOutlineSchool } from 'react-icons/md'
import {BiHomeAlt2} from 'react-icons/bi'
import {VscOrganization} from 'react-icons/vsc'
import { RxPerson} from 'react-icons/rx'
import {HiOutlineBell} from 'react-icons/hi'
import {AiOutlineClose} from 'react-icons/ai'

export default function SideBarTest() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

            {/* <div className='fixed sm:w-[15%] md:w-[20rem] h-screen p-4 bg-white border-r-[1px] flex flex-col items-center justify-start ' >
            <div className='flex flex-col items-center' >
                <Link to={'/dashboard'} >
                    <div className=" text-white px-3 rounded-lg inline-block" >
                        <img src={logoVM}alt='logo-vitalmove' width={70} height={20} />
                    </div>
                </Link>
                <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
                <Link to={'/dashboard'}  >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[12rem] " >
                        <BiHomeAlt2 size={20} />
                        <h2>Home</h2> 
                    </div>
                </Link>
                <Link to={'/users'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[12rem] " >
                        <RxPerson size={20} />
                        <h2>Usuarios</h2> 
                    </div>
                </Link>
                <Link to={'/notifications'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg flex gap-5 w-[12rem]" >
                        <HiOutlineBell size={20} />
                        <h2>Notificaciones</h2> 
                    </div>
                </Link>
                <Link to={'/institutions'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg flex gap-5 w-[12rem]" >
                        <VscOrganization size={20} />
                        <h2>Instituciones</h2> 
                    </div>
                </Link>
                <Link to={'/vmclass'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  mb-3 rounded-lg flex gap-5 w-[12rem]" >
                        <MdOutlineSchool size={20} />
                        <h2>Vm Class</h2> 
                    </div>
                </Link>
                <Link to={'/planifications'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[12rem]" >
                        <GrPlan size={20} />
                        <h2>Planificación Educativa</h2> 
                    </div>
                </Link>
                <Link to={'/table'} >
                    <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-lg  flex gap-5 w-[12rem] " >
                        <GrPlan size={20} />
                        <h2>Tablero Planificación</h2> 
                    </div>
                </Link>

            </div>

        </div> */}


        
    return (
        <div className="relative">
            <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                onClick={toggleSidebar}
            >
                <BiFilter className="px-2 bg-indigo-800 rounded-md" />
            </span>
            <div
                className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-fit overflow-y-auto text-center bg-white border-r-[1px] ${isSidebarOpen ? "" : "hidden"
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
                {/* <div
                    className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
                >
                    <BiSearch className="text-sm" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                    />
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <BiDoorOpen />
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
                </div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <BiBookmarks />
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
                </div>
                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onClick={toggleDropdown}
                >
                    <BiChat />
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
                        <span className="text-sm" id="arrow">
                            <BiChevronDown className={`transform ${isDropdownOpen ? "rotate-180" : ""} duration-300`} />
                        </span>
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white">
                        <span className="text-[15px] ml-12 text-gray-200 font-bold">Inbox</span>
                    </div>
                )} */}
                <div className='flex flex-col items-center text-xs mx-5' >

                    <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
                    <Link to={'/dashboard'}  >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md  flex gap-5 w-[12rem] items-center  " >
                            <BiHomeAlt2 size={20} />
                            <h2>Home</h2>
                        </div>
                    </Link>
                    <Link to={'/users'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md  flex gap-5 w-[12rem] items-center " >
                            <RxPerson size={20} />
                            <h2>Usuarios</h2>
                        </div>
                    </Link>
                    <Link to={'/notifications'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md flex gap-5 w-[12rem] items-center " >
                            <HiOutlineBell size={20} />
                            <h2>Notificaciones</h2>
                        </div>
                    </Link>
                    <Link to={'/institutions'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md flex gap-5 w-[12rem] items-center " >
                            <VscOrganization size={20} />
                            <h2>Instituciones</h2>
                        </div>
                    </Link>
                    <Link to={'/vmclass'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  mb-3 rounded-md flex gap-5 w-[12rem] items-center " >
                            <MdOutlineSchool size={20} />
                            <h2>Vm Class</h2>
                        </div>
                    </Link>
                    <Link to={'/planifications'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md  flex gap-5 w-[12rem] items-center " >
                            <GrPlan size={20} />
                            <h2>Planificación Educativa</h2>
                        </div>
                    </Link>
                    <Link to={'/table'} >
                        <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 mb-3 rounded-md  flex gap-5 w-[12rem] items-center  " >
                            <GrPlan size={20} />
                            <h2>Tablero Planificación</h2>
                        </div>
                    </Link>
                    <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>

                </div>
                {/* <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <BiBox />
                    <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                </div> */}
            </div>
        </div>
    );
}


// export default function Sidebar({children}) {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);


//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };



//   return (
//       <div className='flex justify-between text-xs' >
//           <div className="relative ">
//               <span
//                   className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//                   onClick={toggleSidebar}
//               >
//                   <BiFilter className="px-2 bg-indigo-800 rounded-md" />
//               </span>
//               <div
//                   className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-fit overflow-y-auto text-center bg-white border-r-[1px] z-50 ${isSidebarOpen ? "" : "hidden"
//                       }`}
//               >
//                   <div className="text-gray-100 text-xs">
//                       <div className="p-2.5 mt-1 flex items-center">
//                           <Link to={'/dashboard'} >
//                               <img src={logoVM} alt='logo-vitalmove' width={70} height={20} className="mx-20" />
//                           </Link>
//                           <AiOutlineClose
//                               className="cursor-pointer text-gray-400 self-start md:hidden" size={20}
//                               onClick={toggleSidebar}
//                           />
//                       </div>
//                   </div>
//                   <div className='flex flex-col items-center text-xs mx-5 gap-2' >
//                       <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
//                       <Link to={'/dashboard'}  >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  rounded-md  flex gap-5 w-[12rem] items-center  " >
//                               <BiHomeAlt2 size={20} />
//                               <h2>Home</h2>
//                           </div>
//                       </Link>
//                       <Link to={'/users'} >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  rounded-md  flex gap-5 w-[12rem] items-center " >
//                               <RxPerson size={20} />
//                               <h2>Usuarios</h2>
//                           </div>
//                       </Link>
//                       <Link to={'/notifications'} >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  rounded-md flex gap-5 w-[12rem] items-center " >
//                               <HiOutlineBell size={20} />
//                               <h2>Notificaciones</h2>
//                           </div>
//                       </Link>
//                       <Link to={'/institutions'} >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  rounded-md flex gap-5 w-[12rem] items-center " >
//                               <VscOrganization size={20} />
//                               <h2>Instituciones</h2>
//                           </div>
//                       </Link>
//                       <Link to={'/vmclass'} >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3   rounded-md flex gap-5 w-[12rem] items-center " >
//                               <MdOutlineSchool size={20} />
//                               <h2>Vm Class</h2>
//                           </div>
//                       </Link>
//                       <Link to={'/planifications'} >
//                           <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3  rounded-md  flex gap-5 w-[12rem] items-center " >
//                               <GrPlan size={20} />
//                               <h2>Planificación Educativa</h2>
//                           </div>
//                       </Link>
//                       <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
//                   </div>

//               </div>
//           </div>
//           <main className=' md:ml-[16rem] z-0 w-full min-w-screen' > {children} </main>
//       </div>
//   )
// }

