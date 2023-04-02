import { SharedWebsocket } from './shared.ws';

export class BinanceSpotWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://stream.binance.com/ws');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: ['btcusdt@trade'],
          id: 1,
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const ts = Number(data.match(/"E":(\d+)/)?.[1]);
        const now = Number(new Date());
        const diff = now - ts;
        this.setLatency(diff);
      } catch {
        // do nothing
      }
    }
  };
}
