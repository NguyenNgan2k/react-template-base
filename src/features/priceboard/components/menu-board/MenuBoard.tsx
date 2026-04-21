import useDropdownAnimation from "@/hooks/useDropdownAnimation";
import { useToast } from "@/hooks/useToast";
import type { Favorite } from "@/types";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";

export default function MenuBoard({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) return JSON.parse(stored);
    return [];
  });

  return (
    <div className="flex flex-wrap gap-1 exchange-tabs">
      <DropdownFavorites
        favorites={favorites}
        setFavorites={setFavorites}
        active={active}
        onChange={onChange}
      />
    </div>
  );
}

function DropdownFavorites({
  favorites,
  setFavorites,
  active,
  onChange,
}: {
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[]>>;
  active: string;
  onChange: (id: string) => void;
}) {
  const toast = useToast();
  const { isHovered, isAnimatingOut, handleMouseEnter, handleMouseLeave } =
    useDropdownAnimation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);

  const handleEditClick = (favKey: string, currentName: string) => {
    setEditingId(favKey);
    setEditingName(currentName);
  };
  const handleEditSubmit = (favKey: string) => {
    const name = editingName.trim();
    if (!name) {
      setEditingId(null);
      return;
    }

    if (
      favorites.some(
        (f) => f.label.toLowerCase() === name.toLowerCase() && f.key !== favKey,
      )
    ) {
      toast("Danh mục đã tồn tại", "error");
      return;
    }

    setFavorites((prev) => {
      const newFavs = prev.map((f) =>
        f.key === favKey
          ? {
              ...f,
              label: name, // chỉ đổi tên
              // giữ nguyên symbols
            }
          : f,
      );
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });

    setEditingId(null);
    setEditingName("");
  };

  const handleAddSubmit = () => {
    const name = editingName.trim();
    if (!name) return;

    if (favorites.some((f) => f.label.toLowerCase() === name.toLowerCase())) {
      toast("Danh mục đã tồn tại", "error");
      return;
    }

    const newKey = `fav_${Date.now()}`;
    const newId = `fav_${Date.now()}`;
    const newFav: Favorite = {
      key: newKey,
      label: name,
      id: newId,
      symbols: [],
    };
    setFavorites((prev) => {
      const newFavs = [...prev, newFav];
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });

    setEditingName("");
    setAddingNew(false);
  };

  const handleRemove = async (favKey: string) => {
    await setFavorites((prev) => {
      const newFavs = prev.filter((f) => f.key !== favKey);
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });

    handleMouseLeave();
    onChange("fav_default");
  };

  const activeItem = favorites.find((item) => item.id === active);

  return (
    <div
      className="relative favorite-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`px-3 py-1 text-sm flex items-center gap-1 rounded-lg ${
          activeItem ? "bg-gray-700" : ""
        }`}
      >
        {activeItem ? activeItem.label : "Danh mục mặc định"}
        <IoIosArrowDown />
      </button>

      {isHovered && (
        <div
          className={`absolute top-full left-0 px-2 pb-2 bg-bg-elevated rounded-xl shadow-lg z-50 min-w-[200px] w-full ${
            isAnimatingOut ? "animate-fadeOutUp" : "animate-fadeInDown"
          }`}
        >
          <div
            className={`flex justify-between items-center cursor-pointer rounded-lg mt-2 p-1 text-sm hover:bg-gray-700 w-full ${
              active === "fav_default" ? "bg-gray-700" : ""
            }`}
            onMouseEnter={() => setHoveredId("fav_default")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onChange("fav_default")}
          >
            <span className="text-sm">Danh mục mặc định</span>
          </div>
          {favorites.map((fav) => (
            <div
              key={fav.key}
              className={`flex justify-between items-center cursor-pointer rounded-lg mt-2 p-1 text-sm hover:bg-gray-700 w-full ${
                active === fav.id ? "bg-gray-700" : ""
              }`}
              onMouseEnter={() => setHoveredId(fav.key)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {fav.id !== "fav_default" && editingId === fav.key ? (
                <input
                  type="text"
                  value={editingName}
                  autoFocus
                  onChange={(e) => setEditingName(e.target.value)}
                  onBlur={() => handleEditSubmit(fav.key)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditSubmit(fav.key);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  className="rounded-lg px-2 py-0.5 w-full h-8"
                  placeholder="Nhập tên danh mục"
                />
              ) : (
                <span
                  className={`w-full h-full rounded-lg `}
                  onClick={() => onChange(fav.id)}
                >
                  {fav.label}
                </span>
              )}

              {hoveredId === fav.key && editingId !== fav.key && (
                <div className="flex gap-1.5 mr-1">
                  <span
                    className="text-text-subtitle cursor-pointer"
                    onClick={() => handleEditClick(fav.key, fav.label)}
                  >
                    <MdModeEditOutline className="text-sm hover:text-background-primary" />
                  </span>
                  <span
                    className="text-text-subtitle cursor-pointer"
                    onClick={() => handleRemove(fav.key)}
                  >
                    <FaTrash className="text-xs hover:text-background-primary" />
                  </span>
                </div>
              )}
            </div>
          ))}

          {addingNew ? (
            <input
              type="text"
              value={editingName}
              autoFocus
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={handleAddSubmit}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddSubmit();
                if (e.key === "Escape") {
                  setAddingNew(false);
                  setEditingName("");
                }
              }}
              className="rounded px-2 py-0.5 w-full mt-2 text-sm placeholder:text-sm"
              placeholder="Nhập tên danh mục"
            />
          ) : (
            <div
              className="p-2 mt-2 text-sm text-DTND-500 cursor-pointer hover:bg-gray-700 hover:text-background-primary rounded-lg"
              onClick={() => {
                setAddingNew(true);
                setEditingName("");
              }}
            >
              + Thêm danh mục
            </div>
          )}
        </div>
      )}
    </div>
  );
}
