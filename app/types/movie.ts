export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type SearchMovieSuccessResponse = {
  status: 'success';
  message: string;
  data: Movie[];
  meta: {
    page: number;
    totalPages: number;
    totalResults: number;
  };
};

export type SearchMovieErrorResponse = {
  status: 'error';
  message: string;
};

export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export type TMDBMovieResponse = {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
};
