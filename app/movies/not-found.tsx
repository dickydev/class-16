import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="container">
      <div className="page-error">
        <span className="page-error__code">404</span>
      </div>
      <h1>Halaman tidak ditemukan</h1>

      <p>Halaman yang kamu cari tidak tersedia atau sudah dipindahkan.</p>

      <Link href="/movies" className="link-button">
        Kembali ke Movies
      </Link>
    </main>
  );
}
