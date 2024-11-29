export default async function handler(req, res) {
  const url = 'https://api.anthropic.com' + req.url;

  // 复制请求头，并添加自定义的 Headers
  const headers = {
    ...req.headers,
    'Your-Header-Name': 'Your-Header-Value',
    // 如需添加更多自定义 Header，在此处添加
    // 'Another-Header-Name': 'Another-Header-Value',
  };

  try {
    // 使用 fetch 进行请求转发
    const response = await fetch(url, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // 设置响应状态码
    res.status(response.status);

    // 设置响应头
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 获取响应数据并返回
    const data = await response.arrayBuffer();
    res.send(Buffer.from(data));
  } catch (error) {
    console.error('Error occurred while proxying request:', error);
    res.status(500).send('Internal Server Error');
  }
}
