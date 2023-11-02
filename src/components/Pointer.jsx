import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, set } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ username }) => {
  const { user } = useAuth();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const userOnlineRef = ref(db, `onlineUsers/${user.uid}`);
      set(userOnlineRef, { x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [user]);

  if (username == user.email) {
    return <></>;
  }

  return (
    <>
      <div
        className="mouse-cursor"
        style={{ left: position.x, top: position.y }}
      >
        <div className="bg-slate-600 w-2 h-2 rounded-full " />
        <span className="text-xs p-2 bg-slate-900 bg-opacity-80">
          {username}
        </span>
      </div>
    </>
  );
};

export default MouseCursor;
