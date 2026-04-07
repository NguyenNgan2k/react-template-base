import type { SidebarItem } from "@/types";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";

interface Props {
  items: SidebarItem[]
}

export default function TabNav(props: Props) {
  const { pathname } = useLocation();
  return (
    <div className="w-full h-10 px-1 flex items-center gap-4 bg-bg-surface-strong" >
      {props.items && !!props.items &&
        props.items.map((item: SidebarItem) => {
          return (
            <Link
              key={item.id}
              to={item.path}
              className={
                clsx(
                  "px-2 h-8 flex items-center justify-center cursor-pointer text-text-subtitle",
                  pathname?.includes(item.path) && 'text-white font-bold border-b border-bd-active'
                )}
            >
              <div className="font-normal text-center">
                {item.title}
              </div>
            </Link>
          )
        }
        )}
    </div >
  );
}
