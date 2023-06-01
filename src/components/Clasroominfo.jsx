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
import Classroomstats from "./Classroomstats";

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
      <Classroomstats userClassroom={userClassroom} />
    </div>
  );
}
