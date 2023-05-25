import React, { useEffect, useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
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
import { useParams } from "react-router";

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

export default function Clasroominfo({ userClassroom }) {
  const [members, setMembers] = useState({datasets: []});
  const [studentsGender, setStudentsGender] = useState({datasets: []});
  const [attendanceStudents, setAttendanceStudents] = useState({datasets: []})
  const [elapsedClassTime, setElapsedClassTime] = useState({datasets: []})
  const [memberOptions, setMemberOptions] = useState({});
  const [studentsGenderOptions, setStudentsGenderOptions] = useState({});
  const [attendaceOptions, setAttendaceOptions] = useState({})
  const [elapsedClassTimeOptions, setElapsedClassTimeOptions] = useState({})

  const [maleStudents, setMaleStudents] = useState([]);
  const [femaleStudents, setFemaleStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [noAttendance, setNoAttendance] = useState([])
  const [elapsedTime, setElapsedTime] = useState(null)

const months = [
    {label:'Febrero',
    value: 500
    },
    {label:'Marzo',
    value: 1600
    },
    {label:'Abril',
    value: 900
    },
    {label:'Mayo',
    value: elapsedTime
    },
     ]

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
    if (userClassroom && userClassroom.teacher && userClassroom.students) {
      let allTeachers = [
        ...userClassroom.teacher,
        ...userClassroom.teacherSubstitute,
      ];

      classifyStudents(userClassroom?.students);

      classifyStudentsByAttendance(userClassroom?.classHistory)
      sumElapsedClassTime(userClassroom?.classHistory)

      setMembers({
        labels: ["Profesores", "Estudiantes"],
        datasets: [
          {
            label: "Profesores",
            data: [allTeachers.length, 0],
            borderColor: "rgb(75, 85, 99)",
            backgroundColor: "#6366F1",
          },
          {
            label: "Estudiantes",
            data: [0, userClassroom.students.length],
            borderColor: "rgb(75, 85, 99)",
            backgroundColor: "#38B2AC",
          },
        ],
      });

      setStudentsGender({
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
      });

      setAttendanceStudents({
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
      });




    }

    setMemberOptions({
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Integrantes",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });

    setStudentsGenderOptions({
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Alumnnos",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
    setAttendaceOptions({
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Promedio Asistencia - Mayo ",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });

  }, [userClassroom]);

  useEffect(() => {
   
      const monthsArray = [
          { month: 'Enero', time: 600 },
          { month: 'Febrero',time: 900 },
          { month: 'Marzo', time: 1600 }, 
          { month: 'Abril', time: 700 }, 
          { month: 'Mayo', time: elapsedTime }, 
          {month:'Junio', time: 0},
          {month: 'Julio', time:0},
          {month: 'Agosto', time:0}, 
          {month:'Septiembre', time:0}, 
          {month:'Octubre', time:0}, 
          {month:'Noviembre', time:0}, 
          {month:'Diciembre', time:0}];
    
          const labels = monthsArray.map(item => item.month);
          const time = monthsArray.map(item => item.time);
    

          const chartData = {
            labels: labels,
            datasets: [
              {
                label: 'Tiempo en minutos',
                data: time,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false
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
          text: 'Tiempo efectivo en clase '
        }
      }
    };

    setElapsedClassTimeOptions(options);

  }, [elapsedTime])
  



  return (
    <div className="bg-white rounded-lg w-full border p-4 h-max">
      <div className="flex w-full pb-2 gap-2 items-center">
        <div className="bg-blue-100 rounded-lg p-3">
          <SiGoogleclassroom className="text-purple-800" />
        </div>
        <p className="text-2xl font-bold">
          Grado:{" "}
          {`${userClassroom?.grade}° ${
            userClassroom?.level === "basico" ? "Básico" : "Medio"
          }`}{" "}
          Sección: {userClassroom?.section}
        </p>
      </div>
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
    </div>
  );
}
