import React, { createContext, useContext, useState } from "react";

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
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};
