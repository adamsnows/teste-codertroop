import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { db, ref, push } from "@/services/firebase";

import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const AddModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  const handleAddTask = () => {
    if (!taskName || !taskDescription) {
      setIsInvalid(true);
      return setTimeout(() => {
        setIsInvalid(false);
      }, 2000);
    } else {
      const newTask = {
        name: taskName,
        description: taskDescription,
        createdBy: getCookie("user-email"),
        createdAt: new Date().toISOString(),
      };

      const tasksRef = ref(db, "tasks");

      push(tasksRef, newTask);

      setTaskName("");
      setTaskDescription("");

      toast.success("Tarefa criada com sucesso!");
      setOpen(false);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg p-6">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Adicionar tarefa
                </label>
                <input
                  type="text"
                  placeholder="Nome da tarefa"
                  value={taskName}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg ${
                    isInvalid
                      ? " shake border bg-red-500"
                      : "border border-gray-100"
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none mb-3`}
                  onChange={(e) => {
                    setTaskName(e.target.value);
                  }}
                />
                <textarea
                  id="message"
                  rows="4"
                  value={taskDescription}
                  className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg ${
                    isInvalid
                      ? " shake border bg-red-500"
                      : "border border-gray-100"
                  } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none`}
                  placeholder="Escreva detalhes de sua tarefa aqui..."
                  onChange={(e) => {
                    setTaskDescription(e.target.value);
                  }}
                />

                <div className="bg-slate-900 py-3 sm:flex sm:flex-row-reverse ">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleAddTask}
                  >
                    Adicionar
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                      setTaskDescription("");
                      setTaskName("");
                    }}
                    ref={cancelButtonRef}
                  >
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default AddModal;
