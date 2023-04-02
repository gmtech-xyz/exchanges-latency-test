import type { Accessor, Setter } from 'solid-js';
import { createSignal } from 'solid-js';

export class SharedWebsocket {
  ws?: WebSocket;
  endpoint: string;
  isDisposed = false;

  latency: Accessor<number>;
  setLatency: Setter<number>;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

    const [latency, setLatency] = createSignal(0);
    this.latency = latency;
    this.setLatency = setLatency;
  }

  connect = () => {
    this.ws = new WebSocket(this.endpoint);
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('close', this.onClose);
  };

  onOpen = () => {};
  onMessage = (_event: MessageEvent) => {};

  onClose = () => {
    this?.ws?.removeEventListener?.('open', this.onOpen);
    this?.ws?.removeEventListener?.('message', this.onMessage);
    this?.ws?.removeEventListener?.('close', this.onClose);
    this.ws = undefined;

    if (!this.isDisposed) {
      setTimeout(() => this.connect(), 1000);
    }
  };

  close = () => {
    this.isDisposed = true;
    this.ws?.close?.();
  };
}
