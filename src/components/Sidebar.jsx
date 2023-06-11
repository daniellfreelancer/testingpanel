import { Link } from 'react-router-dom'
import React from 'react'
import { RxPerson } from 'react-icons/rx'
import { HiOutlineBell } from 'react-icons/hi'
import logoVM from '../assets/logoVMDark.png'
import { GrPlan } from 'react-icons/gr'
import { MdOutlineSchool } from 'react-icons/md'
import { BiHomeAlt2, BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'
import { VscOrganization } from 'react-icons/vsc'
import { useState } from 'react'
import UserLogout from './UserLogout'
// const Sidebar = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className='flex justify-between text-xs'>
//             <div className="relative">
//                 <span
//                     className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//                     onClick={toggleSidebar}
//                 >
//                     <BiFilter className="px-2 bg-indigo-800 rounded-md" />
//                 </span>
//                 <div
//                     className={`sidebar fixed top-0 bottom-0 lg:left-0  w-fit overflow-y-auto text-center bg-white border-r-[1px]  ${isSidebarOpen ? "" : "hidden"
//                         }`}
//                 >
//                     <div className="text-gray-100 text-xs">
//                         <div className="p-2.5 mt-1 flex items-center">
//                             <Link to={'/dashboard'} >
//                                 <img src={logoVM} alt='logo-vitalmove' width={70} height={20} className="mx-20" />
//                             </Link>
//                             <AiOutlineClose
//                                 className="cursor-pointer text-gray-400 self-start" size={20}
//                                 onClick={toggleSidebar}
//                             />
//                         </div>
//                     </div>
//                     <div className='flex flex-col items-center text-xs mx-5 gap-2' >
//                         <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5 ' > </span>
//                         <SidebarLink to={'/dashboard'} icon={<BiHomeAlt2 size={18} />} label="Home" />
//                         <SidebarLink to={'/users'} icon={<RxPerson size={18} />} label="Usuarios" />
//                         <SidebarLink to={'/notifications'} icon={<HiOutlineBell size={18} />} label="Notificaciones" />
//                         <SidebarLink to={'/institutions'} icon={<VscOrganization size={18} />} label="Instituciones" />
//                         <SidebarLink to={'/vmclass'} icon={<MdOutlineSchool size={18} />} label="Vm Class" />
//                         <SidebarLink to={'/planifications'} icon={<GrPlan size={18} />} label="Planificación Educativa" />
//                         <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5' > </span>
//                     </div>
//                 </div>
//             </div>
//             <main className='md:ml-[15rem] z-0 w-full min-w-screen' > {children} </main>
//         </div>
//     );
// };



// const Sidebar = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//       <div className='flex justify-between text-xs'>
//         <div className="relative">
//           <span
//             className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//             onClick={toggleSidebar}
//           >
//             <BiFilter className="px-2 bg-indigo-800 rounded-md" />
//           </span>
//           <div
//             className={`sidebar fixed top-0 bottom-0 lg:left-0 w-fit overflow-y-auto text-center border-r-[1px]  ${isSidebarOpen ? "" : "hidden"
//               }`}
//           >
//             <div className="text-gray-100 text-xs">
//               <div className="p-2.5 mt-1 flex items-center">
//                 <Link to={'/dashboard'}>
//                   <img src={logoVM} alt='logo-vitalmove' width={70} height={20} className="mx-20" />
//                 </Link>
//                 <AiOutlineClose
//                   className="cursor-pointer text-gray-400 self-start" size={20}
//                   onClick={toggleSidebar}
//                 />
//               </div>
//             </div>
//             <div className={`flex flex-col items-center text-xs mx-5 gap-2 ${isSidebarOpen ? "" : "hidden"
//               }`} >
//               <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5' > </span>
//               <SidebarLink to={'/dashboard'} icon={<BiHomeAlt2 size={18} />} label="Home" />
//               <SidebarLink to={'/users'} icon={<RxPerson size={18} />} label="Usuarios" />
//               <SidebarLink to={'/notifications'} icon={<HiOutlineBell size={18} />} label="Notificaciones" />
//               <SidebarLink to={'/institutions'} icon={<VscOrganization size={18} />} label="Instituciones" />
//               <SidebarLink to={'/vmclass'} icon={<MdOutlineSchool size={18} />} label="Vm Class" />
//               <SidebarLink to={'/planifications'} icon={<GrPlan size={18} />} label="Planificación Educativa" />
//               <span className='border-b-[1px] border-gray-200 w-full p-2 mb-5' > </span>
//             </div>
//           </div>
//         </div>
//         <main className={`md:ml-[15rem] z-0 w-full min-w-screen ${isSidebarOpen ? "" : "ml-0"
//           }`} > {children} </main>
//       </div>
//     );
//   };




// const SidebarLink = ({ to, icon, label }) => (

//     <Link to={to}>
//         <div className="bg-purple-200 hover:bg-gray-200 text-dark p-3 rounded-md flex gap-5 w-[12rem] items-center">
//             {icon}
//             <h2>{label}</h2>
//         </div>
//     </Link>
// );
// export default Sidebar;



// const Sidebar = ({children}) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//         <div className='flex justify-between text-xs'>
//       <div className="relative">
//         {!isSidebarOpen && (
//           <span
//             className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//             onClick={toggleSidebar}
//           >
//             <BsMenuDown className="px-2 bg-purple-900 rounded-md hover:shadow-xl" />
//           </span>
//         )}

//         <div
//           className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 lg:w-fit sm:w-[16rem] overflow-y-auto text-center  border-r-[1px] ${
//             isSidebarOpen ? '' : 'hidden'
//           }`}
//         >
//           <div className="text-gray-100 text-xs">
//             <div className="p-2.5 mt-1 flex items-center justify-around">
//               <img
//                 src={logoVM}
//                 alt="logo-vitalmove"
//                 width={70}
//                 height={20}
//                 className="ml-12"
//                 aria-details="VitalMove Panel"
//                 title="VitalMove Panel"
//               />
//               <AiOutlineClose
//                 className="cursor-pointer text-gray-500 self-start hover:rounded-md hover:shadow-lg w-8 h-8 p-2 hover:border"
//                 size={20}
//                 onClick={toggleSidebar}
//                 aria-details="Cerrar menú"
//                 title="Cerrar menú"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col items-center text-xs mx-2">
//             <span className="border-b-[1px] border-gray-200 w-full p-2 mb-5" />

//             <SidebarLink to="/dashboard" icon={<BiHomeAlt2 size={20} />} text="Home" />
//             <SidebarLink to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
//             <SidebarLink to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" />
//             <SidebarLink to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
//             <SidebarLink to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" />
//             <SidebarLink to="/planifications" icon={<GrPlan size={20} />} text="Planificación Educativa" />
//             <SidebarLink to="/table" icon={<GrPlan size={20} />} text="Tablero Planificación" />

//             <span className="border-b-[1px] border-gray-200 w-full p-2" />
//           </div>

//           <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer justify-center">
//             <Header />
//           </div>
//         </div>
//         </div>
//         <main className={`lg:ml-${isSidebarOpen ? '[14rem]' : 'auto'} sm:ml-${isSidebarOpen ? '[16rem]' : 'auto'} z-0 w-full min-w-screen`}>
//   {children}
// </main>
//       </div>
//     );


// };


// const Sidebar = ({ children }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     const toggleSidebar = () => {
//       setIsSidebarOpen(!isSidebarOpen);
//     };

//     return (
//       <div className="flex flex-col lg:flex-row">
//         <div className={`sidebar fixed top-0 left-0 lg:w-[16rem] sm:w-full h-full overflow-y-auto text-center ${isSidebarOpen ? '' : 'hidden'}`}>
//           <div className="text-gray-100 text-xs">
//             <div className="p-2.5 mt-1 flex items-center justify-around">
//               <img
//                 src={logoVM}
//                 alt="logo-vitalmove"
//                 width={70}
//                 height={20}
//                 className="ml-12"
//                 aria-details="VitalMove Panel"
//                 title="VitalMove Panel"
//               />
//               <AiOutlineClose
//                 className="cursor-pointer text-gray-500 self-start hover:rounded-md hover:shadow-lg w-8 h-8 p-2 hover:border"
//                 size={20}
//                 onClick={toggleSidebar}
//                 aria-details="Cerrar menú"
//                 title="Cerrar menú"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col items-center text-xs mx-2">
//             <span className="border-b-[1px] border-gray-200 w-full p-2 mb-5" />

//             <SidebarLink to="/dashboard" icon={<BiHomeAlt2 size={20} />} text="Home" />
//             <SidebarLink to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
//             <SidebarLink to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" />
//             <SidebarLink to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
//             <SidebarLink to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" />
//             <SidebarLink to="/planifications" icon={<GrPlan size={20} />} text="Planificación Educativa" />
//             <SidebarLink to="/table" icon={<GrPlan size={20} />} text="Tablero Planificación" />

//             <span className="border-b-[1px] border-gray-200 w-full p-2" />
//           </div>

//           <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer justify-center">
//             <Header />
//           </div>
//         </div>

//         <div className={`main ${isSidebarOpen ? 'lg:ml-[16rem] sm:ml-[16rem]' : 'lg:ml-0 sm:ml-0'} z-0 w-full min-w-screen`}>
//           <div className="relative">
//             {!isSidebarOpen && (
//               <span
//                 className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
//                 onClick={toggleSidebar}
//               >
//                 <BsMenuDown className="px-2 bg-purple-900 rounded-md hover:shadow-xl" />
//               </span>
//             )}

//             {children}
//           </div>
//         </div>
//       </div>
//     );
//   };

const Sidebar = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleClosedSidebar = () => {
        setIsSidebarOpen(false);
    };

    const tooggleOpenSidebar = () => {
        setIsSidebarOpen(true);
    }

    return (
        <div className='flex justify-between text-xs'>
            <div className="relative">
                {isSidebarOpen ? (<div
                    className={`top-0 left-0 right-0 bottom-0 sticky lg:w-[16rem] p-2 overflow-y-auto text-center border-r-[1px] bg-white `}
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
                        <SidebarLink to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
                        <SidebarLink to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" />
                        <SidebarLink to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
                        <SidebarLink to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" />
                        <SidebarLink to="/planifications" icon={<GrPlan size={20} />} text="Planificación Educativa" />
                        <SidebarLink to="/table" icon={<GrPlan size={20} />} text="Tablero Planificación" />

                        <span className="border-b-[1px] border-gray-200 w-full p-2" />
                    </div>

                    <div className="flex items-center rounded-md px-4 duration-300 cursor-pointer justify-center">
                        <UserLogout />
                    </div>
                </div>) : (
                    <div
                        className={`top-0 left-0 right-0 bottom-0 sticky w-[6rem] p-2 overflow-y-auto text-center border-r-[1px] bg-white `}
                    >
                        <div className="text-gray-100 text-xs ">
                            <div className="p-2.5 mt-1 flex items-center justify-center flex-col gap-2">
                                <img
                                    src={logoVM}
                                    alt="logo-vitalmove"
                                    width={35}
                                    className=""
                                    aria-details="VitalMove Panel"
                                    title="VitalMove Panel"
                                />
                                <BiArrowToRight
                                    className="cursor-pointer text-gray-500  hover:rounded-md hover:shadow-lg  w-10 h-10 p-2 hover:border"
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
                            <SidebarLinkColapsed to="/users" icon={<RxPerson size={20} />} text="Usuarios" />
                            <SidebarLinkColapsed to="/notifications" icon={<HiOutlineBell size={20} />} text="Notificaciones" />
                            <SidebarLinkColapsed to="/institutions" icon={<VscOrganization size={20} />} text="Instituciones" />
                            <SidebarLinkColapsed to="/vmclass" icon={<MdOutlineSchool size={20} />} text="Vm Class" />
                            <SidebarLinkColapsed to="/planifications" icon={<GrPlan size={20} />} text="Planificación Educativa" />
                            <SidebarLinkColapsed to="/table" icon={<GrPlan size={20} />} text="Tablero Planificación" />

                            <span className="border-b-[1px] border-gray-200 w-full p-2" />
                        </div>


                    </div>
                )}
            </div>
            <main className={`min-h-[100vh] flex-grow bg-gray-200`}>
                {children}
            </main>
        </div>
    );
};


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

export default Sidebar;