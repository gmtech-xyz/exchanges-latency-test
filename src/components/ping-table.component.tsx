import { forEachSeries } from 'p-iteration';
import { For, onCleanup, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { avg, max, min } from '~/utils/avg.utils';
import { sleep } from '~/utils/sleep.utils';
import { pingURL } from '~/utils/xhr-ping.utils';

const [exchanges, setExchanges] = createStore([
  {
    name: 'Bybit /v3/public/time',
    pings: [] as number[],
    url: 'https://api.bybit.com/v3/public/time',
    link: 'https://partner.bybit.com/b/safecex',
  },
  {
    name: 'Bybit /v2/public/time',
    pings: [] as number[],
    url: 'https://api.bybit.com/v2/public/time',
    link: 'https://partner.bybit.com/b/safecex',
  },
  {
    name: 'Bybit /spot/v1/time',
    pings: [] as number[],
    url: 'https://api.bybit.com/spot/v1/time',
    link: 'https://partner.bybit.com/b/safecex',
  },
  {
    name: 'Binance Spot',
    pings: [] as number[],
    url: 'https://api.binance.com/api/v3/time',
    link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
  },
  {
    name: 'Binance USD-M Futures',
    pings: [] as number[],
    url: 'https://fapi.binance.com/fapi/v1/time',
    link: 'https://accounts.binance.com/en/register?ref=KOLLSXK0',
  },
]);

let timeoutId: NodeJS.Timeout;
const ping = async () => {
  await forEachSeries(exchanges, async (exchange, idx) => {
    try {
      const latency = await pingURL(exchange.url);
      setExchanges(idx, 'pings', [...exchange.pings, latency]);
      await sleep(500);
    } catch {
      // do nothing
    }
  });

  timeoutId = setTimeout(() => ping(), 500);
};

const PingTable = () => {
  onMount(() => {
    ping();
  });

  onCleanup(() => {
    clearTimeout(timeoutId);
  });

  return (
    <table class="table table-auto w-[700px] mx-auto">
      <thead>
        <tr>
          <th class="text-left uppercase">Exchange</th>
          <th class="text-right uppercase">Ping (AVG/MIN/MAX)</th>
        </tr>
      </thead>
      <tbody>
        <For each={exchanges}>
          {(exchange) => (
            <tr>
              <td>
                <a
                  href={exchange.link}
                  class="border-b border-dotted"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exchange.name}
                </a>
              </td>
              <td class="text-right font-mono text-sm">
                {avg(exchange.pings)}ms / {min(exchange.pings)}ms /{' '}
                {max(exchange.pings)}ms
              </td>
            </tr>
          )}
        </For>
        <tr>
          <td>
            <a
              href="https://www.okx.com/join/SAFECEX"
              class="border-b border-dotted"
              target="_blank"
              rel="noopener noreferrer"
            >
              OKX
            </a>
          </td>
          <td class="text-right font-mono text-orange-500 text-xs">
            Not supported (CORS)
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PingTable;
