const WebSocket = require('ws');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Home Assistant 配置
const wsUrl = 'ws://supervisor/core/api/websocket';
const haToken = process.env.SUPERVISOR_TOKEN;

const SUPERVISOR_URL = "http://supervisor";

// console.log(`wsUrl = `, wsUrl);
// console.log(`haToken = `, haToken);

// // 创建 WebSocket 连接
// const ws = new WebSocket(wsUrl, {
//   autoPong: true,
//   headers: {
//     Authorization: `Bearer ${haToken}`,
//     "Content-Type": "application/json",
//   }
// });

// // 监听 WebSocket 连接打开事件
// ws.on('open', () => {
//   console.log('WebSocket connection opened');
// });

// // 监听 WebSocket 消息事件
// ws.on('message', (data) => {
//   // console.log(`message1 =>`, data);s'sss

//   console.log(`message =>`, data.toString());
//   const message = JSON.parse(data);
// if (message.type === 'event') {
//   const event = message.event;

//   if (event.event_type === 'homeassistant_stop') {
//     console.log('Home Assistant is stopping...');
//     // 在这里执行关机逻辑
//   } else if (event.event_type === 'homeassistant_start') {
//     console.log('Home Assistant is starting...');
//     // 在这里执行启动逻辑
//   }
// } else if (message.type === 'auth_required') {
//   console.log('Authentication required');
//   // 发送认证消息
//   ws.send(
//     JSON.stringify({
//       type: 'auth',
//       access_token: haToken,
//     })
//   );
// } else if (message.type === 'auth_ok') {
//   console.log('Authentication successful');
//   const id = Math.floor(Math.random() * 900000) + 100000;
//     // 订阅事件
//     // ws.send(
//     //   JSON.stringify({
//     //     id, // 请求 ID
//     //     type: 'subscribe_trigger',
//     //     // event_type: 'shutdown', // 监听的事件类型
//     //     trigger: {
//     //       "platform": "homeassistant",
//     //       "event": "shutdown"
//     //     }
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 1, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'EVENT_HOMEASSISTANT_STOP', // 监听的事件类型
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 2, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'homeassistant_started', // 监听的事件类型
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 3, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'homeassistant_start', // 监听的事件类型
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 4, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'homeassistant_stop', // 监听的事件类型
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 5, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'homeassistant_final_write', // 监听的事件类型
//     //   })
//     // );

//     // ws.send(
//     //   JSON.stringify({
//     //     id: id + 6, // 请求 ID
//     //     type: 'subscribe_events',
//     //     event_type: 'homeassistant_close', // 监听的事件类型
//     //   })
//     // );

//     setInterval(() => {
//       ws.ping();
//     }, 5000);

//     // ws.send(
//     //     JSON.stringify({
//     // id: 2, // 请求 ID
//     // type: 'subscribe_events',
//     // event_type: 'homeassistant_start', // 监听的事件类型
//     //     })
//     // );

//   } else {
//     console.log('Received message:', message);
//   }
// });

// // 监听 WebSocket 错误事件
// ws.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });

// // 监听 WebSocket 关闭事件
// ws.on('close', () => {
//   console.log('WebSocket connection closed');
// });

process.on("SIGINT", async (singals) => {
  // await getSuperviorInfo();
  console.log(` SIGINT singals = `, singals);
  console.log(`date now = `, Date.now());
});
process.on("SIGTERM", async (singals) => {
  // await getSuperviorInfo();
  console.log(` SIGTERM singals = `, singals);
  console.log(`date now = `, Date.now());
});

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

(async () => {
  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/api/states`, { headers });
  //   console.log(`/core/api/states response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/info`, { headers });
  //   console.log(`/core/info response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/api/states`, { headers });
  //   console.log(`/core/api/states response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/api/events`, { headers });
  //   console.log(`/core/api/events response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/info`, { headers });
  //   console.log(`/info response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/services`, { headers });
  //   console.log(`/services response = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const response = await axios.get(
  //     `${haUrl}/api/config/automation/config`,
  //     {
  //       headers
  //     }
  //   );

  //   // if (response.data?.id === "auto_restart_ha2") flag = true;
  //   console.log("Automation get:", JSON.stringify(response.data));
  // } catch (error) {
  //   console.error("Failed to get automation:", error.response ? error.response.data : error.message);
  // }
  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/api/config/config_entries`, { headers });
  //   console.log(`/config config = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e?.response?.status);
  // }

  try {
    const response = await axios.get(`${SUPERVISOR_URL}/api/services`, { headers });
    console.log(`/services services = `, JSON.stringify(response.data));
  } catch (e) {
    console.log(e?.response?.status);
  }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/api/events`, { headers });
  //   console.log(`/events events = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // HA addon 环境停止zigee2mqtt addon demo
  try {
    const response = await axios.get(`${SUPERVISOR_URL}/addons`, { headers });
    // console.log(`/addons zigbee2mqtt = `, JSON.stringify(response.data));

    const addons = response.data.data.addons;
    const zigbee2mqtt = addons.find(item => item.slug.includes("zigbee2mqtt"));
    console.log(`zigbee2mqtt`, zigbee2mqtt);

    const state = await axios.get(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/info`, { headers });
    console.log(`info 1`, JSON.stringify(state.data));

    if (state.data.state != "started") {
      const stopRes = await axios.post(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/stop`, {}, { headers });
      console.log(`/stop`, JSON.stringify(stopRes.data));
      const state2 = await axios.get(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/info`, { headers });
      console.log(`info 2`, JSON.stringify(state2.data));
    }

  } catch (e) {
    console.log(e);
  }
})();
