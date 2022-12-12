<script>
  import { navigate } from "svelte-routing";

  export let active;

  let home, discovery, profile;

  // get userId from localStorage
  let userId = localStorage.getItem("userId");

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      navigate("/login");
      localStorage.clear();
    }

    const data = await response.json();
    if (!data.dateBirth) {
      home.classList.add("hidden");
      discovery.classList.add("hidden");
      profile.classList.add("hidden");
    }
  }

  getUser();

  // logout
  const logout = async () => {
    await fetch("http://103.187.223.15:8800/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    // clear localStorage
    localStorage.clear();

    navigate("/login");
  };
</script>

<nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <a href="/" class="flex items-center">
      <img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-3 h-6 sm:h-9"
        alt="Flowbite Logo"
      />
      <span class="self-center text-xl font-semibold whitespace-nowrap "
        >ePortfolio</span
      >
    </a>
    <button
      data-collapse-toggle="navbar-default"
      type="button"
      class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      aria-controls="navbar-default"
      aria-expanded="false"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        /></svg
      >
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul
        class="flex flex-col items-center p-1 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent "
      >
        <li>
          <a
            bind:this={home}
            href="/"
            class="{active == 'home'
              ? 'md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3 text-white md:bg-transparent"
            aria-current="page">Home</a
          >
        </li>
        <li>
          <a
            bind:this={discovery}
            href="/discovery"
            class="{active == 'discovery'
              ? 'md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3 text-white md:bg-transparent"
            >Discovery</a
          >
        </li>
        <li>
          <a
            bind:this={profile}
            href="/profile"
            class="{active == 'profile'
              ? 'md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3 text-white md:bg-transparent"
            >Profile</a
          >
        </li>
        <li>
          <button
            on:click={logout}
            class="text-red-500 ring-1 ring-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:hover:ring-red-700 inline-flex items-center px-5 py-1.5 md:ml-5"
            >Sign Out
            <svg
              aria-hidden="true"
              class="ml-2 -mr-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg></button
          >
        </li>
      </ul>
    </div>
  </div>
</nav>
