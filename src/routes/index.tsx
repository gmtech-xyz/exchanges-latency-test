import LatencyTable from '~/components/latency-table.component';

const Home = () => {
  return (
    <main class="max-w-[920px]  mx-auto text-gray-700 p-4">
      <h1 class="text-center max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        EXCHANGES LATENCY TESTER
      </h1>
      <a href="https://tuleep.trade" target="_blank" rel="noreferrer">
        <div class="mx-auto max-w-[600px] mb-8 flex border rounded-md px-3 py-2">
          <div class="mr-4 pt-2">
            <img alt="tuleep.trade" src="https://tuleep.trade/tulip.png" />
          </div>
          <div>
            Sponsored by <strong>tuleep.trade</strong>, your gateway to success
            in the fast-paced world of cryptocurrency news trading, with
            innovative tools and features to help you stay ahead of the curve.
          </div>
        </div>
      </a>
      <div class="mx-auto max-w-[600px] mb-20">
        Are you tired of slow exchange servers that delay your trades and cause
        you to miss out on opportunities?
        <br />
        <br />
        Look no further than our website, which calculates the exchange latency
        between your computer and exchange servers in real-time using websocket
        data streams.
        <br />
        <br />
        With this tool, you can easily find the best exchange to trade from your
        location, ensuring you never miss a beat in the fast-paced world of
        trading.
      </div>
      <LatencyTable />
      <div class="mt-20 max-w-[600px] mx-auto mb-20 pl-12 text-center">
        <ul>
          <li class="mb-2">
            <a
              href="https://partner.bybit.com/b/safecex"
              class="border-b border-dotted border-black"
              target="_blank"
              rel="noreferrer"
            >
              Register on Bybit and get up to $30,000 bonus on deposit
            </a>
          </li>
          <li class="mb-2">
            <a
              href="https://www.okx.com/join/SAFECEX"
              class="border-b border-dotted border-black"
              target="_blank"
              rel="noreferrer"
            >
              Register on OKX and get up to $10,000 bonus on deposit
            </a>
          </li>
          <li class="mb-2">
            <a
              href="https://accounts.binance.com/en/register?ref=KOLLSXK0"
              class="border-b border-dotted border-black"
              target="_blank"
              rel="noreferrer"
            >
              Register on Binance and get $100 bonus on deposit
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Home;
