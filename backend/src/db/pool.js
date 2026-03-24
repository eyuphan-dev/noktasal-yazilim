import { Pool } from 'pg'
import { env } from '../config/env.js'

function createConfig() {
  if (env.databaseUrl) {
    return {
      connectionString: env.databaseUrl,
      ssl: env.pgSsl ? { rejectUnauthorized: false } : false,
    }
  }

  return {
    host: env.pgHost,
    port: env.pgPort,
    database: env.pgDatabase,
    user: env.pgUser,
    password: env.pgPassword,
    ssl: env.pgSsl ? { rejectUnauthorized: false } : false,
  }
}

export const pool = new Pool(createConfig())

export function query(text, params = []) {
  return pool.query(text, params)
}

export async function closePool() {
  await pool.end()
}
