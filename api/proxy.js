// pages/api/[...path].js

export default async function handler(req, res) {
  // 获取请求的路径参数
  const { path } = req.query;

  // 构建目标 URL
  const targetUrl = `https://api.anthropic.com/${path.join('/')}`;

  try {
    // 构建请求头，添加自定义请求头
    const headers = {
      ...req.headers,
      'Your-Header-Name': 'Your-Header-Value', // 请将此处替换为您需要的请求头键值对
    };
    delete headers.host; // 删除 host 头，避免干扰

    // 发起请求到目标网站
    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
    });

    // 设置响应状态码
    res.status(response.status);

    // 转发目标网站的响应头
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // 获取响应内容
    const data = await response.arrayBuffer();

    // 发送响应内容
    res.send(Buffer.from(data));
  } catch (error) {
    // 处理错误
    console.error('Proxy Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
