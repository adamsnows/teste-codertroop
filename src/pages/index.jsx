import React from "react";

import Login from "@/components/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <div className="max-w-full min-h-screen flex justify-center items-center backgroundImage bg-bluepattern bg-no-repeat bg-cover">
      <Head>
        <title>CoderTroop - TaskManager Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
