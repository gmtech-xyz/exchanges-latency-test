import LatencyTable from '~/components/latency-table.component';

const Home = () => {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        EXCHANGES LATENCY TESTER
      </h1>
      <LatencyTable />
    </main>
  );
};

export default Home;
