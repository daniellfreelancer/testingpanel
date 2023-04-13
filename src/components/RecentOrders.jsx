import React from 'react'

import { data } from '../data/data'

import { FaShoppingBag } from 'react-icons/fa'

export default function RecentOrders() {
    return (

        <div className='w-full md:col-span-1 relative lg:h-[70vh] h-[50vh] m-autp border rounded-lg  bg-white overflow-scroll'>


            <h1 className='p-4' >Recent Orders</h1>
            <ul>
                {
                    data.map((order, id) => (
                        <li key={id} className=' p-2 m-3 bg-gray-50 hover:bg-gray-100 rounded-lg  flex items-center cursor-pointer' >
                            <div className='bg-purple-200 rounded-lg p-3'>
                                <FaShoppingBag className='text-purlple-800' />
                            </div>
                            <div className='pl-4 '>
                                <p className='text-gray-800 font-bold'> $ {order.total} </p>
                                <p className=' text-gray-400 text-sm'> {order.name.first} </p>
                            </div>
                            <p className='lg:flex md:hidden absolute  right-6 text-sm'> {order.date} </p>
                        </li>
                    )
                    )
                }
            </ul>

        </div>

    )
}
