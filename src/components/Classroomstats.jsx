import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Filler,
);
export default function Classroomstats({ userClassroom }) {
    const [members, setMembers] = useState({ datasets: [] });
    const [studentsGender, setStudentsGender] = useState({ datasets: [] });
    const [attendanceStudents, setAttendanceStudents] = useState({ datasets: [] })
    const [elapsedClassTime, setElapsedClassTime] = useState({ datasets: [] })
    const [memberOptions, setMemberOptions] = useState({});
    const [studentsGenderOptions, setStudentsGenderOptions] = useState({});
    const [attendaceOptions, setAttendaceOptions] = useState({})
    const [elapsedClassTimeOptions, setElapsedClassTimeOptions] = useState({})
    const [maleStudents, setMaleStudents] = useState([]);
    const [femaleStudents, setFemaleStudents] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [noAttendance, setNoAttendance] = useState([])
    const [elapsedTime, setElapsedTime] = useState(null)
    const [allTeachers, setallTeachers] = useState([])




    const classifyStudents = (students) => {
        students.forEach((student) => {
            if (student.gender === "male") {
                setMaleStudents((prevMaleStudents) => [...prevMaleStudents, student]);
            } else if (student.gender === "female") {
                setFemaleStudents((prevFemaleStudents) => [
                    ...prevFemaleStudents,
                    student,
                ]);
            }
        });
    };


    const classifyStudentsByAttendance = (classHistory) => {
        classHistory.forEach((classItem) => {
            const { presentStudents } = classItem;
            if (presentStudents) {
                presentStudents.forEach((student) => {
                    if (student.attendance === "true") {
                        setAttendance((prevAttendance) => [...prevAttendance, student]);
                    } else if (student.attendance === "false") {
                        setNoAttendance((prevNoAttendance) => [...prevNoAttendance, student]);
                    }
                });
            }
        });
    };

    const sumElapsedClassTime = (classHistory) => {
        const totalElapsedClassTime = classHistory.reduce(
            (accumulator, currentClass) => accumulator + currentClass.elapsedClassTime,
            0
        );

        setElapsedTime(totalElapsedClassTime);
    };

    useEffect(() => {
        if (userClassroom && userClassroom.teacher){
            setallTeachers([
                ...userClassroom?.teacher,
                ...userClassroom?.teacherSubstitute,
              ]);
        
              classifyStudents(userClassroom?.students);
              classifyStudentsByAttendance(userClassroom?.classHistory)
              sumElapsedClassTime(userClassroom?.classHistory)
        }

    }, [userClassroom])
    
    useEffect(() => {
        const chartData = {
            labels: ["Profesores", "Estudiantes"],
            datasets: [
              {
                label: "Profesores",
                data: [allTeachers?.length, 0],
                borderColor: "rgb(75, 85, 99)",
                backgroundColor: "#6366F1",
              },
              {
                label: "Estudiantes",
                data: [0, userClassroom.students?.length],
                borderColor: "rgb(75, 85, 99)",
                backgroundColor: "#38B2AC",
              },
            ],
          };
        setMembers(chartData);
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Integrantes'
                }
            }
        };
        setMemberOptions(options);
         // eslint-disable-next-line
    }, [allTeachers])


    useEffect(() => {
        const monthChart = ([
            { month: 'Enero', time: 60 },
            { month: 'Febrero', time: 55 },
            { month: 'Marzo', time: 100 },
            { month: 'Abril', time: 45 },
            { month: 'Mayo', time: (elapsedTime / 60).toFixed(2) },
            { month: 'Junio', time: 0 },
            { month: 'Julio', time: 0 },
            { month: 'Agosto', time: 0 },
            { month: 'Septiembre', time: 0 },
            { month: 'Octubre', time: 0 },
            { month: 'Noviembre', time: 0 },
            { month: 'Diciembre', time: 0 }
        ])
    
        const labels = monthChart.map(item => item.month);
        const time = monthChart.map(item => item.time );
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Tiempo en minutos',
                    data: time,
                    borderColor: 'rgb(75, 192, 192)',
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    fill: true
                }
            ]
        };
        setElapsedClassTime(chartData);
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Tiempo efectivo en clase'
                }
            }
        };
        setElapsedClassTimeOptions(options);
        
    }, [elapsedTime])



    useEffect(() => {
        const chartData = {
            labels: ["Niñas", "Niños"],
            datasets: [
                {
                    label: "Niñas",
                    data: [femaleStudents.length, 0],
                    borderColor: "rgb(75, 85, 99)",
                    backgroundColor: "#6366F1",
                },
                {
                    label: "Niños",
                    data: [0, maleStudents.length],
                    borderColor: "rgb(75, 85, 99)",
                    backgroundColor: "#38B2AC",
                },
            ],
        };
        setStudentsGender(chartData);

        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Alumnnos'
                }
            }
        };
        setStudentsGenderOptions(options);
         // eslint-disable-next-line
    }, [userClassroom])

    useEffect(() => {
        const chartData = {
            labels: ["Asistentes", "Ausentes"],
            datasets: [
              {
                label: "Asistentes",
                data: [attendance.length, 0],
                borderColor: "rgb(75, 85, 99)",
                backgroundColor: "#6366F1",
              },
              {
                label: "Ausentes",
                data: [0, noAttendance.length],
                borderColor: "rgb(75, 85, 99)",
                backgroundColor: "#38B2AC",
              },
            ],
          };
        setAttendanceStudents(chartData);
        const options = {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Promedio Asistencia'
                }
            }
        };
        setAttendaceOptions(options);
         // eslint-disable-next-line
    }, [userClassroom])




    return (
        <div className="flex flex-wrap justify-between gap-2 p-4">
        <div className="h-[16rem] w-[45%]">
          <Bar
            data={members}
            options={memberOptions}
            className="cursor-pointer shadow-lg rounded-md p-2"
          />
        </div>
        <div className="h-[16rem]  w-[45%]">
          <Bar
            data={studentsGender}
            options={studentsGenderOptions}
            className="cursor-pointer shadow-lg rounded-md p-2"
          />
        </div>
        <div className="h-[16rem]  w-[45%]">
          <Bar
            data={attendanceStudents}
            options={attendaceOptions}
            className="cursor-pointer shadow-lg rounded-md p-2"
          />
        </div>
        <div className="h-[16rem]  w-[45%]">
          <Line
            data={elapsedClassTime}
            options={elapsedClassTimeOptions}
            className="cursor-pointer shadow-lg rounded-md p-2"
          />
        </div>

      </div>
    )
}
