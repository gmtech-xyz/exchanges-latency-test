import { SharedWebsocket } from './shared.ws';

export class BybitSpotv1Websocket extends SharedWebsocket {
  constructor() {
    super('wss://stream.bybit.com/realtime_public');
  }

  onOpen = () => {
    if (!this.isDisposed) {
      this.ws?.send?.(
        JSON.stringify({
          op: 'subscribe',
          args: ['instrument_info.100ms.BTCUSDT'],
        })
      );
    }
  };

  onMessage = ({ data }: MessageEvent) => {
    if (!this.isDisposed) {
      try {
        const ts = Number(data.match(/"timestamp_e6":"(\d+)"/)?.[1]) / 1000;
        const now = Number(new Date());
        const diff = Math.round(now - ts);
        this.setLatency(diff);
      } catch {
        // do nothing
      }
    }
  };
}
