export const APP_NAME = "Movie Explorer";
export const DEFAULT_POSTER = "/assets/placeholder-poster.jpg";
export const DEFAULT_BACKDROP = "/assets/placeholder-backdrop.jpg";

export const ROUTES = {
  HOME: "/",
  MOVIE: "/movie",
  FAVORITES: "/favorites",
  LOGIN: "/login",
};

export const TMDB_CONFIG = {
  BASE_URL: process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3",
  IMAGE_BASE_URL: "https://image.tmdb.org/t/p",
  POSTER_SIZES: ["w92", "w154", "w185", "w342", "w500", "w780", "original"],
  BACKDROP_SIZES: ["w300", "w780", "w1280", "original"],
};

export const GENRES: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};