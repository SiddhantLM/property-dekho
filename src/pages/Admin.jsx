import React, { useState } from "react";
import Form from "../components/AdminPage/Form";
import LoginForm from "../components/AdminPage/LoginForm";

const Admin = () => {
  const [currPage, setCurrPage] = useState("login");
  const [active, setActive] = useState("login");
  const pages = [
    {
      id: 1,
      label: "login",
    },
    {
      id: 2,
      label: "signup",
    },
  ];

  const handlePageChange = (page) => {
    console.log(page.label);
    setCurrPage(page.label);
    setActive(page.label);
  };

  return (
    <div className="bg-[#023020] flex min-h-screen w-full items-center justify-center">
      {/* NAVBAR */}
      <div className=" top-3 left-1/2 transform -translate-x-1/2 px-10 py-5 h-[70px] inline-flex gap-10 mx-auto items-center justify-center fixed z-[1000] ">
        {pages.map((page) => (
          <div
            onClick={() => handlePageChange(page)}
            key={page.id}
            className={`w-32 h-14 flex items-center justify-center uppercase bg-[#fffdd0]  font-bold text-2xl rounded-full cursor-pointer hover:underline hover:underline-offset-4 shadow-2xl ${
              active === page.label ? "underline underline-offset-4" : ""
            }`}
          >
            {page.label}{" "}
          </div>
        ))}
      </div>
      {/* NAVBAR END */}

      <div className="w-1/4 bg-[#fffdd0]">
        {currPage === "login" ? (
          <LoginForm />
        ) : (
          <Form handlePageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default Admin;
