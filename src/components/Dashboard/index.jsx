import { useEffect, useState } from "react";
import { db } from "@/services/firebase";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Função para adicionar uma nova tarefa
  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        await db.collection("tasks").add({
          text: newTask,
          completed: false,
        });
        setNewTask("");
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  // Use o hook useEffect para buscar tarefas em tempo real
  useEffect(() => {
    const unsubscribe = db.collection("tasks").onSnapshot((snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text} - {task.completed ? "Concluída" : "Pendente"}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>
    </div>
  );
};

export default TaskList;
