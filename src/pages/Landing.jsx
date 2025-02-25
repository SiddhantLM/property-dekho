import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 1,
      label: "User",
      url: "/user",
    },
    {
      id: 2,
      label: "Admin",
      url: "/admin",
    },
  ];
  return (
    <div className="flex min-h-screen items-center justify-center w-full mx-auto gap-5">
      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => navigate(role.url)}
          className="p-3 bg-indigo-800 text-white rounded-lg w-32 text-xl  hover:scale-105 transition duration-150"
        >
          {role.label}
        </button>
      ))}
    </div>
  );
};

export default Landing;
