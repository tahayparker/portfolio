/**
 * API Route: GET /api/experiences
 * Fetches all work experiences ordered by display order
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Fetch all experiences ordered by displayOrder (ascending)
    const experiences = await prisma.experience.findMany({
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform data to match frontend interface
    const transformedExperiences = experiences.map((exp: {
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
      id: exp.id,
      company: exp.company,
      position: exp.position,
      duration: exp.duration,
      location: exp.location,
      description: exp.description,
      technologies: exp.technologies,
      link: exp.link,
      logo: exp.logoLight && exp.logoDark ? {
        light: exp.logoLight,
        dark: exp.logoDark,
      } : undefined,
    }));

    return NextResponse.json(transformedExperiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiences' },
      { status: 500 }
    );
  }
}
