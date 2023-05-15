// import React, { useState, useEffect } from 'react';

// const Countdown = ({ timeInMinutes }) => {
//   const [secondsLeft, setSecondsLeft] = useState(timeInMinutes * 60);
//   const [progress, setProgress] = useState(100);
//   const [intervalId, setIntervalId] = useState(null);

//   useEffect(() => {
//     if (intervalId && secondsLeft === 0) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   }, [intervalId, secondsLeft]);

//   useEffect(() => {
//     const newProgress = (secondsLeft / (timeInMinutes * 60)) * 100;
//     setProgress(newProgress);
//   }, [secondsLeft]);

//   const handleStart = () => {
//     if (!intervalId) {
//       const id = setInterval(() => {
//         setSecondsLeft((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//       setIntervalId(id);
//     }
//   };

//   const handlePause = () => {
//     if (intervalId) {
//       clearInterval(intervalId);
//       setIntervalId(null);
//     }
//   };

//   const minutes = Math.floor(secondsLeft / 60);
//   const seconds = secondsLeft % 60;
//   const progressRounded = Math.round(progress);

//   return (
//     <div className="flex flex-col items-center justify-center space-y-2">
//       <div className="relative w-64 h-4 bg-gray-300 rounded-full">
//         <div
//           className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
//           style={{ width: `${progress}%` }}
//         />
//         <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-white">
//           {progressRounded}%
//         </div>
//       </div>
//       <div className="text-3xl font-bold">
//         {minutes.toString().padStart(2, '0')}:
//         {seconds.toString().padStart(2, '0')}
//       </div>
//       <div className="space-x-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleStart}
//           disabled={intervalId !== null}
//         >
//           Iniciar
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded"
//           onClick={handlePause}
//           disabled={intervalId === null}
//         >
//           Pausar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Countdown;

import React, { useState, useEffect } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai'

const Countdown = ({ timeInMinutes }) => {
    const [secondsLeft, setSecondsLeft] = useState(timeInMinutes * 60);
    const [progress, setProgress] = useState(100);
    const [intervalId, setIntervalId] = useState(null);
    const [isTimeUp, setIsTimeUp] = useState(false);
    
    // eslint-disable-next-line
    const [isActive, setIsActive] = useState(true);
    console.log(isActive)

    useEffect(() => {
        const handleVisibilityChange = () => {
          setIsActive(!document.hidden);
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      }, []);

    useEffect(() => {
        if (intervalId && secondsLeft === 0) {
            clearInterval(intervalId);
            setIntervalId(null);
            setIsTimeUp(true);
        }
    }, [intervalId, secondsLeft]);

    useEffect(() => {
        const newProgress = (secondsLeft / (timeInMinutes * 60)) * 100;
        setProgress(newProgress);
        // eslint-disable-next-line
    }, [secondsLeft]);

    const handleStart = () => {
        if (!intervalId) {
            const id = setInterval(() => {
                setSecondsLeft((prevSeconds) => prevSeconds - 1);
            }, 1000);
            setIntervalId(id);
        }
    };

    const handlePause = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const progressRounded = Math.round(progress);

    useEffect(() => {
        if (isTimeUp) {
            const audio = new Audio('/bell.mp3');
            audio.play();
        }
    }, [isTimeUp]);

    return (
        <div className="flex flex-col items-center justify-center space-y-2  w-[25rem] p-5 rounded-md shadow-md">
            {isTimeUp && (
                <div className="font-bold text-indigo-400 text-center">
                    Se acabó el tiempo, clase finalizada
                </div>
            )}

            <div className="text-5xl font-bold text-gray-400">
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>
            <div className="relative w-64 h-4 bg-gray-300 rounded-full">
                <div
                    className="absolute top-0 left-0 h-full bg-teal-400 rounded-full"
                    style={{ width: `${progress}%` }}
                />
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-white">
                    {progressRounded}%
                </div>
            </div>
            <div className=" flex gap-4">
                <AiOutlinePlayCircle size={30} className='bg-green-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100' onClick={handleStart}
                    disabled={intervalId !== null} />
                <AiOutlinePauseCircle size={30} className='bg-blue-500 rounded-full text-white cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-100' onClick={handlePause}
                    disabled={intervalId === null} />
            </div>
        </div>
    );
};

export default Countdown;
