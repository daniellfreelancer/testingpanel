import React, { useState } from 'react'
import Modal from 'react-modal';
import PlanificationeditForm from '../forms/PlanificationeditForm';
import {AiOutlineEdit} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { reload } from '../../features/reloadSlice';
export default function Modaleditplaning({ idPlanner }) {
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
    // const customStyles = {
    //     content: {
    //         top: '50%',
    //         left: '50%',
    //         right: 'auto',
    //         bottom: 'auto',
    //         marginRight: '-50%',
    //         transform: 'translate(-50%, -50%)',
    //         width: '50%',
    //     },
    //     overlay: {
    //         backgroundColor: "rgba(0, 0, 0, 0.5)"
    //     }
    // };
    const customStyles = {
        content: {
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          margin: 'auto',
          width: '90%',
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
        <div>
            <button  onClick={openModal}>
            <AiOutlineEdit size={20} className='text-gray-400 cursor-pointer mr-2 hover:text-purple-800'/> 
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Actualizar planificación"
            >
                <PlanificationeditForm idPlanner={idPlanner}/>                            
                <button className="bg-red-500 mt-5 rounded hover:bg-white-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-white lg:max-w-[110px] w-full " onClick={closeModal}>Cerrar</button>

            </Modal>
        </div>
    )
}
