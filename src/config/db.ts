import { Pool } from 'pg'

const { DB_HOST, DB_USER, DB_PASSWORD, DB, DB_PORT } = process.env

export const psql = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionTimeoutMillis: 2000,
  database: DB,
  port: DB_PORT! as unknown as number,
})
