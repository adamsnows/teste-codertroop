import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TaskListItem from "./ListItem";

const TasksList = ({ tasks }) => {
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
            Atribuido à
          </th>
          <th scope="col" className="px-6 py-3 flex justify-center">
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
          <SkeletonTheme baseColor="#27282b" highlightColor="#36393b">
            <tr>
              <td className="px-6 py-4">
                <Skeleton height={20} />
              </td>
              <td className="px-6 pe-20 py-4">
                <Skeleton height={20} />
              </td>
              <td className="px-6 pe-20 py-4">
                <Skeleton height={20} />
              </td>
              <td className="px-6 py-4">
                <Skeleton height={20} />
              </td>
            </tr>
          </SkeletonTheme>
        )}
      </tbody>
    </table>
  );
};

export default TasksList;
