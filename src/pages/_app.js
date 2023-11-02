import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });
import { Inter } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { TasksProvider } from "@/context/TaskProvider";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TasksProvider>
        <Component {...pageProps} />
        <ToastContainer theme="dark" />
      </TasksProvider>
    </>
  );
}
