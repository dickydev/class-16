type MovieSkeletonProps = {
  total?: number;
};

export default function MovieSkeleton({ total = 8 }: MovieSkeletonProps) {
  return (
    <div
      className="movie-grid"
      aria-label="Sedang memuat movie"
      aria-busy="true"
    >
      {Array.from({ length: total }).map((_, index) => (
        <div className="movie-skeleton" key={index}>
          <div className="skeleton movie-skeleton__poster" />

          <div className="movie-skeleton__content">
            <div className="skeleton movie-skeleton__title" />
            <div className="skeleton movie-skeleton__date" />
            <div className="skeleton movie-skeleton__text" />
            <div className="skeleton movie-skeleton__text" />
            <div className="skeleton movie-skeleton__text-short" />
          </div>
        </div>
      ))}
    </div>
  );
}
