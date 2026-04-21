import { useWindowActive } from "@/hooks/useWindowActive";
import { socketClient } from "@/networks/socket";
import { useAppDispatch } from "@/store/hook";
import { setListStockByIdFromCache } from "@/store/slices/priceboard/slice";
import type { Favorite } from "@/types";
import { getFavoritePriceboard } from "@/utils";
import { memo, useEffect, useRef } from "react";
import PriceBoardFavorite from "./base-price";

interface BoardProps {
  id: string;
}

function Board({ id }: BoardProps) {
  const dispatch = useAppDispatch();

  const { windowIsActive, shouldRefreshAfterInactive, clearInactiveState } =
    useWindowActive("priceboard");

  const groupIdRef = useRef<string>("");

  useEffect(() => {
    const handleVisibility = () => {
      socketClient.setTabActive(!document.hidden);
    };

    window.addEventListener("visibilitychange", handleVisibility);

    // Cleanup khi unmount
    return () => {
      window.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!windowIsActive) return;
    const needRefresh = shouldRefreshAfterInactive(60_000);

    if (needRefresh) {
      socketClient.clearFlash();
      socketClient.unsubscribeAll();

      if (groupIdRef.current?.startsWith("fav_")) {
        const favorites = getFavoritePriceboard();
        const fav = favorites.find((f: Favorite) => f.id === id);

        if (fav && Array.isArray(fav.symbols)) {
          // Gửi symbols từ danh mục yêu thích lên redux
          const arrSymbol = Array.from(new Set([...fav.symbols]));

          dispatch(setListStockByIdFromCache(id, arrSymbol));

          socketClient.subscribe({
            symbols: arrSymbol, //đăng ký theo danh sách mã
          });

          groupIdRef.current = id;
          return;
        } else {
          console.warn(
            "Không tìm thấy danh mục yêu thích hoặc danh mục trống:",
            id,
          );
          return;
        }
      }

      clearInactiveState();
    }
  }, [id, windowIsActive]);

  useEffect(() => {
    if (!id) return;

    // Unsubscribe nhóm trước đó nếu có
    if (groupIdRef.current) {
      socketClient.unsubscribeAll();
      socketClient.clearQueue();
      groupIdRef.current = "";
    }

    //TODO: Danh mục yêu thích
    if (id.startsWith("fav_")) {
      const favorites = getFavoritePriceboard();
      const fav = favorites.find((f: Favorite) => f.id === id);
      if (fav && Array.isArray(fav.symbols)) {
        // Gửi symbols từ danh mục yêu thích lên redux
        const arrSymbol = Array.from(new Set([...fav.symbols]));

        dispatch(setListStockByIdFromCache(id, arrSymbol));

        socketClient.subscribe({
          symbols: arrSymbol, //đăng ký theo danh sách mã
        });

        groupIdRef.current = id;
        return;
      } else {
        console.warn(
          "Không tìm thấy danh mục yêu thích hoặc danh mục trống:",
          id,
        );
        return;
      }
    }

    // Cleanup khi unmount hoặc id thay đổi
    return () => {
      if (groupIdRef.current) {
        socketClient.unsubscribeAll();
        socketClient.clearQueue();
        groupIdRef.current = "";
      }
    };
  }, [id]);

  return <>{id?.startsWith("fav_") && <PriceBoardFavorite boardId={id} />}</>;
}

export default memo(Board);
