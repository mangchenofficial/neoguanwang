// functions/[[catchall]].js
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname.slice(1); // 去掉开头的 /

  // 只处理以 raw/ 开头的请求
  if (path.startsWith('raw/')) {
    const target = path.slice(4);
    const response = await fetch(`https://raw.githubusercontent.com/${target}`, {
      headers: {
        'User-Agent': 'Cloudflare-Pages-Proxy',
      },
    });
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  }

  return new Response('Not found', { status: 404 });
}
