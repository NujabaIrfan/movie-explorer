import { useEffect, useState, useCallback } from 'react';
import { useMoviesApi } from '../hooks/useMoviesApi';
import MovieGrid from '../components/movies/MovieGrid';
import SearchBar from '../components/movies/SearchBar';
import ErrorMessage from '../components/Shared/ErrorMessage';
import Loading from '../components/Shared/Loading';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

export default function HomePage() {
  const { 
    trendingMovies,
    availableMovies,
    searchResults,
    loading, 
    error, 
    loadTrending, 
    loadMoreAvailable, // Changed to match hook
    search, 
    loadMoreSearch, 
    hasMore 
  } = useMoviesApi();
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine which movies to display
  const displayedMovies = isSearching ? searchResults : [...trendingMovies, ...availableMovies];
  const title = isSearching ? "Search Results" : "Trending Movies";

  // Load initial trending movies
  useEffect(() => {
    if (!isSearching && trendingMovies.length === 0) {
      loadTrending();
    }
  }, [isSearching, loadTrending, trendingMovies.length]);

  const handleSearch = (query: string) => {
    const trimmedQuery = query.trim();
    setSearchQuery(trimmedQuery);
    setIsSearching(!!trimmedQuery);
    if (trimmedQuery) {
      search(trimmedQuery);
    } else {
      // If search is cleared, show trending movies
      loadTrending();
    }
  };

  // Load more movies based on current mode
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

  // Infinite scroll hook
  const [isFetching] = useInfiniteScroll(loadMoreMovies, hasMore);

  if (loading && !displayedMovies.length) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="home-page">
      <SearchBar onSearch={handleSearch} />
      
      <MovieGrid 
        movies={displayedMovies} 
        title={title} 
      />
      
      {(isFetching || loading) && hasMore && (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      )}
      
      {!hasMore && displayedMovies.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          No more movies to show
        </div>
      )}
    </div>
  );
}