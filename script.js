const servers = [
    'onlyno777sve00.love999.us.kg',
    'cfip.xxxxxxx.nyc.mn'
];

function getServerIndex(ip) {
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
        hash = (hash << 5) - hash + ip.charCodeAt(i);
        hash |= 0; // 转换为 32 位整数
    }
    return Math.abs(hash) % servers.length;
}

async function fetchData() {
    // 模拟获取用户 IP（在实际应用中可以通过外部服务获取）
    const ip = await getUserIP();
    const server = servers[getServerIndex(ip)];
    
    // 示例请求
    const url = `https://${server}/your-endpoint`;
    try {
        const response = await fetch(url);
        const data = await response.text();
        document.getElementById('response').textContent = data;
    } catch (error) {
        document.getElementById('response').textContent = '请求失败：' + error;
    }
}

async function getUserIP() {
    // 此处应实现实际获取用户 IP 的逻辑
    return 'default-ip'; // 默认 IP
}

document.getElementById('fetchData').addEventListener('click', fetchData);
