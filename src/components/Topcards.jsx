import React from 'react'

export default function Topcards() {
    return (
        <div className='grid lg:grid-cols-6 gap-4 p-4' >
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded' >
                <div className='flex flex-col w-full pb-2' >
                    <p className='text-2xl font-bold ' >$7,846</p>
                    <p className='text-gray-600' >Daily Revenue</p>
                </div>
                <p className='bg-green-200 rounded flex justify-center items-center p-2'>
                    <span className='text-green-700 text-lg'>+18%</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded' >            <div className='flex flex-col w-full pb-2' >
                <p className='text-2xl font-bold ' >$17,846</p>
                <p className='text-gray-600'>YTD Revenue</p>
                
            </div>
            <p className='bg-green-200 rounded flex justify-center items-center p-2'>
                    <span className='text-green-700 text-lg'>+11%</span>
                </p>
            </div>
            <div className='lg:col-span-2 col-span-1 bg-white flex justify-between w-full border p-4 rounded' >            <div className='flex flex-col w-full pb-2' >
                <p className='text-2xl font-bold ' >11,846</p>
                <p className='text-gray-600'>Customer</p>
            </div>
            <p className='bg-green-200 rounded flex justify-center items-center p-2'>
                    <span className='text-green-700 text-lg'>+25%</span>
                </p>
            </div>


        </div>
    )
}
