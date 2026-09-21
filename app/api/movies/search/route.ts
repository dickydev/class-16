import { NextRequest, NextResponse } from 'next/server';

import { searchMovies } from '@/app/lib/movie';

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get('q')?.trim() ?? '';

    if (query.length < 2) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Kata pencarian minimal terdiri dari 2 karakter.',
        },
        {
          status: 400,
        }
      );
    }

    const data = await searchMovies(query);

    return NextResponse.json(
      {
        status: 'success',
        message: 'Movie berhasil ditemukan.',
        data: data.results,
        meta: {
          page: data.page,
          totalPages: data.total_pages,
          totalResults: data.total_results,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('GET /api/movies/search error:', error);

    const message =
      error instanceof Error
        ? error.message
        : 'Terjadi kesalahan yang tidak diketahui.';

    return NextResponse.json(
      {
        status: 'error',
        message,
      },
      {
        status: 500,
      }
    );
  }
}
