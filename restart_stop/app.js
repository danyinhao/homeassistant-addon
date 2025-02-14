const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const SUPERVISOR_URL = "http://supervisor";
const SUPERVISOR_TOKEN = process.env.SUPERVISOR_TOKEN;
console.log(`SUPERVISOR_TOKEN = `, SUPERVISOR_TOKEN);

const headers = {
  Authorization: `Bearer ${SUPERVISOR_TOKEN}`,
  "Content-Type": "application/json",
};

// 重启 Home Assistant
app.post('/restart', async (req, res) => {
  try {
    console.log('app restart');
    const response = await axios.post(`${SUPERVISOR_URL}/core/restart`, {}, { headers });
    res.json({ result: "success", data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 关闭 Home Assistant
app.post('/shutdown', async (req, res) => {
  try {
    console.log('app shutdown');
    const response = await axios.post(`${SUPERVISOR_URL}/core/shutdown`, {}, { headers });
    res.json({ result: "success", data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});