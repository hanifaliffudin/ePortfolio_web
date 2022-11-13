<script>
  import DiscoveryCard from "../components/DiscoveryCard.svelte";
</script>

<main class="md:mx-72">
  <section>
    <div class="md:container md:mx-auto my-16">
      <h1 class="text-4xl font-bold text-center">
        Discover Student, Projects, Or Activity
      </h1>
      <input
        type="text"
        class="w-full my-4 text-center py-3 text-gray-700 bg-white border-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        placeholder="node.js project"
      />
      <p class="text-center">
        Or see other students from your
        <a href="#" class="text-blue-500">study program</a>,
        <a href="#" class="text-blue-500">interest</a>, or
        <a href="#" class="text-blue-500">collage year</a>.
      </p>
    </div>
  </section>

  <section>
    <div class="md:container md:mx-auto my-16">
      <div class="grid grid-cols-3 gap-8">
        <DiscoveryCard />
        <DiscoveryCard />
        <DiscoveryCard />
        <DiscoveryCard />
        <DiscoveryCard />
      </div>
    </div>
  </section>
</main>
