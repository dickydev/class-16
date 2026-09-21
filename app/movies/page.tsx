import type { Metadata } from 'next';

import MovieGrid from '../components/movies/MoviesGrid';
import MovieSearch from '../components/movies/MovieSearch';
import { getPopularMovies } from '../lib/movie';

export const metadata: Metadata = {
  title: 'Movies',
  description: 'Jelajahi popular movie dan cari movie favoritmu.',
};

export default async function MoviesPage() {
  const data = await getPopularMovies();

  return (
    <main className="container">
      <section className="hero">
        <span className="section-label">Movie Explorer</span>

        <h1>Temukan Movie Favoritmu</h1>

        <p>
          Lihat daftar movie populer dan gunakan fitur pencarian untuk menemukan
          movie yang ingin kamu tonton.
        </p>
      </section>

      <MovieSearch />

      <section className="popular-section" aria-labelledby="popular-title">
        <div className="section-heading">
          <div>
            <span className="section-label">Popular</span>

            <h2 id="popular-title">Popular Movies</h2>

            <p>Daftar movie yang sedang populer saat ini.</p>
          </div>

          <span className="movie-total">{data.total_results} movie</span>
        </div>

        <MovieGrid movies={data.results} />
      </section>
    </main>
  );
}
