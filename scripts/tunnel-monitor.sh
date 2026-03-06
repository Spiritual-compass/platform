#!/bin/bash

# Cloudflare Tunnel Monitor Script
# Checks tunnel status and restarts if needed

TUNNEL_URL="https://solobot.spiritual-compass.com"
LOG_FILE="/tmp/tunnel-monitor.log"
CLOUDFLARED_LOG="/tmp/cloudflared.log"

log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

check_tunnel() {
    local http_code=$(curl -s -o /dev/null -w "%{http_code}" "$TUNNEL_URL")
    if [ "$http_code" = "200" ]; then
        return 0  # Tunnel is up
    else
        return 1  # Tunnel is down
    fi
}

restart_tunnel() {
    log_message "Tunnel down, restarting..."
    
    # Kill any existing cloudflared processes
    pkill cloudflared
    sleep 2
    
    # Restart tunnel
    export PATH=$PATH:~/.local/bin
    nohup cloudflared tunnel run solobot > "$CLOUDFLARED_LOG" 2>&1 &
    
    # Wait and verify
    sleep 5
    if check_tunnel; then
        log_message "Tunnel successfully restarted"
    else
        log_message "Failed to restart tunnel"
    fi
}

# Main monitoring loop
while true; do
    if check_tunnel; then
        log_message "Tunnel OK"
    else
        log_message "Tunnel DOWN - attempting restart"
        restart_tunnel
    fi
    
    # Check every 2 minutes
    sleep 120
done