import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import { TasksProvider } from "@/context/TaskProvider";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/services/firebase";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const isAuthenticated = !!user;

  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        if (router.pathname === "/" || router.pathname === "/register") {
          router.push("/dashboard"); // Redirecione para a dashboard se estiver autenticado
        }
      } else {
        if (router.pathname !== "/" && router.pathname !== "/register") {
          router.push("/"); // Redirecione para a página inicial se não estiver autenticado
        }
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <AuthProvider>
      <TasksProvider>
        <Component {...pageProps} />
        <ToastContainer
          theme="dark"
          autoClose={1}
          limit={1}
          toastStyle={{
            backgroundColor: "rgb(15, 23, 42, 0.9)",
          }}
        />
      </TasksProvider>
    </AuthProvider>
  );
}
