/**
 * Prisma Client Configuration for Supabase
 *
 * Direct connection to Supabase PostgreSQL database
 * Works with Cloudflare Pages and other serverless environments
 */

import { PrismaClient } from '@prisma/client';

// Declare global type for Prisma client caching
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

/**
 * Creates and returns a Prisma client instance
 * Uses direct connection to Supabase PostgreSQL
 */
function createPrismaClient() {
  return new PrismaClient({
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
