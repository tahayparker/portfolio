/**
 * API Route: GET /api/projects/[slug]
 * Fetches a single project by its slug with full details
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Fetch project by slug
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }

    // Transform data to include all detailed content
    const transformedProject = {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      github_url: project.githubUrl,
      live_url: project.liveUrl,
      project_type: project.projectType,
      technologies: project.technologies,
      featured: project.featured,
      // Detailed page content
      background_content: project.backgroundContent,
      overview_content: project.overviewContent,
      key_features: project.keyFeatures,
      technical_details: project.technicalDetails,
      image_url: project.imageUrl,
      related_projects: project.relatedProjects,
      created_at: project.createdAt.toISOString(),
      updated_at: project.updatedAt.toISOString(),
    };

    return NextResponse.json(transformedProject);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}
