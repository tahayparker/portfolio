/**
 * Prisma Client Configuration for Edge Runtime
 *
 * Uses Neon adapter for Cloudflare Pages Edge Runtime compatibility
 * Works with Supabase/Neon PostgreSQL database
 */

import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// Declare global type for Prisma client caching
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Creates and returns a Prisma client instance with Neon adapter for Edge Runtime
 */
function createPrismaClient() {
  // Use connection pooling for edge runtime
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaNeon(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

/**
 * Global Prisma client instance
 * Reuses the same instance in development to prevent connection exhaustion
 * Creates new instances in production for each request
 */
export const prisma = global.prisma || createPrismaClient();

// Cache the Prisma client in development to avoid creating multiple instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Helper function to safely disconnect Prisma client
 * Useful for cleanup in serverless functions
 */
export async function disconnectPrisma() {
  await prisma.$disconnect();
}
