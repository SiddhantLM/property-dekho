import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Form = ({ handlePageChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name || !email || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const data = {
        name,
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:4000/api/auth/signup",
        data
      );

      if (!response) {
        throw new Error("Failed to signup");
      }

      toast.success("signup successful");
      handlePageChange({ id: 1, label: "login" });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="my-4 text-4xl font-bold text-[#023020] text-center">
        Signup Form
      </h1>
      <form
        onSubmit={handlSubmit}
        className="w-full flex flex-col max-w-fit p-8 bg-inherit mx-auto gap-4"
      >
        <label className="h-10 flex flex-col items-center justify-center border-b-2 border-[#023020] ">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="p-3 outline-none  bg-inherit placeholder-[#023020]"
          />
        </label>
        <label className="h-10 flex max-w-fit flex-col items-center justify-center border-b-2 border-[#023020]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="p-3 outline-none  bg-inherit placeholder-[#023020]"
          />
        </label>
        <label className=" max-w-fit h-10 flex flex-col underl items-center justify-center border-b-2 border-[#023020]">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="p-3 outline-none  bg-inherit placeholder-[#023020]"
          />
        </label>
        <label className="h-10 max-w-fit flex flex-col items-center justify-center border-b-2 border-[#023020]">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="p-3 outline-none bg-inherit placeholder-[#023020]"
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

export default Form;
