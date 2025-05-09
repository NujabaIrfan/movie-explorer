import { useEffect, useState, useCallback } from 'react';
import { useMoviesApi } from '../hooks/useMoviesApi';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import ErrorMessage from '../components/Shared/ErrorMessage';
import Loading from '../components/Shared/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Movie } from '../types/movie';
import '../styles/Home.css';

// Helper functions for localStorage
const getLocalStorageItem = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return defaultValue;
  }
};

const setLocalStorageItem = <T,>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const LAST_SEARCHED_KEY = 'lastSearchedMovies';

export default function HomePage() {
  const {
    trendingMovies,
    availableMovies,
    searchResults,
    loading,
    error,
    loadTrending,
    loadMoreAvailable,
    search,
    loadMoreSearch,
    hasMore
  } = useMoviesApi();

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchedMovies, setLastSearchedMovies] = useState<Movie[]>(
    getLocalStorageItem(LAST_SEARCHED_KEY, [])
  );

  // Save last search to localStorage
  useEffect(() => {
    if (searchResults.length > 0) {
      setLastSearchedMovies(searchResults);
      setLocalStorageItem(LAST_SEARCHED_KEY, searchResults);
    }
  }, [searchResults]);

  // Load trending on first mount
  useEffect(() => {
    if (trendingMovies.length === 0) {
      loadTrending();
    }
  }, [loadTrending, trendingMovies.length]);

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setIsSearching(!!trimmed);

    if (trimmed) {
      search(trimmed);
    }
  };

  const loadMoreMovies = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      if (isSearching) {
        await loadMoreSearch(searchQuery);
      } else {
        await loadMoreAvailable();
      }
    } catch (err) {
      console.error('Error loading more movies:', err);
    }
  }, [hasMore, loading, isSearching, searchQuery, loadMoreSearch, loadMoreAvailable]);

  const [isFetching] = useInfiniteScroll(loadMoreMovies, hasMore);

  if (loading && !trendingMovies.length && !availableMovies.length) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />

      {/* Search Results */}
      {isSearching ? (
        <div className="movie-section">
          <MovieGrid
            movies={searchResults}
            title={`Search Results for "${searchQuery}"`}
          />
        </div>
      ) : (
        <>
          {/* Last Searched Movies */}
          {lastSearchedMovies.length > 0 && (
            <div className="movie-section">
              <MovieGrid
                movies={lastSearchedMovies}
                title="Last Searched Movies"
              />
            </div>
          )}

          {/* Trending Movies */}
          {trendingMovies.length > 0 && (
            <div className="movie-section">
              <MovieGrid
                movies={trendingMovies}
                title="Trending Movies"
              />
            </div>
          )}

          {/* Other Available Movies */}
          {availableMovies.length > 0 && (
            <div className="movie-section">
              <MovieGrid
                movies={availableMovies}
                title="Other Movies"
              />
            </div>
          )}
        </>
      )}

      {/* Infinite Scroll Loader */}
      {(isFetching || loading) && hasMore && (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      )}

      {!hasMore && (trendingMovies.length > 0 || availableMovies.length > 0 || searchResults.length > 0) && (
        <div className="text-center py-8 text-gray-500">
          No more movies to show
        </div>
      )}
    </div>
  );
}
