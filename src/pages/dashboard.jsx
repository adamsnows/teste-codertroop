import React from "react";

import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/services/firebase";

import Head from "next/head";

const DashboardPage = () => {
  const [snapshot, loading, error] = useCollection(db.collection("tasks"));
  if (loading) return <p>Carregando tarefas...</p>;
  if (error) return <p>Erro ao carregar tarefas: {error.message}</p>;

  return (
    <div className="max-w-full min-h-screen flex justify-center items-center backgroundImage bg-bluepattern bg-no-repeat bg-cover">
      <Head>
        <title>CoderTroop - TaskManager Dashboard</title>
      </Head>
      <ul>
        {snapshot.docs.map((doc) => (
          <li key={doc.id}>{doc.data().task}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
