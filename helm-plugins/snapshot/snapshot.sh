#!/bin/bash

set -euo pipefail  # Ensure the script exits on errors, unset variables, or pipeline failures

# Function to print usage instructions
print_usage() {
  cat << EOF
Usage: helm snapshot -f <URI to Helm tar.gz file> [-n <name>] [-e <email>]
  -f    URI to the packaged Helm chart (tar.gz) [required]
  -n    Optional name for the Meshery design
  -e    Optional email to associate with the Meshery design
EOF
}

# Function to log messages with a timestamp
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to extract the default name from the URI if not provided
extract_name_from_uri() {
  local uri="$1"
  local filename=$(basename "$uri")
  echo "${filename%%.*}"  # Extract filename without extension
}

# Initialize variables
CHART_URI=""
NAME=""
EMAIL=""
SOURCE_TYPE="Helm Chart"
PATTERN_URL="https://playground.meshery.io/api/pattern/$(echo $SOURCE_TYPE | sed 's/ /%20/g')"  # Encode spaces in the URL
COOKIE=""

# Parse arguments
while getopts ":f:n:e:" opt; do
  case $opt in
    f) CHART_URI=$OPTARG ;;
    n) NAME=$OPTARG ;;
    e) EMAIL=$OPTARG ;;
    \?) print_usage; exit 1 ;;
  esac
done

# Validate required arguments
if [ -z "$CHART_URI" ]; then
  log "Error: URI to Helm chart is required."
  print_usage
  exit 1
fi

# Use the extracted name from URI if not provided
if [ -z "$NAME" ]; then
  NAME=$(extract_name_from_uri "$CHART_URI")
  log "No name provided. Using extracted name: $NAME"
fi

# Temporary directory and log file
TEMP_DIR=$(mktemp -d)
CHART_PATH="$TEMP_DIR/chart.tgz"
LOG_FILE="$TEMP_DIR/snapshot.log"

log "Starting Helm chart conversion to Meshery Design..."

# Request body payload
REQUEST_PAYLOAD=$(printf '{"save": true, "url": "%s", "name": "%s", "email": "%s"}' "$CHART_URI" "$NAME" "$EMAIL")

# Make the API call to create the Meshery design
RESPONSE=$(curl -s -X POST "$PATTERN_URL" \
  -H "Cookie: $COOKIE" \
  -H "Content-Type: application/json" \
  -H "Accept-Encoding: gzip, deflate, br, zstd" \
  -H "Accept-Language: en-GB,en-US;q=0.9,en;q=0.8" \
  -d "$REQUEST_PAYLOAD")

# Extract Snapshot ID from response
SNAPSHOT_ID=$(echo "$RESPONSE" | awk -F'"id":"' '{print $2}' | awk -F'"' '{print $1}')

if [ -z "$SNAPSHOT_ID" ]; then
  log "Error: Failed to create Meshery Snapshot. Response: $RESPONSE"
  exit 1
fi

log "Meshery Snapshot created successfully. Snapshot ID: $SNAPSHOT_ID"

# Clean up temporary files
log "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

log "Operation completed successfully. Snapshot ID: $SNAPSHOT_ID"
