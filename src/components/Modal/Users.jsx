import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { onValue, ref } from "firebase/database";
import { db } from "@/services/firebase";

const OnlineUsersModal = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const onlineUsersRef = ref(db, "onlineUsers");

    const unsubscribe = onValue(onlineUsersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        const onlineUsersList = Object.keys(onlineUsersData).map((userId) => ({
          email: onlineUsersData[userId].email,
          online: onlineUsersData[userId].online,
        }));

        setOnlineUsers(onlineUsersList);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [setOnlineUsers]);

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
                <span
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Usuários
                </span>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-gray-500 border border-1">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>

                        <th scope="col" className="px-6 py-3 text-end">
                          Online
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {onlineUsers.map((user) => (
                        <tr
                          className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                          key={user.email}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {user.email}
                          </th>
                          <td className="px-6 py-4 flex items-center justify-end me-3 mt-1">
                            <div
                              className={`h-3 w-3 ${
                                user.online ? "bg-green-700" : "bg-red-500"
                              } rounded-full`}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-900 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-4">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
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
export default OnlineUsersModal;
