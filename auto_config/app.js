const axios = require('axios');

// Home Assistant 配置
const haUrl = process.env.SUPERVISOR_URL || 'http://supervisor/core';
// const haToken = process.env.SUPERVISOR_TOKEN;

const haToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxY2I4ODU5ZDU4YTk0YzA3YjRmMmYxNmEwMmEwOGViOSIsImlhdCI6MTczOTQyNjg2MywiZXhwIjoyMDU0Nzg2ODYzfQ.7bO_ELzEfKRTRBeekV2QQxdSYip2wTNaXVKNRGS6rfg";

console.log(`hatoken = `, haToken);

// 创建自动化
const createAutomation = async () => {
  try {
    const response = await axios.post(
      `${haUrl}/api/config/automation/config/motion_light`,
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
createAutomation();