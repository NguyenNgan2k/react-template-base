import { useEffect } from "react";

export function useIdleLogout(onLogout: () => void, limitMinutes = 60) {
  const LIMIT = limitMinutes * 60 * 1000; // ms

  const updateLastActive = () => {
    localStorage.setItem("lastActive", Date.now().toString());
  };

  useEffect(() => {
    updateLastActive();

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];

    events.forEach((e) => window.addEventListener(e, updateLastActive));

    const interval = setInterval(() => {
      const last = Number(localStorage.getItem("lastActive") || 0);

      if (Date.now() - last > LIMIT) {
        onLogout();
      }
    }, 30_000); // kiểm tra mỗi 30s

    return () => {
      clearInterval(interval);
      events.forEach((e) => window.removeEventListener(e, updateLastActive));
    };
  }, []);
}
