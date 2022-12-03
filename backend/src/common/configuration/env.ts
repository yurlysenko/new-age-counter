import { configDotenv } from 'dotenv';
import * as process from 'process';

configDotenv();

export const { PORT, JWT_SECRET, JWT_ISSUER, JWT_EXPIRATION } = process.env;
