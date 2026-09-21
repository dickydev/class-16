import MovieCard from './MovieCard';
import { Movie } from '@/app/types/movie';

type MovieGridProps = {
  movies: Movie[];
  emptyMessage?: string;
};

export default function MovieGrid({
  movies,
  emptyMessage = 'Movie tidak ditemukan.',
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>Tidak ada data</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
