import { useAuth } from "@/context/AuthContext";
import { db } from "@/services/firebase";
import { ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

const MouseCursor = ({ isCurrentUser, isUserOnline }) => {
  const [userMouseEvents, setUserMouseEvents] = useState([]);

  useEffect(() => {
    const userMouseEventsRef = ref(db, "mouseEvents");

    onValue(userMouseEventsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userMouseEventsData = snapshot.val();
        const userMouseEventsArray = Object.values(userMouseEventsData);
        setUserMouseEvents(userMouseEventsArray);
      }
    });
  }, []);

  const mustDisplay = isUserOnline && !isCurrentUser;

  return (
    <>
      {userMouseEvents.map((onlineUser) => {
        if (mustDisplay) {
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
