import { For, onCleanup, onMount } from 'solid-js';

import { BinanceFuturesWebsocket } from '~/exchanges/binance-futures.ws';
import { BinanceSpotWebsocket } from '~/exchanges/binance-spot.ws';
import { BybitFuturesv3Websocket } from '~/exchanges/bybit-futures-v3.ws';
import { BybitFuturesWebsocket } from '~/exchanges/bybit-futures.ws';
import { BybitSpotv1Websocket } from '~/exchanges/bybit-spot-v1.ws';
import { BybitSpotv3Websocket } from '~/exchanges/bybit-spot-v3.ws';
import { BybitSpotWebsocket } from '~/exchanges/bybit-spot.ws';
import { OKXFuturesWebsocket } from '~/exchanges/okx-futures.ws';
import { OKXSpotWebsocket } from '~/exchanges/okx-spot.ws';

const bybitSpot = new BybitSpotWebsocket();
const bybitFutures = new BybitFuturesWebsocket();

const bybitFuturesv3 = new BybitFuturesv3Websocket();
const bybitSpotv3 = new BybitSpotv3Websocket();

const bybitSpotv1 = new BybitSpotv1Websocket();

const binanceSpot = new BinanceSpotWebsocket();
const binanceFutures = new BinanceFuturesWebsocket();

const okxSpot = new OKXSpotWebsocket();
const okxFutures = new OKXFuturesWebsocket();

const LatencyTable = () => {
  onMount(() => {
    bybitSpot.connect();
    bybitFutures.connect();
    bybitFuturesv3.connect();
    bybitSpotv3.connect();
    bybitSpotv1.connect();
    binanceSpot.connect();
    binanceFutures.connect();
    okxSpot.connect();
    okxFutures.connect();
  });

  onCleanup(() => {
    bybitSpot.close();
    bybitFutures.close();
    bybitFuturesv3.close();
    bybitSpotv3.close();
    bybitSpotv1.close();
    binanceSpot.close();
    binanceFutures.close();
    okxSpot.close();
    okxFutures.close();
  });

  const exchanges = [
    {
      name: 'Bybit Futures v5',
      stream: 'tickers.BTCUSDT',
      latency: bybitFutures.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Futures v3',
      stream: 'tickers.BTCUSDT',
      latency: bybitFuturesv3.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v5',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpot.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v3',
      stream: 'tickers.BTCUSDT',
      latency: bybitSpotv3.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Bybit Spot v1',
      stream: 'instrument_info.100ms.BTCUSDT',
      latency: bybitSpotv1.latency,
      link: 'https://partner.bybit.com/b/safecex',
    },
    {
      name: 'Binance Spot',
      stream: 'BTCUSDT@trade',
      latency: binanceSpot.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'Binance USD-M Futures',
      stream: 'BTCUSDT@trade',
      latency: binanceFutures.latency,
      link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
    },
    {
      name: 'OKX Spot',
      stream: 'tickers.BTC-USDT',
      latency: okxSpot.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
    {
      name: 'OKX Futures',
      stream: 'tickers.BTC-USDT-SWAP',
      latency: okxFutures.latency,
      link: 'https://www.okx.com/join/SAFECEX',
    },
  ];

  return (
    <table class="table table-auto w-full max-w-[700px] mx-auto">
      <thead>
        <tr>
          <th class="text-left uppercase">Exchange</th>
          <th class="text-left uppercase hidden md:table-cell">Stream</th>
          <th class="text-right uppercase">Latency</th>
        </tr>
      </thead>
      <tbody>
        <For each={exchanges}>
          {(exchange) => (
            <tr>
              <td class="text-left">
                <a
                  href={exchange.link}
                  class="border-b border-dotted"
                  target="_blank"
                  rel="noreferrer"
                >
                  {exchange.name}
                </a>
              </td>
              <td class="text-left font-mono text-xs hidden  md:table-cell">
                {exchange.stream}
              </td>
              <td class="text-right font-mono">{exchange.latency() || 0}ms</td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default LatencyTable;
