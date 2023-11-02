import { useNavigate } from 'react-router-dom';

import {BiArrowBack} from 'react-icons/bi'
// eslint-disable-next-line
import { useEffect } from 'react';

function GoBackToButton() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div className='div-go-back inline-flex'>
      <button onClick={handleGoBack} >
        <div className='flex bg-indigo-600 rounded hover:bg-indigo-800  text-sm items-center px-4 py-1 text-gray-50 w-[6rem] text-center gap-2'>
          <BiArrowBack size={20} />
          <p>atras</p>
        </div>
      </button>
    </div>
  );
}

export default GoBackToButton;
