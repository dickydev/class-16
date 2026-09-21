function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(
      `Environment variable ${name} belum tersedia. ` +
        `Tambahkan ${name} ke dalam file .env.local.`
    );
  }

  return value;
}

export function getTMDBApiKey() {
  return {
    tmdbApiKey: getRequiredEnv('TMDB_API_KEY'),
  };
}
