import { useContext, useEffect, useState } from "react";
import AddTaskModal from "../Modal/Add";
import EditTaskModal from "../Modal/Edit";
import OnlineUsersModal from "../Modal/Users";
import FiltersModal from "../Modal/Filters";
import { db, ref, onValue } from "@/services/firebase";
import SeeTask from "../Modal/Task";
import TasksList from "./List";
import DeleteModal from "../Modal/Delete";
import { TasksProvider, useTasksContext } from "@/context/TaskProvider";

const TaskDashboard = () => {
  const {
    tasks,
    setTasks,
    editTask,
    addTask,
    setAddTask,
    seeTask,
    setSeeTask,
    onlineUsers,
    setOnlineUsers,
    filters,
    setFilters,
    setEditTask,
    selectedTask,
    deleteTask,
    setDeleteTask,
  } = useTasksContext();
  console.log(tasks);

  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const tasksData = snapshot.val();
        const tasksArray = Object.entries(tasksData).map(([taskId, task]) => ({
          id: taskId,
          ...task,
        }));
        setTasks(tasksArray);
      }
    });
  }, []);

  const handleAddModal = () => {
    setAddTask(true);
  };

  const handleUsersModal = () => {
    setOnlineUsers(true);
  };

  const handleEditModal = () => {
    setEditTask(true);
  };

  const handleFiltersModal = () => {
    setFilters(true);
  };

  return (
    <div className="bg-slate-900 bg-opacity-90 p-14 rounded-lg flex flex-col gap-4 min-h-[300px] w-5/6 max-w-[1600px]">
      <div className="flex justify-between gap-1 mb-10 w-full items-center">
        <div className="flex flex-col">
          <span className="text-2xl">Tarefas</span>
          <span className="font-thin">
            Lista de tarefas em tempo real da CoderTroop.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <button
            className="py-2 px-4 bg-slate-700 rounded-lg text-sm"
            onClick={handleAddModal}
          >
            Adicionar tarefa
          </button>
          <button
            className="py-2 px-4 bg-slate-700 rounded-lg text-sm"
            onClick={handleUsersModal}
          >
            Ver usuários on-line
          </button>
        </div>
      </div>
      {tasks.length == 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-gray-500 border border-1 p-5 text-center">
          <span className="text-sm">
            Nenhuma tarefa por aqui, teste adicionar uma nova tarefa!
          </span>
        </div>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-gray-500 border border-1">
          <TasksList tasks={tasks} />
        </div>
      )}

      <AddTaskModal open={addTask} setOpen={setAddTask} />
      <SeeTask open={seeTask} setOpen={setSeeTask} task={selectedTask} />
      <EditTaskModal
        open={editTask}
        setOpen={setEditTask}
        task={selectedTask}
      />
      <DeleteModal
        open={deleteTask}
        setOpen={setDeleteTask}
        task={selectedTask}
      />
      <OnlineUsersModal open={onlineUsers} setOpen={setOnlineUsers} />
      <FiltersModal open={filters} setOpen={setFilters} />
    </div>
  );
};

export default TaskDashboard;
