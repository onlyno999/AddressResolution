export async function onRequest(context) {
  const servers = [
    'onlyno777sve00.love999.us.kg',
    'cfip.xxxxxxx.nyc.mn'
  ];

  function getServerIndex(ip) {
    // 生成散列值（这里使用简单的模运算）
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      hash = (hash << 5) - hash + ip.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) % servers.length;
  }

  // 获取请求的源 IP 地址（通过 headers）
  const ip = context.request.headers.get('cf-connecting-ip') || 'default-ip';

  // 选择目标 URL
  let url = new URL(context.request.url);
  url.hostname = servers[getServerIndex(ip)];

  // 创建转发请求
  let newRequest = new Request(url, context.request);

  // 转发请求并返回响应
  return fetch(newRequest);
}
