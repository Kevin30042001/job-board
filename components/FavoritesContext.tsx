// components/FavoritesContext.tsx

"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

// Hook personalizado — igual que usabas useAuth() en Finance Tracker
export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Cargar favoritos de localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem("job-board-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  // Guardar en localStorage cada vez que cambian
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("job-board-favorites", JSON.stringify(favorites));
    }
  }, [favorites, loaded]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const isFavorite = (id: number) => favorites.includes(id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}