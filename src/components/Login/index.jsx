import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AnimationDiscord } from "../Animation";
import { setCookie } from "cookies-next";
import { db, ref, set } from "@/services/firebase";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { signInWithEmailAndPassword, auth } = await import(
      "@/services/firebase"
    );

    try {
      const userCredential = await signInWithEmailAndPassword(
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

      toast.success("Logado com sucesso!");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Erro ao fazer login.");
    }
  };

  return (
    <div className="p-5 sm:p-10 bg-slate-900 bg-opacity-90 w-auto md:w-[500px] rounded-lg flex flex-col">
      <div className="flex flex-col gap-2 mb-3">
        <span className="text-3xl font-bold text-center">CoderTroop</span>
        <span className="text-xs text-center">
          TaskManager made with NextJs & Tailwind
        </span>
      </div>
      <div className="flex items-center justify-center">
        <hr className="w-16" />
        <AnimationDiscord />
        <hr className="w-16" />
      </div>
      <form className="login-form flex flex-col gap-2">
        <label>Seu email</label>
        <input
          type="email"
          placeholder="seu-email@quentemail.com"
          className="rounded p-1 focus:outline-none px-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Sua senha</label>
        <input
          type="password"
          placeholder="********"
          className="rounded p-1 focus:outline-none px-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-white rounded px-4 py-2 mt-2 text-black cursor-pointer"
          onClick={handleSignIn}
        >
          Entrar
        </button>
      </form>
      <span
        className="text-center text-xs mt-2 cursor-pointer underline italic"
        onClick={() => router.push("/register")}
      >
        Registre-se
      </span>
    </div>
  );
};

export default Login;
