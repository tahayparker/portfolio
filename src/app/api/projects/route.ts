/**
 * API Route: GET /api/projects
 * Fetches all projects ordered by display order
 * Supports filtering by project type via query parameter
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'personal' or 'university'

    // Build query filters
    const where = type ? { projectType: type as 'personal' | 'university' } : {};

    // Fetch projects with optional filtering
    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' }, // Featured projects first
        { displayOrder: 'asc' },
      ],
    });

    // Transform data to match frontend interface
    const transformedProjects = projects.map((project: {
      id: string;
      title: string;
      slug: string;
      description: string;
      githubUrl: string | null;
      liveUrl: string | null;
      projectType: string;
      technologies: string[];
      featured: boolean;
      displayOrder: number;
      createdAt: Date;
      updatedAt: Date;
    }) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      github_url: project.githubUrl,
      live_url: project.liveUrl,
      project_type: project.projectType,
      technologies: project.technologies,
      featured: project.featured,
      display_order: project.displayOrder,
      created_at: project.createdAt.toISOString(),
      updated_at: project.updatedAt.toISOString(),
    }));

    return NextResponse.json(transformedProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
