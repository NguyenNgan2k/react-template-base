import BgLogin from "@/assets/imgs/bg-login.png";
import BgLogin2 from "@/assets/imgs/bg-login2.png";
import Logo from "@/assets/imgs/logo.png";
import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLoginRules } from "../loginBussiness";
import { selectUserData } from "../redux/loginSlice";
import ChangePassForm from "./forms/ChangePassForm";
import LoginForm from "./forms/LoginForm";

type ActiveForm = "login" | "forceChangePass";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector(selectUserData);
  const [activeForm, setActiveForm] = useState<ActiveForm>("login");

  useEffect(() => {
    if (userData) {
      if (checkLoginRules(userData).forceChangePass) {
        setActiveForm("forceChangePass");
        return;
      }
      navigate("/order-book");
    }
  }, [userData, dispatch]);

  return (
    <div
      style={{ backgroundImage: `url(${BgLogin})` }}
      className="h-screen w-screen bg-contain  bg-center p-6"
    >
      <div className="h-16">
        <img src={Logo} className="h-full" alt="img-logo" />
      </div>
      <div className="flex justify-center relative">
        <img src={BgLogin2} alt="img-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="card w-[400px] p-4 rounded shadow-lg">
            {activeForm === "login" && <LoginForm />}
            {activeForm === "forceChangePass" && <ChangePassForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
