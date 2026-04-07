
import { useLocation, useNavigate } from "react-router-dom";
import { sideBarItems } from "@/configs/sidebar";
import type { SidebarItem } from "@/types";
import clsx from 'clsx';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (item: SidebarItem) => {
    navigate(item.path);
  };

  return (
    <div className="flex gap-10 items-center">
      {sideBarItems.map((item) => {
        const isActive =
          location.pathname.startsWith(item.path)
        return (
          <div key={item.id}
            className='cursor-pointer'
            onClick={(e) => {
              e.stopPropagation();
              handleClick(item);
            }}>
            <div
              className={clsx(
                "whitespace-nowrap cursor-pointe hover:text-text-title hover:font-bold transition-colors duration-200",
                isActive ? "text-text-title font-bold" : "text-text-subtitle",
              )}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
}