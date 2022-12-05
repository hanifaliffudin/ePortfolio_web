<script>
  import { navigate } from "svelte-routing";

  export let idPost;

  let userId = localStorage.getItem("userId");

  // delete post
  async function deletePost() {
    const response = await fetch("http://localhost:8800/api/posts/" + idPost, {
      method: "DELETE",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({
        userId: userId,
      }),
    });

    if (!response.ok) {
      alert("You can only delete your post");
    } else {
      navigate("/activities");
    }

    const data = await response.json();
  }
</script>

<button
  id="multiLevelDropdownButton"
  data-dropdown-toggle="dropdown"
  class="font-medium h-3"
  type="button"
>
  <iconify-icon icon="fluent:more-horizontal-32-filled" />
</button>
<!-- Dropdown menu -->
<div
  id="dropdown"
  class="hidden z-10 w-32 bg-white rounded divide-y divide-gray-100 shadow"
>
  <ul
    class="py-1 text-sm text-gray-700"
    aria-labelledby="multiLevelDropdownButton"
  >
    <li>
      <a href="/post/edit/{idPost}" class="block py-2 px-4 hover:bg-gray-100"
        >Edit</a
      >
    </li>
    <li>
      <button
        type="button"
        on:click={deletePost}
        class="block w-full text-start py-2 px-4 hover:bg-gray-100"
        >Delete</button
      >
    </li>
  </ul>
</div>
