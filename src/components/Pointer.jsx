import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ isCurrentUser, isUserOnline }) => {
  const { user } = useAuth();
  const [userMouseEvents, setUserMouseEvents] = useState([]);
  const [position, setPosition] = useState([]);
  const [windowFocused, setWindowFocused] = useState(true);
  console.log(windowFocused);

  useEffect(() => {
    const userMouseEventsRef = ref(db, "mouseEvents");

    onValue(userMouseEventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userMouseEventsData = snapshot.val();
        const userMouseEventsArray = Object.values(userMouseEventsData);
        setUserMouseEvents(userMouseEventsArray);
      }
    });

    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const userOnlineRef = ref(db, `mouseEvents/${user.uid}`);
      set(userOnlineRef, {
        email: user.email,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("focus", () => setWindowFocused(true));
    window.addEventListener("blur", () => setWindowFocused(false));

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [user, position]);

  return (
    <>
      {userMouseEvents.map((onlineUser) => {
        if (onlineUser.email === user.email) {
          return null;
        }

        if (isUserOnline && windowFocused) {
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
