import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Defina seus dados iniciais aqui
  const [addTask, setAddTask] = useState(false);
  const [seeTask, setSeeTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(false);
  const [filters, setFilters] = useState(false);
  const [completedTask, setCompletedTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const { user } = useAuth();

  const applyFilter = (filter) => {
    switch (filter) {
      case "mine":
        const myTasks = tasks.filter((task) => task.createdBy === user.email);
        setFilteredTasks(myTasks);
        break;

      case "completed":
        const completedTasks = tasks.filter((task) => task.completed);
        setFilteredTasks(completedTasks);
        break;

      default:
        setFilteredTasks(tasks);
        break;
    }
  };

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
        completedTask,
        setCompletedTask,
        applyFilter,
        filteredTasks,
        setFilteredTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};
