import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, onValue, set } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ isCurrentUser, isUserOnline }) => {
  const { user } = useAuth();
  const [userMouseEvents, setUserMouseEvents] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMousePositionTime, setLastMousePositionTime] = useState(0);

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
      setLastMousePositionTime(new Date().getTime());

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

  // Define o tempo limite de inatividade em milissegundos (5 segundos)
  const inactivityTimeout = 5000;

  useEffect(() => {
    const checkInactivity = () => {
      const currentTime = new Date().getTime();
      if (currentTime - lastMousePositionTime >= inactivityTimeout) {
        setPosition({ x: 0, y: 0 }); // Define a posição para fora da tela ou oculta
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 1000);

    return () => {
      clearInterval(inactivityInterval);
    };
  }, [lastMousePositionTime]);

  return (
    <>
      {userMouseEvents.map((onlineUser) => {
        if (onlineUser.email === user.email) {
          return null;
        }

        if (isUserOnline && onlineUser.x !== 0 && onlineUser.y !== 0) {
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
