import { SharedWebsocket } from './shared.ws';

export class BybitFuturesWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://stream.bybit.com/v5/public/linear');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({ op: 'subscribe', args: ['tickers.BTCUSDT'] })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const ts = Number(data.match(/"ts":(\d+)/)?.[1]);
        const now = Number(new Date());
        const diff = now - ts;
        this.setLatency(diff);
      } catch {
        // do nothing
      }
    }
  };
}
