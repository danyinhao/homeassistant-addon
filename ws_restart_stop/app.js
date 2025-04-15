const WebSocket = require('ws');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Home Assistant 配置
const wsUrl = 'ws://supervisor/core/api/websocket';
const haToken = process.env.SUPERVISOR_TOKEN;

const SUPERVISOR_URL = "http://supervisor";

console.log(`wsUrl = `, wsUrl);
console.log(`haToken = `, haToken);

// 创建 WebSocket 连接
const ws = new WebSocket(wsUrl, {
  autoPong: true,
  headers: {
    Authorization: `Bearer ${haToken}`,
    "Content-Type": "application/json",
  }
});

// 监听 WebSocket 连接打开事件
ws.on('open', () => {
  console.log('WebSocket connection opened');
});

// 监听 WebSocket 消息事件
ws.on('message', (data) => {
  // console.log(`message1 =>`, data);s'sss

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
    // 发送认证消息
    ws.send(
      JSON.stringify({
        type: 'auth',
        access_token: haToken,
      })
    );
  } else if (message.type === 'auth_ok') {
    console.log('Authentication successful');
    const id = Math.floor(Math.random() * 900000) + 100000;
    // 订阅事件
    ws.send(
      JSON.stringify({
        id, // 请求 ID
        type: 'subscribe_trigger',
        // event_type: 'shutdown', // 监听的事件类型
        trigger: {
          "platform": "homeassistant",
          "event": "shutdown"
        }
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 1, // 请求 ID
        type: 'subscribe_events',
        event_type: 'EVENT_HOMEASSISTANT_STOP', // 监听的事件类型
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 2, // 请求 ID
        type: 'subscribe_events',
        event_type: 'homeassistant_started', // 监听的事件类型
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 3, // 请求 ID
        type: 'subscribe_events',
        event_type: 'homeassistant_start', // 监听的事件类型
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 4, // 请求 ID
        type: 'subscribe_events',
        event_type: 'homeassistant_stop', // 监听的事件类型
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 5, // 请求 ID
        type: 'subscribe_events',
        event_type: 'homeassistant_final_write', // 监听的事件类型
      })
    );

    ws.send(
      JSON.stringify({
        id: id + 6, // 请求 ID
        type: 'subscribe_events',
        event_type: 'homeassistant_close', // 监听的事件类型
      })
    );

    setInterval(() => {
      ws.ping();
    }, 5000);

    // ws.send(
    //     JSON.stringify({
    // id: 2, // 请求 ID
    // type: 'subscribe_events',
    // event_type: 'homeassistant_start', // 监听的事件类型
    //     })
    // );

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

process.on("SIGINT", (singals) => {
  console.log(` SIGINT singals = `, singals);
  console.log(`date now = `, Date.now());
});
process.on("SIGTERM", (singals) => {
  console.log(` SIGTERM singals = `, singals);
  console.log(`date now = `, Date.now());
});


(async () => {
  const headers = {
    Authorization: `Bearer ${haToken}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.get(`${SUPERVISOR_URL}/core/api/states`, {}, { headers });
    console.log(`/core/api/states response = `, JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await axios.get(`${SUPERVISOR_URL}/core/info`, {}, { headers });
    console.log(`/core/info response = `, JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await axios.get(`${SUPERVISOR_URL}/core/api/states`, {}, { headers });
    console.log(`/core/api/states response = `, JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }

  try {
    const response = await axios.get(`${SUPERVISOR_URL}/core/api/events`, {}, { headers });
    console.log(`/core/api/events response = `, JSON.stringify(response));
  } catch (e) {
    console.log(e);
  }
})();
