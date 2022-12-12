<script>
  import { navigate } from "svelte-routing";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let idPost;

  let userId = localStorage.getItem("userId");

  // delete post
  async function deletePost() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/posts/" + idPost,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your post");
    } else {
      navigate("/activities");
    }

    const data = await response.json();
  }
</script>

<Button btnClass="p-0 h-3"
  ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
>
<Dropdown class="w-auto">
  <DropdownItem><a href="/post/edit/{idPost}">Edit</a></DropdownItem>
  <DropdownItem on:click={deletePost}>Delete</DropdownItem>
</Dropdown>
