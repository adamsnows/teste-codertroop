import { createContext } from "react";
import { useRouter } from "next/navigation";
import api from "../services/Api.js";
import { toast } from "react-toastify";

export const TaskContext = createContext({});

const PortalProvider = ({ children }) => {
  const router = useRouter();

  const onSubmit = (data) => console.log(data);

  const onSubmitLogin = (account) => {
    console.log(account);
    // api
    //   .post("/login", account)
    //   .then((res) => {
    //     localStorage.setItem("token", res.data.accessToken);
    //     localStorage.setItem("name", res.data.user.name);
    //     localStorage.setItem("badges", res.data.user.achievement);
    //     localStorage.setItem("img", res.data.user.imgProfile);
    //     localStorage.setItem("discord", res.data.user.discordUser);
    //     toast.success("Bem vindo, coder!", {
    //       position: "top-right",
    //       autoClose: 1000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       toastId: 1,
    //     });
    //     // const element = document.querySelector(".login-register-box");
    //     // element.classList.add(
    //     //   "animate__animated",
    //     //   "animate__fadeOutRight",
    //     //   "animate__fast"
    //     // );
    //     setTimeout(() => {
    //       // router.push("/choose-your-destiny");
    //     }, "800");
    //   })
    //   .catch((err) => {
    //     toast.error("Login ou senha incorreto.", {
    //       position: "top-right",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       toastId: 1,
    //     });
    //   });
  };

  const onSubmitRegister = (account) => {
    console.log(account);

    // account = {
    //   password: account.password,
    //   created: new Date(),
    //   name: account.name,
    //   email: account.email,
    //   imgProfile: account.imgProfile,
    // };
  };
  return (
    <TaskContext.Provider value={{ onSubmitLogin, onSubmitRegister, onSubmit }}>
      {children}
    </TaskContext.Provider>
  );
};

export default PortalProvider;
