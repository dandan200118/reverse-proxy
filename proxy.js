export default async function handler(req, res) {
  const url = 'https://api.anthropic.com' + req.url;

  // 复制原始请求的 Headers
  const headers = { ...req.headers };

  // 添加自定义的 Headers
  headers['User-Agent'] = 'PostmanRuntime/7.38.0';
  // 如果需要添加多个 Header，可以继续添加
  // headers['Another-Header-Name'] = 'Another-Header-Value';

  // 转发请求到目标地址，并包含自定义的 Headers
  const response = await fetch(url, {
    method: req.method,
    headers: headers,
    body: req.body,
  });

  // 将响应结果返回给客户端
  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  const data = await response.buffer();
  res.send(data);
}
