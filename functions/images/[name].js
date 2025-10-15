// Function: A proxy for private R2 bucket images.
// Location: /functions/images/[name].js

export async function onRequest(context) {
  const { env, request, params } = context;
  const imagePath = params.name;

  // Implement optional hot-link protection using the Referer header.
  // This is a common security measure for public-facing content.
  const referer = request.headers.get('Referer');
  const host = request.headers.get('Host');

  if (referer && !referer.startsWith(`https://${host}`)) {
    return new Response('Unauthorized Access', { status: 403 });
  }

  // Retrieve the image object from the bound R2 bucket.
  const object = await tahayparker_portfolio.get(imagePath);

  // Handle the case where the requested object does not exist.
  if (object === null) {
    return new Response('Image Not Found', { status: 404 });
  }

  // Generate response headers dynamically based on the object's metadata.
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('ETag', object.httpEtag);

  // Return a new Response with the object's body and generated headers.
  return new Response(object.body, { headers });
}
