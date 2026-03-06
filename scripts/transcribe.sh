#!/bin/bash
# Transcribe audio file using OpenAI Whisper API
# Usage: transcribe.sh <audio_file>

source ~/.openclaw/.env 2>/dev/null

if [ -z "$1" ]; then
  echo "Usage: transcribe.sh <audio_file>"
  exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
  echo "Error: OPENAI_API_KEY not set"
  exit 1
fi

curl -s https://api.openai.com/v1/audio/transcriptions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F file="@$1" \
  -F model="whisper-1" \
  -F response_format="text"
