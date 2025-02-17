const WebSocket = require('ws');

// Home Assistant 配置
const wsUrl = process.env.SUPERVISOR_WS_URL || 'ws://supervisor/core/websocket';
const haToken = process.env.SUPERVISOR_TOKEN;

console.log(`wsUrl = `, wsUrl);
console.log(`haToken = `, haToken);

// 创建 WebSocket 连接
const ws = new WebSocket(wsUrl, {
  headers: {
    Authorization: `Bearer ${haToken}`,
  },
});

// 监听 WebSocket 连接打开事件
ws.on('open', () => {
  console.log('WebSocket connection opened');

  // 发送认证消息
  ws.send(
    JSON.stringify({
      type: 'auth',
      Authorization: `Bearer ${haToken}`,
    })
  );

  // 订阅事件
  ws.send(
    JSON.stringify({
      id: 1, // 请求 ID
      type: 'subscribe_events',
      event_type: 'homeassistant_stop', // 监听的事件类型
    })
  );

  ws.send(
    JSON.stringify({
      id: 2, // 请求 ID
      type: 'subscribe_events',
      event_type: 'homeassistant_start', // 监听的事件类型
    })
  );
});

// 监听 WebSocket 消息事件
ws.on('message', (data) => {
  console.log(`message =>`, data.toString());
  const message = JSON.parse(data);
  if (message.type === 'event') {
    const event = message.event;

    if (event.event_type === 'homeassistant_stop') {
      console.log('Home Assistant is stopping...');
      // 在这里执行关机逻辑
    } else if (event.event_type === 'homeassistant_start') {
      console.log('Home Assistant is starting...');
      // 在这里执行启动逻辑
    }
  } else if (message.type === 'auth_required') {
    console.log('Authentication required');
  } else if (message.type === 'auth_ok') {
    console.log('Authentication successful');
  } else {
    console.log('Received message:', message);
  }
});

// 监听 WebSocket 错误事件
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// 监听 WebSocket 关闭事件
ws.on('close', () => {
  console.log('WebSocket connection closed');
});