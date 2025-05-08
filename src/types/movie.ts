export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
  }
  
 export interface MovieDetails extends Movie {
    overview: string;
    runtime: number;
    genres: {
      id: number;
      name: string;
    }[];
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
      }[];
    };
  }