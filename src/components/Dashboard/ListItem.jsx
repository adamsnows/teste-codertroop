import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { DateTime } from "luxon";
import { useTasksContext } from "@/context/TaskProvider";

const TaskListItem = ({ task, tasks }) => {
  const { setSeeTask, setEditTask, setDeleteTask, setSelectedTask } =
    useTasksContext();

  return (
    <tr
      className={`${
        tasks.indexOf(task) % 2 === 0
          ? "bg-white dark:bg-gray-900"
          : "bg-gray-50 dark:bg-gray-800"
      } border-b dark:border-gray-700`}
    >
      <th
        scope="row"
        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
        onClick={() => {
          setSeeTask(true);
          setSelectedTask(task);
        }}
      >
        {task.name}
      </th>
      <td class="px-6 py-4">
        {DateTime.fromISO(task.createdAt).toLocaleString(DateTime.DATETIME_MED)}
      </td>
      <td class="px-6 py-4">{task.createdBy}</td>
      <td class="px-5 py-4 flex gap-3 items-center">
        <AiFillEdit
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
          onClick={() => {
            setSelectedTask(task);
            setEditTask(true);
          }}
        />
        <BsFillTrashFill
          className="text-red-500 cursor-pointer"
          onClick={() => {
            setSelectedTask(task);
            setDeleteTask(true);
          }}
        />
      </td>
    </tr>
  );
};

export default TaskListItem;
