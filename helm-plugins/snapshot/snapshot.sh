#!/bin/bash
rm -rf "$TEMP_DIR"
ENV_FILE_PATH="$HELM_PLUGIN_DIR/.env"
set -euo pipefail  # Ensure the script exits on errors, unset variables, or pipeline failures

# Function to load environment variables from .env file
load_env() {
  if [ -f $ENV_FILE_PATH ]; then
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
      # For Windows (Git Bash or Cygwin)
      export $(grep -v '^#' .env | sed 's/^/set /' | sed 's/"/\\"/g' | xargs)
    else
      # For Unix-based systems
      source $ENV_FILE_PATH
    fi
  else
    echo ".env file not found!"
    exit 1
  fi
}

# Function to print usage instructions
print_usage() {
  cat << EOF
Usage: helm snapshot -f <URI to Helm tar.gz file> [-n <name>] [-e <email>]
  -f    URI to the packaged Helm chart (tar.gz) [required]
  -n    Optional name for the Meshery design
  -e    Optional email to associate with the Meshery design
EOF
}


# Function to extract the default name from the URI if not provided
extract_name_from_uri() {
  local uri="$1"
  local filename=$(basename "$uri")
  echo "${filename%%.*}"  # Extract filename without extension
}

# Load environment variables
load_env

# Read credentials from environment variables
GITHUB_TOKEN="${GITHUB_TOKEN:?Environment variable GITHUB_TOKEN not set}"
MESHERY_TOKEN="${MESHERY_TOKEN:?Environment variable MESHERY_TOKEN not set}"
COOKIE="${COOKIE:?Environment variable COOKIE not set}"

# Initialize variables
CHART_URI=""
NAME=""
EMAIL=""
SOURCE_TYPE="Helm Chart"
PATTERN_URL="https://playground.meshery.io/api/pattern/$(echo $SOURCE_TYPE | sed 's/ /%20/g')"  # Encode spaces in the URL
WORKFLOW_URL="https://playground.meshery.io/api/integrations/trigger/workflow"
OWNER="Aijeyomah"
REPO="Ng-depl"
WORKFLOW="10674160331"
BRANCH="main"

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


# Temporary directory and log file
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  TEMP_DIR=$(mktemp -d -t tmp)
else
  TEMP_DIR=$(mktemp -d) || { echo "Failed to create temporary directory"; exit 1; }
fi


LOG_FILE="$TEMP_DIR/snapshot.log"

# Function to log messages with a timestamp
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Use the extracted name from URI if not provided
if [ -z "$NAME" ]; then
  NAME=$(extract_name_from_uri "$CHART_URI")
  log "No name provided. Using extracted name: $NAME"
fi

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

DESIGN_ID=$(echo "$RESPONSE" | awk -F'"id":"' '{print $2}' | awk -F'"' '{print $1}')

if [ -z "$DESIGN_ID" ]; then
  log "Error: Failed to import pattern. Response: $RESPONSE"
  exit 1
fi

log "import pattern successfully. Design ID: $DESIGN_ID"

# Generate the snapshot using the provided API
SNAPSHOT_PAYLOAD=$(printf '{"Owner": "%s", "Repo": "%s", "Workflow": "%s", "Branch": "%s", "GithubToken": "%s", "Payload": {"designId": "%s", "filePath": "%s", "githubToken": "%s", "mesheryToken": "%s"}}' "$OWNER" "$REPO" "$WORKFLOW" "$BRANCH" "$GITHUB_TOKEN" "$DESIGN_ID" "$CHART_URI" "$GITHUB_TOKEN" "$MESHERY_TOKEN")

SNAPSHOT_RESPONSE=$(curl -s -X POST "$WORKFLOW_URL" \
  -H "Content-Type: application/json" \
  -d "$SNAPSHOT_PAYLOAD")

echo vb bnhf
echo $SNAPSHOT_RESPONSE

# Check if the snapshot was created successfully
if [[ "$SNAPSHOT_RESPONSE" == *"error"* ]]; then
  log "Error: Failed to generate the snapshot. Response: $SNAPSHOT_RESPONSE"
  exit 1
fi

log "Snapshot generated successfully. Response: $SNAPSHOT_RESPONSE"

# Clean up temporary files
log "Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

log "Operation completed successfully. Snapshot ID: $DESIGN_ID"
