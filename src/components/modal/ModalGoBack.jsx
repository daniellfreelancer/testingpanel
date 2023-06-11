import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModalGoBack = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';

      setShowModal(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleConfirm = () => {
    navigate(-1); // Retrocede una página en la historia del navegador
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow">
            <p>¿Estás seguro de que quieres retroceder?</p>
            <div className="mt-4 flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
                onClick={handleConfirm}
              >
                Sí
              </button>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={handleCancel}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalGoBack;
