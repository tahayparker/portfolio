import { NextRequest, NextResponse } from 'next/server';

;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Await the params promise to get the actual path object
    const { path } = await params;
    const imagePath = path.join('/');

    // Access the R2 bucket from process.env.
    // OpenNext makes the binding available here at runtime.
    const bucket = process.env.PORTFOLIO_IMAGES;

    if (!bucket) {
      console.error('R2 bucket binding "PORTFOLIO_IMAGES" not found on process.env.');
      return new NextResponse('R2 bucket not configured', { status: 500 });
    }

    // Get the object from R2
    const object = await bucket.get(imagePath);

    if (!object) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Return the image with appropriate headers
    const headers = new Headers();
    headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new NextResponse(object.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Error fetching image from R2:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}