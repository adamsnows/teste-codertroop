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
    const userRef = ref(db, `onlineUsers/${userId}`);

    set(ref(userRef, "online"), false);
  };

  useEffect(() => {
    const onlineUsersRef = ref(db, "onlineUsers");

    onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        const onlineCount = Object.values(onlineUsersData).filter(
          (user) => user.online
        ).length;

        setOnlineUsers(onlineCount);
      }
    });

    return () => {
      // desconectar users
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
