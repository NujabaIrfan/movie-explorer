import { useState } from 'react';
import { 
  fetchTrending, 
  searchMovies, 
  getMovieDetails, 
  getSimilarMovies, 
  Movie,
  SimilarMoviesResponse
} from '../services/tmdb';

export function useMoviesApi() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // track if there are more movies to load
  const [page, setPage] = useState(1); // Track the page for pagination
  const [searchPage, setSearchPage] = useState(1); // Track the page for search results pagination

  // Load trending movies initially
  const loadTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTrending(page);
      setTrendingMovies(data);
      setHasMore(data.length > 0);
    } catch (err) {
      setError('Failed to load trending movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load more available (non-trending) movies with pagination
  const loadMoreAvailable = async () => {
    if (loading) return; // Avoid multiple requests at once
    setLoading(true);
    setPage((prevPage) => prevPage + 1); // Increment page for available movies
    try {
      const data = await fetchTrending(page); // Assuming available movies are fetched from the same endpoint
      setAvailableMovies((prevMovies) => [...prevMovies, ...data]);
      setHasMore(data.length > 0);
    } catch (err) {
      setError('Failed to load more available movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Search movies by query
  const search = async (query: string) => {
    if (!query.trim()) {
      loadTrending();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      setSearchResults(data.results); // Replace existing movies with search results
      setHasMore(data.results.length > 0);
      setSearchPage(2); // Start pagination for search results
    } catch (err) {
      setError('Failed to search movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load more search results with pagination
  const loadMoreSearch = async (query: string) => {
    if (loading) return; // Avoid multiple requests at once
    setLoading(true);
    try {
      const data = await searchMovies(query, searchPage);
      setSearchResults((prevMovies) => [...prevMovies, ...data.results]);
      setHasMore(data.results.length > 0);
      setSearchPage((prevPage) => prevPage + 1); // Increment page for search results
    } catch (err) {
      setError('Failed to load more search results');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Get details of a specific movie
  const getDetails = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      return await getMovieDetails(id);
    } catch (err) {
      setError('Failed to load movie details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get similar movies for a specific movie
  const getSimilarMoviesApi = async (movieId: number, page: number): Promise<SimilarMoviesResponse> => {
    setLoading(true);
    setError(null);
    try {
      return await getSimilarMovies(movieId, page);
    } catch (err) {
      setError('Failed to load similar movies');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    trendingMovies, 
    availableMovies, 
    searchResults, 
    loading, 
    error, 
    loadTrending, 
    loadMoreAvailable, 
    search, 
    loadMoreSearch, 
    getDetails,
    getSimilarMovies: getSimilarMoviesApi, 
    hasMore 
  };
}
