'use client';

import { useQuery } from '@tanstack/react-query';
import { SubmitEvent, useState } from 'react';

import MovieGrid from './MoviesGrid';
import MovieSkeleton from './MoviesSkeleton';
import type {
  SearchMovieErrorResponse,
  SearchMovieSuccessResponse,
} from '@/app/types/movie';

async function fetchSearchMovies(
  query: string
): Promise<SearchMovieSuccessResponse> {
  const response = await fetch(
    `/api/movies/search?q=${encodeURIComponent(query)}`
  );

  const responseText = await response.text();

  if (!responseText) {
    throw new Error(
      `Server mengembalikan response kosong. HTTP ${response.status}.`
    );
  }

  let result: SearchMovieSuccessResponse | SearchMovieErrorResponse;

  try {
    result = JSON.parse(responseText) as
      | SearchMovieSuccessResponse
      | SearchMovieErrorResponse;
  } catch {
    console.error('Response bukan JSON:', responseText);

    throw new Error(
      `Server mengembalikan format yang tidak valid. HTTP ${response.status}.`
    );
  }

  if (!response.ok || result.status === 'error') {
    throw new Error(result.message);
  }

  return result;
}

export default function MovieSearch() {
  const [input, setInput] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const { data, error, isError, isFetching, isPending } = useQuery({
    queryKey: ['movies', 'search', submittedQuery],
    queryFn: () => fetchSearchMovies(submittedQuery),
    enabled: submittedQuery.length >= 2,
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedInput = input.trim();

    if (normalizedInput.length < 2) {
      return;
    }

    setSubmittedQuery(normalizedInput);
  }

  function handleReset() {
    setInput('');
    setSubmittedQuery('');
  }

  const isInitialLoading = isPending && submittedQuery.length >= 2;

  return (
    <section className="search-section" aria-labelledby="search-title">
      <div className="section-heading">
        <div>
          <span className="section-label">Search</span>

          <h2 id="search-title">Cari Movie</h2>

          <p>Masukkan minimal dua karakter untuk mencari movie.</p>
        </div>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <label htmlFor="movie-search" className="sr-only">
          Judul movie
        </label>

        <input
          id="movie-search"
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Contoh: Batman"
          autoComplete="off"
        />

        <button type="submit" disabled={input.trim().length < 2 || isFetching}>
          {isFetching ? 'Mencari...' : 'Cari'}
        </button>

        {(input || submittedQuery) && (
          <button
            type="button"
            className="button-secondary"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </form>

      {input.length > 0 && input.trim().length < 2 && (
        <p className="form-hint">Masukkan minimal 2 karakter.</p>
      )}

      {isInitialLoading && <MovieSkeleton total={4} />}

      {isError && (
        <div className="error-message" role="alert">
          <h3>Pencarian gagal</h3>
          <p>
            {error instanceof Error
              ? error.message
              : 'Terjadi kesalahan yang tidak diketahui.'}
          </p>
        </div>
      )}

      {data && !isInitialLoading && (
        <div className="search-result">
          <div className="search-result__header">
            <h3>Hasil pencarian “{submittedQuery}”</h3>

            <span>{data.meta.totalResults} hasil</span>
          </div>

          <MovieGrid
            movies={data.data}
            emptyMessage={`Movie dengan kata kunci “${submittedQuery}” tidak ditemukan.`}
          />
        </div>
      )}
    </section>
  );
}
