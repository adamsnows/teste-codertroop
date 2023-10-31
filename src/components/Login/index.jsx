import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { AnimationDiscord } from "../Animation";
import { setCookie } from "cookies-next";

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

      console.log("Usuário logado:", user);
      toast.success("Logado com sucesso!");
      setCookie("token", user.accessToken);
      router.push("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login.");
    }
  };

  return (
    <div className="p-10 bg-slate-800 rounded-lg flex flex-col">
      <div className="flex flex-col gap-4">
        <span className="text-5xl font-bold text-center">CoderTroop</span>
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
        <label>Seu login</label>
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
          onClick={handleSignIn}
        >
          Entrar
        </button>
      </form>
      <span
        className="text-center text-sm mt-4 cursor-pointer underline italic"
        onClick={() => router.push("/register")}
      >
        Registre-se
      </span>
    </div>
  );
};

export default Login;
