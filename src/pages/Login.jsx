import React from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useAuth } from "../context/useAuth";
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());

    try {
      await login(formData);
      navigate("/protected/authorization_code"); // Redirect after login
    } catch (error) {
      console.error('"Invalid username or password"', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-100">
      <div className="bg-amber-400 p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sign In
        </h2>
        <form
          className=" flex flex-col justify-center gap-6 p-5"
          onSubmit={handleLogin}
        >
          <Input
            label="Email"
            inputType="email"
            placeholder="example@gmail.com"
            name="email"
          />
          <Input label="Password" inputType="password" name="password" />
          <button
            className=" w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
