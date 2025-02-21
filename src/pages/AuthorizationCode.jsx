import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import useToast from "../hooks/useToast";
const AuthorizationCode = () => {
  const navigate = useNavigate();
  const { ToastComponent, triggerToast } = useToast("top-right");
  const [isRegex, setIsRegex] = React.useState(false);

  const navigation = () => {
    window.open(
      `${import.meta.env.VITE_APP_BASE_AUTH_URL}dropbox-auth/login`,
      "_blank"
    );
  };

  const getHandleInput = async (event) => {
    event.preventDefault();
    const regex = /2q0ammJsGI8AAAAAAAAA/;
    const formData = Object.fromEntries(new FormData(event.target).entries());
    setIsRegex(!regex.test(formData?.authorization_code));

    if (!regex.test(formData?.authorization_code)) {
      return triggerToast({
        message: "Invalid Authorization Code",
        duration: 3000,
        type: "error",
      });
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_BASE_AUTH_URL}dropbox-auth/callback`,
        { params: { code: formData?.authorization_code } }
      );

      if (response.data !== undefined) {
        localStorage.setItem(
          "access_token",
          response.data.tokenData.access_token
        );
        localStorage.setItem(
          "refresh_token",
          response.data.tokenData.refresh_token
        );

        navigate("/protected/generate_qr_code");
      }
    } catch (error) {
      console.error(error);
      return triggerToast({
        message: error.response?.data?.data?.error_description,
        duration: 3000,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3">
        <form onSubmit={getHandleInput}>
          <Input
            placeholder="Enter Authorization Code"
            inputType="text"
            label="Authorization Code"
            width="96"
            name="authorization_code"
          />
          <div className="flex  gap-4 justify-around align-center">
            <button
              className="mt-7 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition duration-200"
              onClick={navigation}
            >
              Get Access Token
            </button>
            <button
              className={`mt-7 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition duration-200 disabled:opacity-50`}
              type="submit"
              disabled={!isRegex}
            >
              OK
            </button>
          </div>
        </form>
      </div>
      {ToastComponent}
    </>
  );
};

export default AuthorizationCode;
