import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import vmLogo from "../assets/logoVMDark.png";
import swal from "sweetalert2";
import Loader from "../components/Loader";
import { useResetPasswordMutation } from "../features/loginAPI";

function ResetLinkPage() {
  const { code, emailUser } = useParams();
  const [isLoader, setIsLoader] = useState(false);
  const router = useNavigate();
  const [setPassword] = useResetPasswordMutation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const isPasswordValid = (password) => {
    // Agrega tus validaciones personalizadas aquí
    return password.length >= 6;
  };

  const isFormValid = () => {
    return newPassword === confirmPassword && isPasswordValid(newPassword);
  };

  const handleReset = () => {
   
    if (isFormValid()) {
      // Realiza la lógica de generación de contraseña aquí
      setIsLoader(!isLoader);

      setPassword({ email: emailUser, newPassword: confirmPassword, code: code })
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
            setNewPassword("");
            setConfirmPassword("");
            setIsLoader(false);
            setTimeout(() => {
              router("/");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      // Muestra un mensaje de error o realiza otra acción en caso de formulario inválido
    }
  };




  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="flex justify-center">
          <img src={vmLogo} alt="logo-vitalMove" className="w-[8rem] my-5" />
        </div>

        <div className="bg-white shadow w-full rounded-lg">

          <div className="px-5 py-3">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Nueva contraseña
            </label>
            <input
              required={true}
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Repetir contraseña
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              disabled={!isFormValid()}
              type="button"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center flex items-center justify-center "
              onClick={handleReset}
            >
              <span className="inline-block mr-2"> {!isLoader ? 'Generar contraseña' : 'Generando nueva contraseña'} </span>
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

          <div className="text-center pb-7">
          <p className={`text-sm ${newPassword.length < 6 ? 'text-red-400' : 'text-green-400'}`}>
            La contraseña debe tener mínimo 6 caracteres
          </p>
          {
            newPassword > 6 && confirmPassword > 6  && (
                <>
                {
                  newPassword === confirmPassword  ? (
                    <p className="text-sm text-green-400">
                      Las contraseñas coinciden
                    </p>
                  ) : (
                    <p className="text-sm text-red-400">
                      Las contraseñas no coinciden
                    </p>
                  )
                }
                </>
            )
          }





        </div>

          
        </div>
      </div>
    </div>
  );
}

export default ResetLinkPage;
