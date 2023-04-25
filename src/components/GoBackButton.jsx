import { useNavigate } from 'react-router-dom';

import {BiArrowBack} from 'react-icons/bi'

function GoBackToButton() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div className='div-go-back px-3 inline-flex'>
      <button onClick={handleGoBack} >
        <div className='flex bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-white lg:max-w-[110px] text-center gap-2'>
          <BiArrowBack size={20} />
          <p>atras</p>
        </div>
      </button>
    </div>
  );
}

export default GoBackToButton;
