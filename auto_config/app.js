const axios = require('axios');

// Home Assistant 配置
const haUrl = process.env.SUPERVISOR_URL || 'http://supervisor/core';
const haToken = process.env.SUPERVISOR_TOKEN;

console.log(`hatoken = `, haToken);

const getToken = async () => {
    try {
        const response = await axios.get(`http://supervisor/auth`, {
            headers: {
                Authorization: `Bearer ${haToken}`,
                "Content-Type": "application/json",
                "X-Supervisor-Token": `Bearer ${haToken}`
              },
        });

        console.log(`getToken response`, response.data);
    } catch (error) {
        console.log(`getToken error`, error.message);
    }
};

// 创建自动化
const createAutomation = async () => {
  try {
    const response = await axios.post(
      `http://homeassistant:8123/api/config/automation/config/motion_light`,
      {
        "id": "auto_restart_ha",
        "alias": "",
        "trigger": [
            {
                "platform": "homeassistant",
                "event": "shutdown"
            }
        ],
        "condition": [],
        "action": [
            {
                "service": "mqtt.publish",
                "data": {
                  "topic": "ihost/hardware/light/",
                  "payload": "off",
                  "qos": 0,
                  "retain": true
                }
            }
        ]
        },
      {
        headers: {
            "access_token": `${haToken}`,
            Authorization: `Bearer ${haToken}`,
            "Content-Type": "application/json",
        },
      }
    );

    console.log("Automation created:", response.data);
  } catch (error) {
    console.error("Failed to create automation:", error.response ? error.response.data : error.message);
  }
};

// 启动时创建自动化
(async ()=> {
    // await getToken();
    await createAutomation();
})();