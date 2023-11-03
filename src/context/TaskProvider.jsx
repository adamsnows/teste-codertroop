import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { onValue, ref } from "firebase/database";
import { db } from "@/services/firebase";

const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [seeTask, setSeeTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [filters, setFilters] = useState(false);
  const [completedTask, setCompletedTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [openUsers, setOpenUsers] = useState(false);
  const [userMouseEvents, setUserMouseEvents] = useState([]);

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

  useEffect(() => {
    const onlineUsersRef = ref(db, "onlineUsers");
    const userMouveEventsRef = ref(db, "mouseEvents");

    const unsubscribe = onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        const onlineUsersList = Object.keys(onlineUsersData).map((userId) => ({
          email: onlineUsersData[userId].email,
          online: onlineUsersData[userId].online,
        }));

        setOnlineUsers(onlineUsersList);
      }
    });

    onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        const userMouseEvents = Object.keys(onlineUsersData).map((userId) => ({
          email: onlineUsersData[userId].email,
          online: onlineUsersData[userId].online,
        }));

        setUserMouseEvents(userMouseEvents);
      }
    });

    return () => {
      unsubscribe();
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
        completedTask,
        setCompletedTask,
        applyFilter,
        filteredTasks,
        setFilteredTasks,
        openUsers,
        setOpenUsers,
        userMouseEvents,
        setUserMouseEvents,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  return useContext(TasksContext);
};
