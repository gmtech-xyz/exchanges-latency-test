import { Show, createSignal, onCleanup, onMount } from 'solid-js';

let interval: NodeJS.Timeout;

const [diff, setDiff] = createSignal(0);

const fetchAndSetDiff = async () => {
  const response = await fetch('https://worldtimeapi.org/api/timezone/etc/utc');
  const data = await response.json();

  const currentUTCDate = new Date();
  const serverDate = Number(new Date(data.datetime));
  const utcTimestamp = Date.UTC(
    currentUTCDate.getUTCFullYear(),
    currentUTCDate.getUTCMonth(),
    currentUTCDate.getUTCDate(),
    currentUTCDate.getUTCHours(),
    currentUTCDate.getUTCMinutes(),
    currentUTCDate.getUTCSeconds(),
    currentUTCDate.getUTCMilliseconds()
  );

  setDiff(
    Math.max(utcTimestamp, serverDate) - Math.min(utcTimestamp, serverDate)
  );
};

const TimeSyncCheck = () => {
  onMount(() => {
    fetchAndSetDiff();
    interval = setInterval(fetchAndSetDiff, 10_000);
  });

  onCleanup(() => {
    clearInterval(interval);
  });

  return (
    <Show when={diff() > 1000}>
      <div class="w-full mb-12 flex items-center justify-center">
        <div class="border-red-500 border-2 rounded-md bg-red-100 text-red-500 pt-1 pb-3 px-4 text-sm mb-8 inline-block">
          <div class="m-2">
            Your computer's clock is out of sync by more than one second, which
            invalidate the latency test.
          </div>
          <div class="pl-12">
            <ul class="list-disc">
              <li>
                <a
                  class="underline"
                  href="https://support.apple.com/en-gb/guide/mac-help/mchlp2996/mac"
                >
                  How to sync datetime on MacOS
                </a>
              </li>
              <li>
                <a class="underline" href="https://www.timesynctool.com">
                  How to sync datetime on Window
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Show>
  );
};

export default TimeSyncCheck;
