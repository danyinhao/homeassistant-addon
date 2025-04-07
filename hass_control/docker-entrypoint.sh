#!/usr/bin/env bashio
bashio::log.info "Preparing to start..."

MQTT_HOST=$(bashio::services mqtt "host")
MQTT_PORT=$(bashio::services mqtt "port")
MQTT_USER=$(bashio::services mqtt "username")
MQTT_PASS=$(bashio::services mqtt "password")

bashio::log.info "Host: ${MQTT_HOST}"
bashio::log.info "Port: ${MQTT_PORT}"
bashio::log.info "Username: ${MQTT_USER}"
bashio::log.info "Password: ${MQTT_PASS}"

export MQTT_HOST MQTT_PORT MQTT_USER MQTT_PASS

exec node dist/index.js
  