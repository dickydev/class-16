import 'server-only';

import { getTMDBApiKey } from './env';
import type {
  Movie,
  MovieResponse,
  TMDBMovie,
  TMDBMovieResponse,
} from '../types/movie';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

function transformMovie(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
  };
}

function transformMovieResponse(response: TMDBMovieResponse): MovieResponse {
  return {
    page: response.page,
    results: response.results.map(transformMovie),
    total_pages: response.total_pages,
    total_results: response.total_results,
  };
}

async function requestTMDB(
  pathname: string,
  searchParams?: Record<string, string>
): Promise<MovieResponse> {
  const { tmdbApiKey } = getTMDBApiKey();

  const url = new URL(`${TMDB_BASE_URL}${pathname}`);

  url.searchParams.set('api_key', tmdbApiKey);

  url.searchParams.set('language', 'en-US');

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    next: {
      revalidate: 300,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error('TMDB error response:', {
      status: response.status,
      body: errorBody,
    });

    throw new Error(`TMDB API gagal merespons. HTTP ${response.status}.`);
  }

  const data = (await response.json()) as TMDBMovieResponse;

  return transformMovieResponse(data);
}

export async function getPopularMovies(): Promise<MovieResponse> {
  return requestTMDB('/movie/popular', {
    page: '1',
  });
}

export async function searchMovies(query: string): Promise<MovieResponse> {
  const normalizedQuery = query.trim();

  if (normalizedQuery.length < 2) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  return requestTMDB('/search/movie', {
    query: normalizedQuery,
    page: '1',
    include_adult: 'false',
  });
}
