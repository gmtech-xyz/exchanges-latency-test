import { SharedWebsocket } from './shared.ws';

export class BybitSpotv3Websocket extends SharedWebsocket {
  constructor() {
    super('wss://stream-testnet.bybit.com/spot/public/v3  ');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          op: 'subscribe',
          args: ['tickers.BTCUSDT'],
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const ts = Number(data.match(/"ts":(\d+)/)?.[1]);
        const now = Number(new Date());
        const diff = Math.round(now - ts);
        this.setLatency(diff);
      } catch {
        // do nothing
      }
    }
  };
}
