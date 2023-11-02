import Skeleton from "react-loading-skeleton";
import TaskListItem from "./ListItem";

const TaskList = ({ tasks }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Tarefa
          </th>
          <th scope="col" className="px-6 py-3">
            Criada em
          </th>
          <th scope="col" className="px-6 py-3">
            Criada por
          </th>
          <th scope="col" className="px-6 py-3">
            Ação
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks ? (
          tasks.map((task, index) => (
            <TaskListItem key={index} task={task} tasks={tasks} />
          ))
        ) : (
          <tr>
            <td colSpan="4">
              <Skeleton count={5} height={20} duration={1} />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TaskList;
