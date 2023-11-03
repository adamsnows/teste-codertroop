import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { getCookie } from "cookies-next";
import { ref, set } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ username, isCurrentUser, isUserOnline }) => {
  const { user } = useAuth();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      if (user) {
        const userOnlineRef = ref(db, `mouseEvents/${user.uid}`);
        set(userOnlineRef, {
          email: user.email,
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [user]);

  if (isCurrentUser || !isUserOnline) {
    return null;
  }

  return (
    <>
      <div
        className="mouse-cursor"
        style={{ left: position.x, top: position.y }}
      >
        <div className="ms-[-7px] mt-[-4px] bg-slate-600 w-2 h-2 rounded-full " />
        <span className=" text-xs py-1 px-3 rounded bg-slate-900 bg-opacity-80">
          {username.replace(/@.+$/, "")}
        </span>
      </div>
    </>
  );
};

export default MouseCursor;
