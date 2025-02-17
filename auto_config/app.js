const axios = require('axios');

// Home Assistant 配置
const haUrl = process.env.SUPERVISOR_URL || 'http://supervisor/core';
const haToken = process.env.SUPERVISOR_TOKEN;

// 创建自动化
const createAutomation = async () => {
  try {
    const response = await axios.post(
      `${haUrl}/api/config/automation/config/motion_light`,
      {
        "id": "auto_restart_ha",
        "alias": "",
        "trigger": [ // 触发器是硬件示例发布restart状态
            {
                "service": "homeassistant",
                "event": "shutdown"
            }
        ],
        "condition": [],
        "action": [
            {
                "service": "homeassistant.restart" // 调用HA的重启服务
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