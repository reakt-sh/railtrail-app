import { positioningWsUrl } from '../util/consts';
import { MapPosition } from '../types/map-position';

type PositionCallback = (position: MapPosition) => void;

class PositionWebSocket {
  private ws: WebSocket | null = null;
  private callbacks: PositionCallback[] = [];
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private isConnecting = false;

  connect() {
    if (this.ws || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    console.log('[WebSocket] Connecting to', positioningWsUrl);

    try {
      this.ws = new WebSocket(positioningWsUrl);

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected');
        this.isConnecting = false;
        this.startHeartbeat();
      };

      this.ws.onmessage = (event) => {
        try {
          const position: MapPosition = JSON.parse(event.data);
          console.log('[WebSocket] Received position:', position.vehicle, position.label);
          this.callbacks.forEach((cb) => cb(position));
        } catch (error) {
          console.error('[WebSocket] Failed to parse message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('[WebSocket] Connection closed:', event.code, event.reason);
        this.cleanup();
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      console.error('[WebSocket] Failed to connect:', error);
      this.isConnecting = false;
      this.scheduleReconnect();
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    // Server erwartet regelmäßige Messages um Verbindung aufrecht zu erhalten
    this.heartbeatTimer = setInterval(() => {
      this.sendHeartbeat();
    }, 30000); // Alle 30 Sekunden
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) {
      return;
    }
    console.log('[WebSocket] Reconnecting in 3 seconds...');
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      this.connect();
    }, 3000);
  }

  private cleanup() {
    this.ws = null;
    this.isConnecting = false;
    this.stopHeartbeat();
  }

  subscribe(callback: PositionCallback): () => void {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback);
    };
  }

  disconnect() {
    console.log('[WebSocket] Disconnecting...');
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnecting = false;
  }

  sendHeartbeat() {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send('ping');
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const positionSocket = new PositionWebSocket();
