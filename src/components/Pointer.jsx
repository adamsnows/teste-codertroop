import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, set } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({
  username,
  userMouseEvents,
  isCurrentUser,
  isUserOnline,
}) => {
  const { user } = useAuth();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  console.log("is user online?", isUserOnline);
  console.log("who is?", username);
  console.log("same user?", isCurrentUser);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const userOnlineRef = ref(db, `mouseEvents/${user.uid}`);
      set(userOnlineRef, {
        email: user.email,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [user, position]);

  return (
    <>
      {userMouseEvents.map((onlineUser) => {
        if (isUserOnline && !isCurrentUser) {
          return (
            <div
              key={onlineUser.uid}
              className="mouse-cursor"
              style={{ left: onlineUser.x, top: onlineUser.y }}
            >
              <div className="ms-[-7px] mt-[-4px] bg-slate-600 w-2 h-2 rounded-full " />
              <span className=" text-xs py-1 px-3 rounded bg-slate-900 bg-opacity-80">
                {onlineUser.email.replace(/@.+$/, "")}
              </span>
            </div>
          );
        }
        return null;
      })}
    </>
  );
};

export default MouseCursor;
