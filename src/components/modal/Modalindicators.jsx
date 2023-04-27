import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reload } from '../../features/reloadSlice';
import {AiOutlineEye} from 'react-icons/ai'
import Modal from 'react-modal';
export default function Modalindicators({children, title}) {
    const [modalIsOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    function openModal() {
        setIsOpen(true);
        dispatch(reload())
    }
    function closeModal() {
        setIsOpen(false);
        dispatch(reload())
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)"
        }


    };
  return (
      <div>
          <button className='flex bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-xs items-center px-4 py-1 text-white  text-center gap-2' onClick={openModal}>
              <AiOutlineEye size={20} className='text-gray-200 cursor-pointer mr-2' />
              <h3>{title}</h3>
          </button>
          <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Detalle de Indicadores"
          >
              {children}
              <button className="bg-red-500 mt-5 rounded hover:bg-white-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-white lg:max-w-[110px] w-full " onClick={closeModal}>Cerrar</button>
          </Modal>
      </div>
  )
}
