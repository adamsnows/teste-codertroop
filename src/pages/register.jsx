import React from "react";
import Register from "../components/Register";
import Head from "next/head";

const RegisterPage = () => {
  return (
    <div className="max-w-full min-h-screen flex justify-center items-center backgroundImage bg-bluepattern bg-no-repeat bg-cover">
      <Head>
        <title>CoderTroop - Registro</title>
      </Head>
      <Register />
    </div>
  );
};

export default RegisterPage;
