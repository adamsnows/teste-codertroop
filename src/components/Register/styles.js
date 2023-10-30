import styled from "styled-components";

const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Inter";
  animation: 0.8s fadeInDown;
  .discord-animation {
    width: 40%;
  }
  .line-discord {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }
  hr {
    width: 40%;
    border: 2px solid rgba(156, 156, 156, 0.3);
    height: 0.1%;
    border-radius: 5px;
  }
  .login-title {
    width: 100%;

    text-align: center;
    font-size: 3rem;
    color: white;
    font-family: "Bebas Neue";
  }
  .login-description {
    color: #9c9c9c;
    text-align: center;
    width: 65%;
  }
  .login-box {
    margin: 1rem;
    background-color: white;
    border-radius: 10px;
    padding: 50px;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: rgba(0, 0, 0, 0.7);

    .login-register {
      color: #9c9c9c;
      font-size: 0.8rem;
    }
  }
  .register-link {
    font-style: italic;
    text-decoration: underline;
    cursor: pointer;
    color: white;
  }
  .forgot-link {
    cursor: pointer;
    text-decoration: underline;
  }
  .discord-link {
    cursor: pointer;
    text-decoration: underline;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width: 100%;

    label,
    span {
      font-size: 0.8rem;
      width: 80%;
      text-align: left;
      color: white;
      font-weight: bolder;
    }
    span {
      color: #9c9c9c;
      font-weight: 500;
    }

    input {
      width: 80%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
        rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
      color: #9c9c9c;
      :focus {
        outline: none;
      }
      :focus::-webkit-input-placeholder {
        color: transparent;
        transition: 0.5s;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    .animation-header {
      width: 20%;
    }
    .login-register-box {
      padding: 40px;
      width: 600px;
      gap: 30px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
  }
`;

export default StyledRegister;
