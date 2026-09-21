import Image from 'next/image';

import type { Movie } from '@/app/types/movie';

type MovieCardProps = {
  movie: Movie;
};

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function formatReleaseDate(releaseDate: string): string {
  if (!releaseDate) {
    return 'Tanggal rilis belum tersedia';
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(releaseDate));
}

function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="movie-card">
      <div className="movie-card__poster">
        {movie.poster_path ? (
          <Image
            src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
            alt={`Poster ${movie.title}`}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              25vw
            "
            className="movie-card__image"
          />
        ) : (
          <div className="movie-card__poster-fallback">
            <span>Poster tidak tersedia</span>
          </div>
        )}

        <span className="movie-card__rating">
          ⭐ {formatRating(movie.vote_average)}
        </span>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>

        <p className="movie-card__release-date">
          {formatReleaseDate(movie.release_date)}
        </p>

        <p className="movie-card__overview">
          {movie.overview || 'Deskripsi movie belum tersedia.'}
        </p>
      </div>
    </article>
  );
}
