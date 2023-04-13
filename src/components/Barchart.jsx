import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js'


ChartJS.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
)
export default function Barchart() {
    const [chartData, setChartData] = useState({
        datasets: []
    });

    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {{
        setChartData({
            labels:['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
            datasets: [
                {
                    label: 'Ventas $',
                    data: [18127,22201,19498,17938,24182,17842,22475],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgb(53,162,235, 8.4)'
                }
            ]
        })


        setChartOptions({
            plugins: {
                legend:{
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Daily Revenue'
                }
            },
            maintainAspectRatio : false,
            responsive: true
        })
    }

    }, [])
    
    
  return (
    <>
        <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto border rounded-lg  bg-white'>
            <Bar
                data={chartData}
                options={chartOptions}
            

            />
        </div>
    </>
  )
}
