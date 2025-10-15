/**
 * API Route: GET /api/education
 * Fetches all education entries ordered by display order
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch all education entries ordered by displayOrder (ascending)
    const education = await prisma.education.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform data to match frontend interface
    const transformedEducation = education.map((edu: {
      id: string;
      school: string;
      degree: string;
      field: string;
      duration: string;
      location: string;
      description: string[];
    }) => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      duration: edu.duration,
      location: edu.location,
      description: edu.description,
    }));

    return NextResponse.json(transformedEducation);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}
