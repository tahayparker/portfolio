/**
 * API Route: GET /api/volunteering
 * Fetches all volunteering experiences ordered by display order
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all volunteering entries ordered by displayOrder (ascending)
    const volunteering = await prisma.volunteering.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform data to match frontend interface
    const transformedVolunteering = volunteering.map((vol: {
      id: string;
      company: string;
      position: string;
      duration: string;
      location: string;
      description: string[];
      technologies: string[];
      link: string | null;
      logoLight: string | null;
      logoDark: string | null;
    }) => ({
      id: vol.id,
      company: vol.company,
      position: vol.position,
      duration: vol.duration,
      location: vol.location,
      description: vol.description,
      technologies: vol.technologies,
      link: vol.link,
      logo: vol.logoLight && vol.logoDark ? {
        light: vol.logoLight,
        dark: vol.logoDark,
      } : undefined,
    }));

    return NextResponse.json(transformedVolunteering);
  } catch (error) {
    console.error('Error fetching volunteering:', error);
    return NextResponse.json(
      { error: 'Failed to fetch volunteering experiences' },
      { status: 500 }
    );
  }
}
