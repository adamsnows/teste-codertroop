import { useState } from "react";
import StyledRegister from "./styles";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskProvider";
import { AnimationDiscord, AnimationHeader } from "../Animation";
import { useRouter } from "next/navigation";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Register = () => {
  const [showPassword, setShowpassword] = useState("text");
  const { register, handleSubmit } = useForm();
  const { onSubmitRegister } = useContext(TaskContext);
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <StyledRegister>
      <div className={`login-box ${inter.className}`}>
        <span className="text-5xl font-bold mb-5">REGISTRO</span>
        <span className="login-description"></span>
        <div className="line-discord mb-5">
          <hr /> <AnimationDiscord /> <hr />
        </div>
        <form className="login-form" onSubmit={handleSubmit(onSubmitRegister)}>
          <label htmlFor="">Seu nome de usuário</label>
          <input
            {...register("name")}
            type="text"
            placeholder="Coder Junior Souza da Silva"
          />
          <label htmlFor="">Sua senha</label>
          <input
            {...register("password")}
            type="password"
            placeholder="******"
          />
          <label htmlFor="">Confirme sua senha</label>
          <input type="password" placeholder="******" />
          <label htmlFor="">Seu e-mail</label>
          <input
            {...register("email")}
            type="email"
            placeholder="coder-jr@quentemail.com"
          />
          <label htmlFor="">Sua imagem de perfil</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Link pra sua imagem de avatar"
          />

          <button className="bg-white text-black px-6 py-2 my-5 rounded">
            Registrar
          </button>
        </form>
        <span className="login-register">
          Já tem uma conta?{" "}
          <span className="register-link" onClick={handleLogin}>
            Faça Login
          </span>
        </span>
      </div>
    </StyledRegister>
  );
};

export default Register;
