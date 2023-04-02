import { SharedWebsocket } from './shared.ws';

export class OKXFuturesWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://ws.okx.com:8443/ws/v5/public');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          op: 'subscribe',
          args: [{ channel: 'trades', instId: 'BTC-USDT-SWAP' }],
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const ts = Number(data.match(/"ts":"(\d+)"/)?.[1]);
        const now = Number(new Date());
        const diff = now - ts;
        this.setLatency(diff);
      } catch {
        // do nothing
      }
    }
  };
}
