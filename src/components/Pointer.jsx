import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, onValue, set, remove } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ isCurrentUser, isUserOnline }) => {
  const { user } = useAuth();
  const [userMouseEvents, setUserMouseEvents] = useState({});
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastMousePositionTime, setLastMousePositionTime] = useState(0);

  console.log(lastMousePositionTime);

  useEffect(() => {
    const userMouseEventsRef = ref(db, "mouseEvents");

    onValue(userMouseEventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userMouseEventsData = snapshot.val();
        setUserMouseEvents(userMouseEventsData);
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
        lastActive: new Date().getTime(),
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
      for (const userId in userMouseEvents) {
        if (userId !== user.uid) {
          const userEvent = userMouseEvents[userId];
          if (currentTime - userEvent.lastActive >= inactivityTimeout) {
            // Usuário inativo, você pode optar por remover seu cursor
            // do estado para que ele não seja renderizado
            // ou definir suas coordenadas para fora da tela
            delete userMouseEvents[userId];
            setUserMouseEvents({ ...userMouseEvents });
          }
        }
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 1000);

    return () => {
      clearInterval(inactivityInterval);
    };
  }, [user, userMouseEvents]);

  return (
    <>
      {Object.values(userMouseEvents).map((onlineUser) => {
        if (
          onlineUser.email === user.email ||
          onlineUser.x === 0 ||
          onlineUser.y === 0
        ) {
          return null;
        }

        return (
          <div
            key={onlineUser.uid}
            className="mouse-cursor"
            style={{ left: onlineUser.x, top: onlineUser.y }}
          >
            <div className="ms-[-7px] mt-[-4px] bg-slate-600 w-2 h-2 rounded-full " />
            <span className="text-xs py-1 px-3 rounded bg-slate-900 bg-opacity-80">
              {onlineUser.email.replace(/@.+$/, "")}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default MouseCursor;
