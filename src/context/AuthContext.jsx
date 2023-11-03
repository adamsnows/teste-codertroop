import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db, ref } from "@/services/firebase";
import { remove, set } from "lodash";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const clearInactivityTimeout = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }
  };

  let inactivityTimeout;

  const handleInactivity = () => {
    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout);
    }

    inactivityTimeout = setTimeout(() => {
      handleLogout();
    }, 10 * 60 * 1000);
  };

  handleInactivity();

  useEffect(() => {
    if (typeof document !== "undefined" && user) {
      document.addEventListener("click", handleInactivity);
    }

    return () => {
      if (typeof document !== "undefined" && user) {
        document.removeEventListener("click", handleInactivity);
      }
    };
  }, [user]);

  const handleLogout = async () => {
    const auth = getAuth();

    const userId = user?.uid;
    const userEmail = user?.email;

    const userOnlineRef = ref(db, `onlineUsers/${userId}`);
    const mouseEventsRef = ref(db, `mouseEvents/${userId}`);
    await set(userOnlineRef, { email: userEmail, online: false });
    await remove(mouseEventsRef);

    deleteCookie("user-email");
    deleteCookie("token");

    clearInactivityTimeout();

    await signOut(auth);

    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
