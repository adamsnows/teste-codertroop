import { AiFillEdit } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { DateTime } from "luxon";
import { useTasksContext } from "@/context/TaskProvider";
import { getCookie } from "cookies-next";
import { AiOutlineCheck } from "react-icons/ai";

const TaskListItem = ({ task, tasks }) => {
  const {
    setSeeTask,
    setEditTask,
    setDeleteTask,
    setSelectedTask,
    setCompletedTask,
  } = useTasksContext();

  const currentUserEmail = getCookie("user-email");

  const isCurrentUserOwner = task.createdBy === currentUserEmail;
  const isAssignedToMe = task.assignedTo === currentUserEmail;

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
        className={`px-6 py-4 font-medium  whitespace-nowrap  cursor-pointer ${
          task.completed ? "text-green-500" : "dark:text-white"
        }`}
        onClick={() => {
          setSeeTask(true);
          setSelectedTask(task);
        }}
      >
        {task.name}
      </th>
      <td className="px-6 py-4">
        {DateTime.fromISO(task.createdAt).toLocaleString(DateTime.DATETIME_MED)}
      </td>
      <td className="px-6 py-4">{task.createdBy}</td>
      <td className="px-6 py-4">{task.assignedTo}</td>
      <td className="px-[8px] py-4 flex gap-3 items-center justify-center mt-8 md:mt-0">
        {isCurrentUserOwner ? (
          <>
            {!task.completed && (
              <AiFillEdit
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                onClick={() => {
                  setSelectedTask(task);
                  setEditTask(true);
                }}
              />
            )}

            <BsFillTrashFill
              className="text-red-500 cursor-pointer"
              onClick={() => {
                setSelectedTask(task);
                setDeleteTask(true);
              }}
            />
          </>
        ) : null}

        {!task.completed && (isAssignedToMe || isCurrentUserOwner) ? (
          <AiOutlineCheck
            className="text-green-500 cursor-pointer"
            onClick={() => {
              setSelectedTask(task);
              setCompletedTask(true);
            }}
          />
        ) : null}
      </td>
    </tr>
  );
};

export default TaskListItem;
