/**
 * API Route: GET /api/certifications
 * Fetches all certifications ordered by display order
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch all certifications ordered by displayOrder (ascending)
    const certifications = await prisma.certification.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform data to match frontend interface
    const transformedCertifications = certifications.map((cert: {
      id: string;
      name: string;
      issuer: string;
      date: string;
      credentialUrl: string;
      credentialUrl2: string | null;
      description: string;
    }) => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      credentialUrl: cert.credentialUrl,
      credentialUrl2: cert.credentialUrl2,
      description: cert.description,
    }));

    return NextResponse.json(transformedCertifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch certifications' },
      { status: 500 }
    );
  }
}
