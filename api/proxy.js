export default async function handler(req, res) {
  const url = 'https://api.anthropic.com' + req.url;

  // 复制原始请求头
  const headers = { ...req.headers };

  // 添加自定义请求头
  headers['User-Agent'] = 'Your-Header-Value';
  // 如果需要，继续添加其他请求头
  // headers['Another-Header-Name'] = 'PostmanRuntime/7.38.0';

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // 转发响应状态码和头信息
    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 发送响应体
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('请求转发时发生错误：', error);
    res.status(500).send('Internal Server Error');
  }
}
