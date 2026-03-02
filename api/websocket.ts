import { positioningWsUrl } from '../constants';
import { MapPosition } from '../types/map-position';

type PositionCallback = (position: MapPosition) => void;
type ReconnectCallback = () => void;

class PositionWebSocket {
  private ws: WebSocket | null = null;
  private callbacks: PositionCallback[] = [];
  private reconnectCallbacks: ReconnectCallback[] = [];
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private isConnecting = false;

  connect() {
    if (this.ws || this.isConnecting) {
      return;
    }

    this.isConnecting = true;
    if (__DEV__) console.log('[WebSocket] Connecting to', positioningWsUrl);

    try {
      this.ws = new WebSocket(positioningWsUrl);

      this.ws.onopen = () => {
        if (__DEV__) console.log('[WebSocket] Connected');
        this.isConnecting = false;
        this.startHeartbeat();
        // Notify reconnect listeners
        this.reconnectCallbacks.forEach((cb) => {
          try {
            cb();
          } catch (error) {
            if (__DEV__) console.warn('[WebSocket] Reconnect callback error:', error);
          }
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const position: MapPosition = JSON.parse(event.data);
          if (__DEV__) {
            const now = new Date().toLocaleTimeString('de-DE');
            console.log(
              `[WebSocket] Received position: vehicle ${position.vehicle}: [${position.latitude}, ${position.longitude}]. Time: ${now}`
            );
          }
          this.callbacks.forEach((cb) => {
            try {
              cb(position);
            } catch (callbackError) {
              if (__DEV__) console.warn('[WebSocket] Callback error:', callbackError);
            }
          });
        } catch (error) {
          if (__DEV__) console.warn('[WebSocket] Failed to parse message:', error);
        }
      };

      this.ws.onclose = (event) => {
        if (__DEV__) console.log('[WebSocket] Connection closed:', event.code, event.reason);
        this.cleanup();
        this.scheduleReconnect();
      };

      this.ws.onerror = (error) => {
        if (__DEV__) console.warn('[WebSocket] Error:', error);
        this.isConnecting = false;
      };
    } catch (error) {
      if (__DEV__) console.warn('[WebSocket] Failed to connect:', error);
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
    if (__DEV__) console.log('[WebSocket] Reconnecting in 3 seconds...');
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

  onReconnect(callback: ReconnectCallback): () => void {
    this.reconnectCallbacks.push(callback);
    return () => {
      this.reconnectCallbacks = this.reconnectCallbacks.filter((cb) => cb !== callback);
    };
  }

  forceReconnect() {
    if (__DEV__) console.log('[WebSocket] Force reconnecting...');
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.cleanup();
    this.connect();
  }

  disconnect() {
    if (__DEV__) console.log('[WebSocket] Disconnecting...');
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
    try {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send('ping');
      }
    } catch (error) {
      if (__DEV__) console.warn('[WebSocket] Heartbeat failed:', error);
    }
  }

  get isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

export const positionSocket = new PositionWebSocket();
