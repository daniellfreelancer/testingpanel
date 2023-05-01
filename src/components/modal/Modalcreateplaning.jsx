import React, { useState } from 'react'
import Modal from 'react-modal';
export default function Modalcreateplaning({ children, title }) {
    const [modalIsOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
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
            <button className="text-xs bg-white border-indigo-700 rounded hover:bg-gray-200 transform duration-300 ease-in-out font-medium px-6 py-2 text-indigo-700 border   w-max   text-center" onClick={openModal}>{title}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Crear planificación"
            >
                {children}
                <button className="bg-red-500 mt-5 rounded hover:bg-white-600 transform duration-300 ease-in-out text-xs font-medium px-6 py-2 text-white lg:max-w-[110px] w-full " onClick={closeModal}>Cerrar</button>

            </Modal>
        </div>
    )
}
