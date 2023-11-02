import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/services/firebase";

import Head from "next/head";
import TaskDashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="max-w-full min-h-screen flex justify-center items-center backgroundImage bg-bluepattern bg-no-repeat bg-cover">
      <Head>
        <title>CoderTroop - TaskManager Dashboard</title>
      </Head>
      <TaskDashboard />
    </div>
  );
};

export default DashboardPage;
