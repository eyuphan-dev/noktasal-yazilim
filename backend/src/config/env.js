const DEFAULT_PORT = 4000

function toNumber(value, fallback) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const env = {
  port: toNumber(process.env.PORT, DEFAULT_PORT),
  databaseUrl: process.env.DATABASE_URL || '',
  pgHost: process.env.PGHOST || '127.0.0.1',
  pgPort: toNumber(process.env.PGPORT, 5432),
  pgDatabase: process.env.PGDATABASE || 'noktasal_yazilim',
  pgUser: process.env.PGUSER || 'postgres',
  pgPassword: process.env.PGPASSWORD || '',
  pgSsl: process.env.PGSSL === 'true',
}
