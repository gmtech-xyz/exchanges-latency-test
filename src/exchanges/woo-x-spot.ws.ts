import { SharedWebsocket } from './shared.ws';

export class WooXSpotWebsocket extends SharedWebsocket {
  constructor() {
    super('wss://wss.woo.org/ws/stream/0527c685-d30d-4a1f-9807-99cc29e930ea');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          event: 'subscribe',
          topic: 'SPOT_BTC_USDT@ticker',
        })
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
