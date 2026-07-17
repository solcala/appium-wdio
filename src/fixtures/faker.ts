import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
dotenv.config({ path: path.join(repoRoot, '.env') });

/**
 * Optional reproducibility: set TEST_DATA_SEED in `.env` to a positive integer.
 * When unset, each run gets fresh random checkout data.
 */
const seedRaw = process.env.TEST_DATA_SEED?.trim();
if (seedRaw) {
  const seed = Number.parseInt(seedRaw, 10);
  if (!Number.isFinite(seed)) {
    throw new Error(
      `TEST_DATA_SEED must be an integer when set (received "${seedRaw}")`
    );
  }
  faker.seed(seed);
}

export { faker };
