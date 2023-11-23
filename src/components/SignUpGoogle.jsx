import React, { useEffect, useRef } from "react";
// eslint-disable-next-line
import * as jose from "jose";
// eslint-disable-next-line
import swal from "sweetalert2";
// eslint-disable-next-line
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userApi";
import { useSigninMutation } from "../features/loginAPI";
import Cookies from "js-cookie";

function SignUpGoogle() {
  const buttonDiv = useRef();
  const router = useNavigate();
  const dispatch = useDispatch();
  const [loginReducer] = useSigninMutation();

  async function handleCredentialResponse(response) {
    let myJWT = jose.decodeJwt(response.credential);

    let newUser = {
      email: myJWT.email,
      from: "google",
    };

    loginReducer(newUser)
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

  useEffect(() => {
    /*global google*/

    google.accounts.id.initialize({
      client_id:
        "1001949984725-3rgjnhvke3nuvkqqd49atj279nlqs5nq.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      context: "signup",
    });

    google.accounts.id.renderButton(buttonDiv.current, {
      theme: "filled_ligth",
      size: "large",
      shape: "rectangular",
    });
    // eslint-disable-next-line
  }, []);

  return <div ref={buttonDiv}></div>;
}

export default SignUpGoogle;
