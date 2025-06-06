import { createContext, useContext, useState, useEffect } from 'react';

interface MovieContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const MovieContext = createContext<MovieContextType>(null!);

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]); // Sync favorites with localStorage

  const addFavorite = (id: number) => {
    if (!favorites.includes(id)) {
      const updatedFavorites = [...favorites, id];
      setFavorites(updatedFavorites);
    }
  };

  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter(movieId => movieId !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  return useContext(MovieContext);
}
