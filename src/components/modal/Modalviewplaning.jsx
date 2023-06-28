import React, { useState } from 'react'
import Modal from 'react-modal';
import {AiOutlineEye} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { reload } from '../../features/reloadSlice';

export default function Modalviewplaning({children}) {
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
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: 'auto',
          width: '95%',
          height: '90%',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          padding: '20px',
          background: '#fff',
          boxShadow: '0 0 20px rgba(0,0,0,0.2)'
        },
        overlay: {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }
      };


    Modal.setAppElement('#root');

    return (
        <>
            <AiOutlineEye onClick={openModal} size={20} className='text-gray-400 cursor-pointer mr-2 hover:text-purple-800' />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="ver planificación"
            >
                {children}
               
                <button className="bg-red-500 mt-5 rounded hover:bg-white-600 transform duration-300 ease-in-out text-sm font-medium p-2 text-white lg:max-w-[110px] w-full " onClick={closeModal}>Cerrar</button>

            </Modal>
        </>
    )
}

