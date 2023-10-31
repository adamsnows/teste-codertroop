import { useEffect, useState } from "react";
import { database } from "@/services/firebase";
import { FcDataConfiguration } from "react-icons/fc";
import Modal from "../Modal";
const TaskList = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Função para adicionar uma nova tarefa
  const addTask = async (e) => {
    e.preventdefault();
    if (newTask.trim() !== "") {
      try {
        await database.collection("tasks").add({
          text: newTask,
          completed: false,
        });
        setNewTask("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  // useEffect(() => {
  //   const unsubscribe = database.collection("tasks").onSnapshot((snapshot) => {
  //     const updatedTasks = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setTasks(updatedTasks);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className="bg-slate-800 p-10 rounded-lg flex flex-col gap-4 w-[1500px] h-[1000px]">
      <Modal open={open} setOpen={setOpen} />
      <span className="text-center font-thin text-3xl">
        Realtime TaskManager with Firebase
      </span>

      <table className="table-auto">
        <thead className="border-bottom ">
          <tr>
            <th className="text-start text-sm font-mono font-thin">
              Nome da tarefa
            </th>
            <th className="text-sm font-mono font-thin">Criado por</th>
            <th className="text-sm font-mono font-thin">Criado em</th>
            <th className="text-sm font-mono font-thin">Configurações</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td className="text-start block">
              The Sliding Mr. Bones (Next Stop, Pottersville)
            </td>
            <td className="text-center">Malcolm Lockyer</td>
            <td className="text-center">1961</td>
            <td className="flex justify-center cursor-pointer">
              <FcDataConfiguration onClick={() => setOpen(true)} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
