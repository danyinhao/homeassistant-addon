const mqtt = require('mqtt');
const axios = require('axios');

const SUPERVISOR_URL = "http://supervisor";
const SUPERVISOR_TOKEN = process.env.SUPERVISOR_TOKEN;
console.log(`SUPERVISOR_TOKEN = `, SUPERVISOR_TOKEN);

const headers = {
  Authorization: `Bearer ${SUPERVISOR_TOKEN}`,
  "Content-Type": "application/json",
};

// MQTT 配置
const mqttHost = 'localhost';
const mqttPort = 1883;
const mqttUser = 'app';
const mqttPassword = '1';
// const mqttTopic = 'ihost/hardware/status';

// 连接到 MQTT Broker
const mqttClient = mqtt.connect(`mqtt://${mqttHost}:${mqttPort}`, {
  username: mqttUser,
  password: mqttPassword,
});

mqttClient.subscribe("homeassistant/#");

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
});


mqtt.on('message', (data) => {
   console.log(`message =>`, data); 
});

