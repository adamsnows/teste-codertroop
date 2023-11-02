import { ref, get } from "firebase/database";
import { db } from "@/services/firebase";

const getAllUsers = async () => {
  const usersRef = ref(db, "users");

  try {
    const usersRef = ref(db, "users");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        const onlineUsersData = snapshot.val();

        const onlineUsersList = Object.keys(onlineUsersData).map((userId) => ({
          email: onlineUsersData[userId].email,
          online: onlineUsersData[userId].online,
        }));

        setOnlineUsers(onlineUsersList);
      }
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return [];
  }
};

export default getAllUsers;
