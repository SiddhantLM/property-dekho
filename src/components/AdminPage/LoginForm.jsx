import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };
      const url = process.env.REACT_APP_BASE_URL + "/api/auth/login";
      const response = await axios.post(url, data);

      if (!response) {
        throw new Error("Failed to login");
      }
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("logged in successfully");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Failed to login");
      console.error(error);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <h1 className="my-4 text-4xl font-bold text-[#023020] text-center">
        Login Form
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col max-w-fit p-8 bg-inherit mx-auto gap-4"
      >
        <label className="h-10 flex max-w-fit flex-col items-center justify-center border-b-2 border-[#023020]">
          <input
            value={email}
            autoComplete="false"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 outline-none  bg-inherit placeholder-[#023020]"
          />
        </label>
        <label className=" max-w-fit h-10 flex flex-col underl items-center justify-center border-b-2 border-[#023020]">
          <input
            autoComplete="false"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 outline-none  bg-inherit placeholder-[#023020]"
          />
        </label>

        <div className="mt-4 text-center">
          <button className="bg-[#023020] text-[#fffdd0] px-5 py-3">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
