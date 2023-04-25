import { adminValue, deleteCredentials } from '../features/userApi'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdLogOut} from 'react-icons/io'
import { useSignoutMutation } from '../features/loginAPI'
import swal from 'sweetalert2';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
export default function Header() {

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
    }, 2000);
  }


  return (
    <div className='flex justify-between px-5 pt-5 items-center ' >
        <h2 className='font-semibold' > VitalMove Panel</h2>
        <div className='flex gap-3 mx-3 items-center' >
        <h2> Hola, {adminPanel ? adminPanel.name : ""} </h2>
          <button onClick={handleSignout} className=' flex bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-2 text-white lg:max-w-[110px] text-center gap-2' >
            Salir <IoMdLogOut size={20} / >
          </button>
          </div> 
    </div>
  )
}
