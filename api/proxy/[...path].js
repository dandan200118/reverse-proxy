// /pages/api/proxy/[...path].js

export const config = {
  runtime: 'edge', // 使用 Edge Function 以提高性能
};

export default async function handler(req) {
  const { pathname, search } = new URL(req.url);
  // 提取请求的路径，去掉 /api/proxy/ 前缀
  const path = pathname.replace(/^\/api\/proxy\//, '');
  // 构建目标 URL
  const url = `https://api.anthropic.com/${path}${search}`;

  // 复制原始请求的 headers
  const requestHeaders = new Headers(req.headers);

  // 添加您需要的自定义 header
  requestHeaders.set('Your-Custom-Header-Name', 'Your-Custom-Header-Value');

  // 删除或修改不需要的 headers
  requestHeaders.delete('host');

  // 转发请求到目标网站
  const response = await fetch(url, {
    method: req.method,
    headers: requestHeaders,
    body: req.bodyUsed ? await req.arrayBuffer() : undefined,
  });

  // 返回目标网站的响应
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
