const WebSocket = require('ws');

const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// Home Assistant 配置
const wsUrl = 'ws://supervisor/core/api/websocket';
const haToken = process.env.SUPERVISOR_TOKEN;

const SUPERVISOR_URL = "http://supervisor/core";

console.log(`wsUrl = `, wsUrl);
console.log(`haToken = `, haToken);

// // 创建 WebSocket 连接
const ws = new WebSocket(wsUrl, {
  autoPong: true,
  headers: {
    Authorization: `Bearer ${haToken}`,
    "Content-Type": "application/json",
  }
});

// // 监听 WebSocket 连接打开事件
ws.on('open', () => {
  console.log('WebSocket connection opened');
});

let bluetoothConfig = null;
// // 监听 WebSocket 消息事件
ws.on('message', (data) => {
  // console.log(`message1 =>`, data);s'sss

  // console.log(`message =>`, data.toString());
  const message = JSON.parse(data);
  if (message.type === 'event') {
    const event = message.event;
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
    ws.send(
      JSON.stringify({ "type": "config_entries/get", "domain": "bluetooth", "id": 1 })
    );

    setInterval(() => {
      ws.ping();
    }, 5000);

  } else if (message.id === 1) {
    bluetoothConfig = message.result[0];
    console.log(`bluetooth = `, data.toString());
  } else {
    console.log('Received message:', data.toString());
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
  setTimeout(async () => {
    try {
      const response = await axios.post(`${SUPERVISOR_URL}/api/config/config_entries/options/flow`, {
        "handler": bluetoothConfig.entry_id,
        "show_advanced_options": false
      }, { headers });
      console.log(`flow info response = `, JSON.stringify(response.data));

      const dataSchema = response.data.data_schema[0];
      const requestName = dataSchema.name;

      if (dataSchema?.description?.suggested_value === false) {
        const flow_id = response.data.flow_id;
        const response1 = await axios.post(`${SUPERVISOR_URL}/api/config/config_entries/options/flow/${flow_id}`, {
          [requestName]: true
        }, { headers });

        console.log(`/api/config/config_entries/options/flow/${flow_id} response2 =`, JSON.stringify(response1.data))

      }
    } catch (e) {
      console.log(e);
    }
  }, 2000);


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

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/api/services`, { headers });
  //   console.log(`/services services = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e?.response?.status);
  // }

  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/core/api/events`, { headers });
  //   console.log(`/events events = `, JSON.stringify(response.data));
  // } catch (e) {
  //   console.log(e);
  // }

  // HA addon 环境停止zigee2mqtt addon demo
  // try {
  //   const response = await axios.get(`${SUPERVISOR_URL}/addons`, { headers });
  //   // console.log(`/addons zigbee2mqtt = `, JSON.stringify(response.data));

  //   const addons = response.data.data.addons;
  //   const zigbee2mqtt = addons.find(item => item.slug.includes("zigbee2mqtt"));
  //   console.log(`zigbee2mqtt`, zigbee2mqtt);

  //   const state = await axios.get(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/info`, { headers });
  //   console.log(`info 1`, JSON.stringify(state.data));

  //   if (state.data.state != "started") {
  //     const stopRes = await axios.post(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/stop`, {}, { headers });
  //     console.log(`/stop`, JSON.stringify(stopRes.data));
  //     const state2 = await axios.get(`${SUPERVISOR_URL}/addons/${zigbee2mqtt.slug}/info`, { headers });
  //     console.log(`info 2`, JSON.stringify(state2.data));
  //   }

  // } catch (e) {
  //   console.log(e);
  // }
})();
