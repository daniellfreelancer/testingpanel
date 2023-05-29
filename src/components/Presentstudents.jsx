import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Presentstudents({ presentStudents }) {

    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="inline-block min-w-full overflow-hidden">
                        <table className="min-w-full leading-normal text-xs font-thin ">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Alumnno
                                    </th>

                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Pasos
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Latidos
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Calorías
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Asistencia
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin  text-gray-800 uppercase bg-white border-b border-gray-200 text-center"
                                    >
                                        Materiales de Aseo
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-sm font-thin text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                    >
                                        Justificación
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {presentStudents?.map((student) => (
                                    <tr key={student._id}>
                                        <td className="pl-3 pr-8 py-3 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">

                                                    <img
                                                        alt="profil"
                                                        src={`https://whale-app-qsx89.ondigitalocean.app/public/${student.imgUrl}`}
                                                        className="mx-auto object-cover rounded-full h-10 w-10"
                                                    />

                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {student.lastName}, {student.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-3 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                <CircularProgressbar className='rounded-full' value={student.size / 1.5} text={(student.size / 1.5).toFixed(0)} styles={{
                                                    root: { width: '2.5rem' },
                                                    path: {
                                                        stroke: '#14B8A6',
                                                    },
                                                    text: {
                                                        fontSize: '40px',
                                                    }

                                                }} />

                                            </p>
                                        </td>
                                        <td className="px-3 py-3 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                <CircularProgressbar className='rounded-full' value={student.size / 3.5} text={(student.size / 3.5).toFixed(0)} styles={{
                                                    root: { width: '2.5rem' },
                                                    path: {
                                                        stroke: '#10B981',
                                                    },
                                                    text: {
                                                        fontSize: '40px',
                                                    }

                                                }} />
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                <CircularProgressbar className='rounded-full' value={student.size / 2.5} text={(student.size / 2.5).toFixed(0)} styles={{
                                                    root: { width: '2.5rem' },
                                                    path: {
                                                        stroke: '#F97316',
                                                    },
                                                    text: {
                                                        fontSize: '40px',
                                                    }

                                                }} />
                                            </p>
                                        </td>
                                        <td className="px-3 py-3 text-sm bg-white border-b border-gray-200 text-center ">
                                            <span className={`relative inline-block px-3 py-1 font-normal leading-tight ${student.attendance === "true" ? 'text-green-900' : 'text-red-900'}`}>
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 ${student.attendance === "true" ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}
                                                ></span>
                                                <span className="relative">
                                                    {student.attendance === "true" ? "Asistió" : student.attendance === "false" ? "Ausente" : null}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-sm bg-white border-b border-gray-200 text-center ">
                                            <span className={`relative inline-block px-3 py-1 font-normal leading-tight ${student.toiletMaterials ? 'text-green-900' : 'text-red-900'}`}>
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 ${student.toiletMaterials ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}
                                                ></span>
                                                <span className="relative">
                                                    {student?.toiletMaterials === "true" ? "Sí" : student?.toiletMaterials === "false" ? "No" : null}
                                                </span>
                                            </span>
                                        </td>
                                        <td className="px-3 py-3 text-sm bg-white border-b border-gray-200 text-center">
                                            <span className={`relative inline-block px-3 py-1 font-normal leading-tight ${student?.attendanceJustification ? 'text-green-900' : 'text-red-900'}`}>
                                                <span
                                                    aria-hidden="true"
                                                    className={`absolute inset-0 ${student?.attendanceJustification ? 'bg-green-200' : 'bg-red-200'} rounded-full opacity-50`}
                                                ></span>
                                                <span className="relative">
                                                    {student?.attendanceJustification === "true" ? "Sí" : student?.attendanceJustification === "false" ? "No" : null}
                                                </span>
                                            </span>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )

}
