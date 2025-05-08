import apiClient from './apiClient';

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview?: string;
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: number; name: string }[];
  videos: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
}

export interface SimilarMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
}

// Update the fetchTrending function to accept a page parameter
export const fetchTrending = async (page: number): Promise<Movie[]> => {
  const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?page=${page}&api_key=d6e9861e40ef90aee8828dbc0da30396`);
  const data = await response.json();
  return data.results;
};


export const searchMovies = async (query: string, page = 1) => {
  const { data } = await apiClient.get('/search/movie', {
    params: { query, page }
  });
  return data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const { data } = await apiClient.get(`/movie/${id}`, {
    params: { append_to_response: 'videos,credits' }
  });
  return data;
};

export const getMovieCredits = async (id: number) => {
  const { data } = await apiClient.get(`/movie/${id}/credits`);
  return data;
};

export const getSimilarMovies = async (
  movieId: number, 
  page: number
): Promise<SimilarMoviesResponse> => {
  const { data } = await apiClient.get(`/movie/${movieId}/similar`, {
    params: { page }
  });
  return {
    results: data.results,
    page: data.page,
    total_pages: data.total_pages
  };
};