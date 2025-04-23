const WebSocket = require('ws');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Home Assistant 配置
const wsUrl = 'ws://192.168.50.178:8123/api/websocket' ?? "ws://supervisor/core/api/websocket";
const haToken = process.env.SUPERVISOR_TOKEN ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1MDg0NTkyMmVjYjE0YjVkOTExZGQ2OGVhMDNmZDIzNSIsImlhdCI6MTc0NTI4ODQ5MiwiZXhwIjoyMDYwNjQ4NDkyfQ.U0GzczMUI7VUHZzjp-YpXnCE524BfoIrlIj_6Y96f3Y";

const SUPERVISOR_URL = "http://192.168.50.178:8123" ?? "http://supervisor";

// console.log(`wsUrl = `, wsUrl);
// console.log(`haToken = `, haToken);

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
  if (message.type === 'auth_required') {
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

    ws.send(
      JSON.stringify({
        "type": "config_entries/subscribe",
        // "type_filter": [
        //   "device"
        // ],
        "id": 1
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
    // console.log('Received message:', message);
    const data = message;
    const id = data.id;
    const type = data.type;
    if (type === "event") {
      const zha = data.event.find(f => f.entry.domain === "zha");
      if (zha && zha.entry.state === "loaded") {
        console.log(1111)
        const entryId = zha.entry.entry_id;
        ws.send(JSON.stringify({
          "type": "config_entries/disable",
          "entry_id": entryId,
          "disabled_by": "user",
          "id": 2
        }))
      }
    }
  }
});

// // 监听 WebSocket 错误事件
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// 监听 WebSocket 关闭事件
ws.on('close', () => {
  console.log('WebSocket connection closed');
});

// process.on("SIGINT", async (singals) => {
//   // await getSuperviorInfo();
//   console.log(` SIGINT singals = `, singals);
//   console.log(`date now = `, Date.now());
//   ws.close();

// });
// process.on("SIGTERM", async (singals) => {
//   // await getSuperviorInfo();
//   console.log(` SIGTERM singals = `, singals);
//   console.log(`date now = `, Date.now());
//   ws.close();
// });

const headers = {
  Authorization: `Bearer ${haToken}`,
  "Content-Type": "application/json",
};

async function getSuperviorInfo() {
  try {
    const response = await axios.get(`${SUPERVISOR_URL}/info`, { headers });
    console.log(`end /info response = `, JSON.stringify(response.data));
  } catch (e) {
    console.log(e);
  }
}


