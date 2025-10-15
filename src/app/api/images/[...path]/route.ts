import { NextRequest, NextResponse } from 'next/server';

// Cloudflare Workers type for R2
interface Env {
  PORTFOLIO_IMAGES?: R2Bucket;
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
}

interface R2Object {
  body: ReadableStream;
  httpMetadata?: {
    contentType?: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    const imagePath = path.join('/');

    // Get the R2 bucket from the environment
    const env = (process.env as unknown as Env);
    const bucket = env.PORTFOLIO_IMAGES;

    if (!bucket) {
      console.error('R2 bucket not configured');
      return new NextResponse('R2 bucket not configured', { status: 500 });
    }

    // Get the object from R2
    const object = await bucket.get(imagePath);

    if (!object) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Determine content type from the file extension
    const ext = imagePath.split('.').pop()?.toLowerCase();
    const contentTypeMap: { [key: string]: string } = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'pdf': 'application/pdf',
    };

    const contentType = object.httpMetadata?.contentType || contentTypeMap[ext || ''] || 'application/octet-stream';

    // Return the image with appropriate headers
    return new NextResponse(object.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error fetching image from R2:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
