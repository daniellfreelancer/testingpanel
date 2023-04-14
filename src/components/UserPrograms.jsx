import React from 'react';

const UserPrograms = ({ userPrograms }) => {
  return (
    <div className='lg:col-span-2 col-span-1 bg-white flex justify-between rounded-lg lg:w-[49.5%] md:w-full border p-4 '>
      <div className='flex flex-col w-full pb-2 gap-2'>
        <p className='text-2xl font-bold'>Programas:</p>
        {userPrograms.length === 0 ? (
          <p className='text-gray-600'>No tiene programas asignados</p>
        ) : (
          <p className='text-gray-600'>Si tiene programas asignados</p>
        )}
      </div>
    </div>
  );
};

export default UserPrograms;
