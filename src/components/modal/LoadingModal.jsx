import React from 'react'
import vmLogo from '../../assets/logoVMDark.png'
export default function LoadingModal({title}) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-4 rounded-lg">
      
          <div className="flex justify-center flex-col items-center px-10">
          
          <img src={vmLogo} alt='logo-vm' className='w-[10rem]' />
            <div className="animate-spin rounded-full w-12 h-12 border-t-2 border-b-2 border-teal-900 border-solid">
               
            </div>
          </div>
          <div className="mt-4 text-center font-thin">{title}...</div>
  
        </div>
      </div>
    );
  };
