#!/usr/bin/env bashio

MQTT_HOST=$(bashio::services mqtt "host")
MQTT_PORT=$(bashio::services mqtt "port")
MQTT_USER=$(bashio::services mqtt "username")
MQTT_PASS=$(bashio::services mqtt "password")

export MQTT_HOST MQTT_PORT MQTT_USER MQTT_PASS

exec "$@"   