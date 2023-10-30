import StyledLogin from "./styles";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskProvider";
import { AnimationDiscord } from "../Animation";

import { Inter } from "next/font/google";

import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { onSubmitLogin } = useContext(TaskContext);
  const router = useRouter();
  const handleRegister = () => {
    router.push("/register");
  };
  return (
    <StyledLogin>
      <div className={`login-box ${inter.className}`}>
        <span className="text-5xl font-bold">CoderTroop</span>
        <span className="login-description">
          TaskManager made with NextJs, Tailwind & Styled Components
        </span>
        <div className="line-discord">
          <hr /> <AnimationDiscord classList="animated-discord" /> <hr />
        </div>
        <form className="login-form" onSubmit={handleSubmit(onSubmitLogin)}>
          <label htmlFor="">Seu login</label>
          <input
            {...register("email")}
            type="email"
            placeholder="seu-email@quentemail.com"
          />
          <label htmlFor="">Sua senha</label>
          <input
            {...register("password")}
            type="password"
            placeholder="********"
          />
          <button className="bg-white rounded px-6 py-2 mt-5 text-black">
            Entrar
          </button>
        </form>
        <span className="login-register">
          <span className="register-link" onClick={handleRegister}>
            Registre-se
          </span>
        </span>
      </div>
    </StyledLogin>
  );
};

export default Login;
