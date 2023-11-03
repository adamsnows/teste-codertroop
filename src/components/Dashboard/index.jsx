import { useEffect } from "react";
import AddTaskModal from "../Modal/Add";
import EditTaskModal from "../Modal/Edit";
import OnlineUsersModal from "../Modal/Users";
import FiltersModal from "../Modal/Filters";
import { db, ref, onValue, set, remove } from "@/services/firebase";
import SeeTask from "../Modal/Task";
import TasksList from "./List";
import DeleteModal from "../Modal/Delete";
import { useTasksContext } from "@/context/TaskProvider";
import { useAuth } from "@/context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import CompleteModal from "../Modal/Complete";
import MouseCursor from "../Pointer";

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
    filters,
    setFilters,
    setEditTask,
    selectedTask,
    deleteTask,
    setDeleteTask,
    completedTask,
    setCompletedTask,
    filteredTasks,
    applyFilter,
    openUsers,
    setOpenUsers,
  } = useTasksContext();

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    applyFilter("all");
  }, [tasks]);

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

  let inactivityTimeout;

  const handleInactivity = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }

    inactivityTimeout = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 10000);
  };

  handleInactivity();

  useEffect(() => {
    if (typeof document !== "undefined" && user) {
      document.addEventListener("click", handleInactivity);
    }

    return () => {
      if (typeof document !== "undefined" && user) {
        document.removeEventListener("click", handleInactivity);
      }
    };
  }, [user]);

  const clearInactivityTimeout = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();

    const userId = user?.uid;
    const userEmail = user?.email;

    const userOnlineRef = ref(db, `onlineUsers/${userId}`);
    const mouseEventsRef = ref(db, `mouseEvents/${userId}`);
    await remove(mouseEventsRef);
    await set(userOnlineRef, { online: false, email: userEmail });

    deleteCookie("user-email");
    deleteCookie("token");

    clearInactivityTimeout();

    await signOut(auth);

    router.push("/");
  };

  const handleAddModal = () => {
    setAddTask(true);
  };

  const handleUsersModal = () => {
    setOpenUsers(true);
  };

  const handleFiltersModal = () => {
    setFilters(true);
  };

  if (!user) return <></>;
  console.log(onlineUsers);
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
          <button
            className="py-2 px-4 bg-slate-700 rounded-lg text-sm"
            onClick={handleFiltersModal}
          >
            Filtrar tarefas
          </button>
          <button
            className="py-2 px-4 bg-slate-700 rounded-lg text-sm hover:bg-red-400 ease-in-out duration-300"
            onClick={handleLogout}
          >
            Sair
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
          <TasksList tasks={filteredTasks} />
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
      <OnlineUsersModal open={openUsers} setOpen={setOpenUsers} />
      <FiltersModal
        open={filters}
        setOpen={setFilters}
        applyFilter={applyFilter}
      />
      <CompleteModal
        open={completedTask}
        setOpen={setCompletedTask}
        task={selectedTask}
      />

      {onlineUsers &&
        onlineUsers.map(
          (onlineUser) =>
            onlineUser.uid !== user.uid && (
              <MouseCursor
                key={onlineUser.uid}
                username={onlineUser.email}
                isCurrentUser={onlineUser.email === user.email}
                isUserOnline={onlineUser.online}
              />
            )
        )}
    </div>
  );
};

export default TaskDashboard;
