import { adminValue, deleteCredentials } from '../features/userApi'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSignoutMutation } from '../features/loginAPI'
import swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
export default function UserLogout() {

  const adminPanel = useSelector(adminValue);
  const [signoutReducer] = useSignoutMutation();
  const dispatch = useDispatch();
  const router = useNavigate();

  async function handleSignout(){
    let userMail = {
      email: adminPanel.email,
    };

    signoutReducer(userMail)
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;

          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {
          let dataResponse = res.data;
          let dataSuccess = dataResponse.message;
          swal.fire({
            text: dataSuccess,
            icon: "success",
          });
          dispatch(deleteCredentials())
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeout(() => {
        router("/");
        Cookies.remove('adminToken')
        localStorage.removeItem("token");
        localStorage.clear()
    }, 1000);
  }
  // eslint-disable-next-line
  const [portraitNumber, setPortraitNumber] = useState(null);

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 50) + 1;
    setPortraitNumber(randomNumber);
  };

  useEffect(() => {
    generateRandomNumber()
  }, [ adminPanel?.email])
  

  return (
    <div className='flex justify-between  pt-2  items-center flex-col w-full px-2 ' >
      <div className='flex gap-3 items-center  rounded-md shadow-lg p-2 w-full' >
      
        <img src={`https://vmtestphotos.s3.sa-east-1.amazonaws.com/${adminPanel?.imgUrl}`} alt='foto-perfil' className='rounded-full w-10 h-10' />
        <h2 className='font-thin' >{adminPanel ? `${adminPanel.lastName}, ${adminPanel.name} ` : ""} </h2>

        {/* <IoMdLogOut aria-details='Salir' title='Salir' size={25} className='text-indigo-900'  /> */}

      </div>
      <div className='flex  flex-col justify-center items-center my-2 w-full gap-2' >
        {/* <button aria-details='Mi Cuenta' title='Mi Cuenta' className='bg-purple-200 hover:bg-gray-200  rounded-md w-full py-2' >
          Mi cuenta
        </button> */}

        <button aria-details='Salir' title='Salir' className='bg-purple-200 rounded-md w-full py-2 hover:bg-gray-200 ' onClick={handleSignout}>
         Cerrar sesion
        </button>
        </div>
    </div>
  )
}
