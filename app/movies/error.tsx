'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main>
      <h2>Gagal memuat movie</h2>

      <p>{error.message}</p>
      <button onClick={() => reset()} type="button">
        Coba Lagi
      </button>
    </main>
  );
}
