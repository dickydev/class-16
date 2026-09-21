import { NextRequest, NextResponse } from 'next/server';

type TmdbMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
};

type TmdbSearchResponse = {
  results: TmdbMovie[];
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      {
        message: 'Query wajib diisi',
      },
      {
        status: 400,
      }
    );
  }

  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        message: 'Server configuration error',
      },
      {
        status: 500,
      }
    );
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        message: 'Gagal mencari movie',
      },
      {
        status: response.status,
      }
    );
  }

  const data: TmdbSearchResponse = await response.json();

  const movies = data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: movie.poster_path,
  }));

  return NextResponse.json(movies);
}
