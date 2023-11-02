import React, { createContext, useContext, useEffect, useState } from "react";

import { db, ref, onValue, set } from "@/services/firebase";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Defina seus dados iniciais aqui
  const [addTask, setAddTask] = useState(false);
  const [seeTask, setSeeTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [filters, setFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const disconnectUser = (userId) => {
    // Aqui você desconecta o usuário que está saindo do aplicativo
    const userRef = ref(db, `onlineUsers/${userId}`);

    // Atualize o status "online" para false
    set(ref(userRef, "online"), false);
  };

  // UseEffect para monitorar os usuários online em tempo real
  useEffect(() => {
    const onlineUsersRef = ref(db, "onlineUsers");

    // Use o evento onValue para monitorar as mudanças em tempo real
    onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        // Conte quantos usuários estão online (campo "online" é verdadeiro)
        const onlineCount = Object.values(onlineUsersData).filter(
          (user) => user.online
        ).length;

        setOnlineUsers(onlineCount);
      }
    });

    return () => {
      // Remova o ouvinte quando o componente é desmontado
      // Isso evita vazamentos de memória e recursos
      // Desconecte o usuário que sai do aplicativo aqui
    };
  }, [setOnlineUsers]);

  return (
    <TasksContext.Provider
      value={{
        addTask,
        setAddTask,
        seeTask,
        setSeeTask,
        editTask,
        setEditTask,
        deleteTask,
        setDeleteTask,
        onlineUsers,
        setOnlineUsers,
        filters,
        setFilters,
        tasks,
        setTasks,
        selectedTask,
        setSelectedTask,
        disconnectUser,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};
