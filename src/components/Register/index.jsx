import { useState } from "react";
import { AnimationDiscord } from "../Animation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Inter } from "next/font/google";
import { ref, set, push } from "firebase/database";
import { db } from "@/services/firebase";
import { setCookie } from "cookies-next";

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      const { createUserWithEmailAndPassword, auth } = await import(
        "@/services/firebase"
      );

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        setCookie("token", user.accessToken);
        setCookie("user-email", user.email);

        const userId = user.uid;
        const userEmail = user.email;

        const userOnlineRef = ref(db, `onlineUsers/${userId}`);
        set(userOnlineRef, { online: true, email: userEmail });

        const usersRef = ref(db, `users/${userId}`);
        set(usersRef, { uid: user.uid, email: userEmail });

        toast.success("Usuário criado com sucesso!");
      } catch (error) {
        console.log(error);
        if (error.message == "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Este e-mail já está em uso.");
        } else {
          toast.error("Erro ao criar conta.");
        }
      }
    }
  };

  return (
    <div className="p-10 bg-slate-900 bg-opacity-90 rounded-lg flex flex-col">
      <div className="flex flex-col gap-4 mb-5">
        <span className="text-5xl font-bold text-center">Registro</span>
        <span className="text-sm text-center">
          TaskManager made with NextJs & Tailwind
        </span>
      </div>
      <div className="flex items-center justify-center">
        <hr className="w-40" />
        <AnimationDiscord />
        <hr className="w-40" />
      </div>
      <form className="login-form flex flex-col gap-4">
        <label>Seu email</label>
        <input
          type="email"
          placeholder="seu-email@quentemail.com"
          className="rounded p-2 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Sua senha</label>
        <input
          type="password"
          placeholder="********"
          className="rounded p-2 focus:outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-white rounded px-6 py-2 mt-5 text-black"
          onClick={handleRegister}
        >
          Registrar
        </button>
      </form>
      <span
        className="text-center text-sm mt-4 cursor-pointer underline italic"
        onClick={() => router.push("/")}
      >
        Já tem conta? Logue
      </span>
    </div>
  );
};

export default Register;
