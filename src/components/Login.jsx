import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import vmLogo from "../assets/logoVMDark.png";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userApi";
import {
  useSendEmailForResetPasswordMutation,
  useSigninMutation,
} from "../features/loginAPI";
import swal from "sweetalert2";
import Cookies from "js-cookie";
import Loader from "./Loader";
import SignUpGoogle from "./SignUpGoogle";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const router = useNavigate();
  const dispatch = useDispatch();
  const [loginReducer] = useSigninMutation();
  const [sendEmail] = useSendEmailForResetPasswordMutation();
  const [resetPassword, setResetPassword] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");



  async function handleLogin() {
    setIsLoader(!isLoader);

    const trimmedEmail = email.trim();
    const lowercaseEmail = trimmedEmail.toLowerCase();
    const from = 'form'

    loginReducer({ email: lowercaseEmail, password, from })
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          setIsLoader(false);
          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {
          let dataResponse = res.data;
          console.log(dataResponse);
          let dataSuccess = dataResponse.message;
          dispatch(setCredentials(res?.data?.response.admin));
          Cookies.set("adminToken", res?.data?.response.token);
          localStorage.setItem("token", res?.data?.response.token);
          swal.fire({
            text: dataSuccess,
            icon: "success",
          });
          setTimeout(() => {
            router("/dashboard");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }


  async function hanldeResetPassword() {
    setIsLoader(!isLoader);
    const trimmedEmail = emailForReset.trim();
    const lowercaseEmail = trimmedEmail.toLowerCase();





    sendEmail({ email: lowercaseEmail})
      .then((res) => {
        if (res.error) {
          let dataError = res.error;
          let dataMessage = dataError.data;
          setIsLoader(false);
          swal.fire({
            title: "Error!",
            text: dataMessage.message,
            icon: "error",
          });
        } else {
          let dataResponse = res.data;
          console.log(dataResponse);
          let dataSuccess = dataResponse.message;
          swal.fire({
            text: dataSuccess,
            icon: "success",
          });
          setEmailForReset("");
          setIsLoader(false);
          setTimeout(() => {
            setResetPassword(false);
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex justify-center">
          <img src={vmLogo} alt="logo-vitalMove" className="w-[8rem] my-5" />
        </div>

        {resetPassword ? (
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
              />
              {/* <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Nueva contraseña
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={passwordForReset}
                onChange={(e) => setPasswordForReset(e.target.value)}
              /> */}
              <button
                type="button"
                className="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex items-center justify-center "
                onClick={hanldeResetPassword}
              >
                <span className="inline-block mr-2">Restablecer contraseña</span>
                {isLoader ? (
                  <Loader />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                )}
              </button>


            </div>
            <div className="py-5">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button
                    onClick={() => setResetPassword(false)}
                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset flex items-center "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>

                    <span className="inline-block ml-1">Iniciar sesión</span>
                  </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">

             
                  <button  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-bottom	"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Ayuda</span>
                  </button>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow w-full rounded-lg">
            <div className="px-5 py-3">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Contraseña
              </label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex items-center justify-center "
                onClick={handleLogin}
              >
                <span className="inline-block mr-2">Ingresar</span>
                {isLoader ? (
                  <Loader />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="px-5 flex center justify-center gap-5 ">
              <SignUpGoogle/>

            </div>

            <div className="py-4">
              <div className="grid grid-cols-2 gap-1">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button
                    onClick={() => setResetPassword(true)}
                    className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-top"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="inline-block ml-1">
                      Olvidó su contraseña
                    </span>
                  </button>
                </div>
                <div className="text-center sm:text-right whitespace-nowrap">
                  <button 
                  onClick={() => window.open('https://www.vitalmove.cl/conditions', '_blank')}
                  className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block align-text-bottom	"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span className="inline-block ml-1">Ayuda</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
