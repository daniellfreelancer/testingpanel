import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { reload } from '../../features/reloadSlice';
import {AiOutlineEdit} from 'react-icons/ai'
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
    <button className='flex items-center border rounded-lg px-2 py-1 bg-green-300'  onClick={openModal}>
    <AiOutlineEdit size={20} className='text-gray-400 cursor-pointer mr-2 hover:text-purple-800'/> 
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
