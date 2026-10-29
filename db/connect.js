import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const env = {
    host: 'ep-solitary-shape-bao36f77-pooler.c-8.eu-central-1.aws.neon.tech',
    port: 5432,
    database: 'music',
    user: 'neondb_owner',
    password: 'npg_PlkFhTg0K1uz',
    ssl: { rejectUnauthorized: false },
};

export async function connect() {
    const client = new pg.Client(env);
    await client.connect();
    return client;
}
  
export function pool() {
    return new pg.Pool(env);
}