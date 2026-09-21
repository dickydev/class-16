import MovieSkeleton from '../components/movies/MoviesSkeleton';

export default function Loading() {
  return (
    <main>
      <h1>Popular Movies</h1>
      <MovieSkeleton />
    </main>
  );
}
