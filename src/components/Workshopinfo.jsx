import React from "react";
import { SiGoogleclassroom } from "react-icons/si";

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

// import Classroomstats from "./Classroomstats";

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

export default function Workshopinfo({userWorkshop}) {
  return (
    <div className="bg-white rounded-lg w-full border p-4 h-max">
      <div className="flex w-full pb-2 gap-2 items-center">
        <div className="bg-blue-100 rounded-lg p-3">
          <SiGoogleclassroom className="text-purple-800" />
        </div>
        <p className="text-2xl font-bold">
            {userWorkshop.name}
        </p>
      </div>
      {/* <Classroomstats userClassroom={userWorkshop} /> */}
    </div>
  )
}
