import { useAppSelector } from "@/store/hook";
import { IoIosArrowDown } from "react-icons/io";
import { useAppDispatch } from "@/store/hook";
import { useNavigate } from "react-router-dom";
import { logout, selectUserId, } from "@/features/auth/login/redux/loginSlice";
import { useEffect, useRef, useState } from "react";
import { FaUser } from "react-icons/fa";


const UserLogged = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const userId = useAppSelector(selectUserId);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log("click outside");
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      ref={wrapperRef}
      className="relative bg-bg-elevated h-8 w-28 flex text-xs items-center justify-between rounded p-2 cursor-pointer"
      onClick={() => setIsUserMenuOpen(true)}
    >
      <div className="flex items-center gap-2">
        <FaUser className="w-3 h-3" />
        <span>{userId}</span>
      </div>
      <IoIosArrowDown />
      {
        isUserMenuOpen && (
          <ul className="absolute z-10 top-9 right-0 w-full p-2 bg-bg-elevated rounded shadow-lg">
            <li
              className="text-sm font-medium text-error-default hover:underline  cursor-pointer "
              onClick={handleLogout}
            >
              Đăng xuất
            </li>
          </ul>
        )
      }
    </div>
  )
}
export default UserLogged;