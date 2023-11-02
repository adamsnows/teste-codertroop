import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { db, ref, remove } from "@/services/firebase";

import { toast } from "react-toastify";

const DeleteModal = ({ open, setOpen, task }) => {
  const cancelButtonRef = useRef(null);

  const handleDeleteTask = () => {
    try {
      const taskRef = ref(db, `tasks/${task.id}`);

      remove(taskRef);

      toast.success("Tarefa deletada com sucesso!");
      setOpen(false);
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error);
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
                  class="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Deletar tarefa
                </label>

                <span className="mt-2 text-gray-400 text-sm">
                  Você realmente deseja deletar esta tarefa? esta ação não
                  poderá ser desfeita!
                </span>

                <div className="bg-slate-900 py-3 sm:flex sm:flex-row-reverse ">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteTask}
                  >
                    Deletar
                  </button>

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Fechar
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
export default DeleteModal;