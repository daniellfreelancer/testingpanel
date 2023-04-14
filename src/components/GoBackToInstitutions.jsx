import { Link } from 'react-router-dom';

function GoBackToInstitutions() {
  return (
    <div className='div-go-back px-3 inline-flex'>
      <Link to='/institutions'>
        <div className='rounded-lg bg-blue-200 p-2 w-[4rem] ml-5 flex justify-center text-gray-600'>
          <p>atras</p>
        </div>
      </Link>
    </div>
  );
}

export default GoBackToInstitutions;
