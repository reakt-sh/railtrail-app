#!/bin/bash
# Creates .env file from environment variables for EAS builds
echo "POSITIONING_WS_URL=${POSITIONING_WS_URL}" > .env
echo "API_TIMEOUT=${API_TIMEOUT}" >> .env
echo "MAP_STYLE_URL=${MAP_STYLE_URL}" >> .env
echo "FEEDBACK_URL=${FEEDBACK_URL}" >> .env
echo "TRACK_FILE=${TRACK_FILE}" >> .env
echo "EXPO_PUBLIC_ENABLE_DEMO_MODE=${EXPO_PUBLIC_ENABLE_DEMO_MODE:-false}" >> .env
echo "Created .env file for EAS build"
cat .env
