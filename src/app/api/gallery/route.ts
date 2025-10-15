/**
 * API Route: GET /api/gallery
 * Fetches all visible gallery images ordered by display order
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET() {
  try {
    // Fetch all visible gallery images ordered by displayOrder (ascending)
    const gallery = await prisma.gallery.findMany({
      where: {
        isVisible: true,
      },
      orderBy: {
        displayOrder: 'asc',
      },
    });

    // Transform data to match frontend interface
    const transformedGallery = gallery.map((img: {
      id: string;
      imagePath: string;
      caption: string;
      altText: string;
    }) => ({
      id: img.id,
      src: img.imagePath,
      caption: img.caption,
      alt: img.altText,
    }));

    return NextResponse.json(transformedGallery);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
