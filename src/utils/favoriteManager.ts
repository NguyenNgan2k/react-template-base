import type { Favorite } from "../types";

const STORAGE_KEY = "favorites";

// Đảm bảo luôn có pinned[]
const normalizeGroup = (group: Favorite): Favorite => {
  return {
    key: group.key,
    label: group.label,
    id: group.id,
    symbols: Array.isArray(group.symbols) ? group.symbols : [],
  };
};

export const getFavorites = (): Favorite[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];

    // Chuẩn hóa: thêm pinned[] nếu chưa có
    const normalized = parsed.map(normalizeGroup);

    return normalized;
  } catch (err) {
    console.error("Parse favorites error:", err);
    return [];
  }
};

export const saveFavorites = (groups: Favorite[]) => {
  const clean = groups.map((g) => ({
    key: g.key,
    label: g.label,
    id: g.id,
    symbols: g.symbols.filter(Boolean),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
};
