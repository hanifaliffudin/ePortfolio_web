<script>
  import SvelteMarkdown from "svelte-markdown";
  import CommentCard from "./CommentCard.svelte";
  import DropdownPost from "./DropdownPost.svelte";
  import mermaid from "mermaid";

  export let post;

  let userId = localStorage.getItem("userId");

  let userData,
    profilePicture,
    desc,
    shortDesc,
    mermaidDiagram,
    mermaidOutput,
    date,
    commentInput,
    comments = [],
    userIdPost = post.userId,
    userDataPost,
    nameUserPost,
    majorUserPost,
    organizationUserPost,
    profilePicturePost,
    roleUserPost,
    nimUserPost,
    commentVisible = false,
    academicFieldPost,
    readMore;

  function toggleVissible() {
    commentVisible = !commentVisible;
  }

  function toggleReadMore() {
    readMore = !readMore;
  }

  const today = new Date();

  // get data user
  async function getUser() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userId
    );

    if (!response.ok) {
      localStorage.clear();
      document.location.href = "/login";
    }

    const data = await response.json();
    userData = data;
    if (userData.profilePicture) {
      profilePicture = "http://103.187.223.15:8800/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();

  if (post) {
    desc = post.desc;
    if (desc.length > 400) {
      readMore = false;
      shortDesc = desc.substring(0, 400);
    }
    if (post.mermaidDiagram) {
      mermaidDiagram = post.mermaidDiagram;
      renderMermaid();
    }
    comments = post.comments;
    comments.sort(function (a, b) {
      // @ts-ignore
      return new Date(b.date) - new Date(a.date);
    });
    if (post.createdAt != post.updatedAt) {
      date = new Date(post.createdAt);
    } else {
      date = new Date(post.createdAt);
    }
  }

  function renderMermaid() {
    mermaid.render("theGraph", mermaidDiagram, function (svgCode) {
      mermaidOutput = svgCode;
    });
  }

  // get data user post
  async function getUserPost() {
    const response = await fetch(
      "http://103.187.223.15:8800/api/users/" + userIdPost
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userDataPost = data;
    nameUserPost = userDataPost.username;
    nimUserPost = userDataPost.nim;
    majorUserPost = userDataPost.major;
    organizationUserPost = userDataPost.organization;
    roleUserPost = userDataPost.role;
    academicFieldPost = userDataPost.academicField;
    if (userDataPost.profilePicture) {
      profilePicturePost =
        "http://103.187.223.15:8800/" + userDataPost.profilePicture;
    } else {
      profilePicturePost = "/icon-user.png";
    }
  }

  getUserPost();

  // add comment
  async function addComment() {
    let newComment = {
      userId,
      comment: commentInput,
    };

    comments.splice(0, 0, newComment);

    const response = await fetch(
      "http://103.187.223.15:8800/api/posts/" + post._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdPost,
          comments,
        }),
      }
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      comments = comments;
      comments.sort(function (a, b) {
        // @ts-ignore
        return new Date(b.date) - new Date(a.date);
      });
      const data = await response.json();
      commentInput = "";
    }
  }
</script>

{#if userDataPost && userData}
  <div class="md:container md:mx-auto bg-gray-100 p-6">
    <div class="flex mb-4">
      <a
        href={userId == userIdPost ? "/profile" : "/profile/" + userIdPost}
        class="flex"
      >
        <img
          class="w-14 h-14 rounded-full object-cover"
          src={profilePicturePost}
          alt="Rounded avatar"
        />
        <div class="ml-4 ">
          <div>
            <div class="font-bold text-lg hover:underline leading-tight">
              {nameUserPost}
            </div>
            {#if roleUserPost == "mahasiswa"}
              <div class="font-light text-xs">
                {majorUserPost ? majorUserPost : ""}
                {organizationUserPost ? "| " + organizationUserPost : ""}
              </div>
            {:else}
              <div class="font-light text-xs truncate w-96">
                {academicFieldPost ? academicFieldPost : ""}
              </div>
              <div class="font-light text-xs">
                {organizationUserPost ? organizationUserPost : ""}
              </div>
            {/if}
            <div class="font-light text-xs">
              <!-- if updated -->
              <!-- {post.createdAt != post.updatedAt ? "Last updated on " : ""} -->
              <!-- time -->
              {date.toLocaleTimeString("id", {
                hour: "numeric",
                minute: "2-digit",
              })}
              <!-- date -->
              {date.toLocaleDateString("en") == today.toLocaleDateString("en")
                ? "Today"
                : date.toLocaleDateString("en", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
            </div>
          </div>
        </div>
      </a>
      {#if !post.isPublic}
        <div
          class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
        >
          Private
        </div>
      {/if}
      <div class="flex-auto" />
      {#if userId == userIdPost}
        <DropdownPost idPost={post._id} />
      {/if}
    </div>
    <div class="prose prose-neutral text-sm max-w-none">
      {#if shortDesc && !readMore}
        <SvelteMarkdown source={shortDesc} />
        <button
          on:click={toggleReadMore}
          class="text-sm text-blue-500 font-bold hover:underline "
          >Read More</button
        >
      {:else}
        <SvelteMarkdown source={desc} />
        {#if mermaidDiagram}
          <div contenteditable="false" bind:innerHTML={mermaidOutput} />
        {/if}
      {/if}
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex justify-end mb-2" on:click={toggleVissible}>
      <div class="cursor-pointer hover:underline text-sm">
        {#if comments.length > 0}
          {comments.length}
          {comments.length == 1 ? "comment" : "comments"}
        {/if}
      </div>
    </div>
    <hr />

    <div class="mt-2">
      <div class="flex mt-3 items-center">
        <img
          class="w-11 h-11 rounded-full object-cover"
          src={profilePicture}
          alt="Rounded avatar"
        />
        <form on:submit|preventDefault={addComment} class="w-full">
          <input
            bind:value={commentInput}
            on:focus={() => (commentVisible = true)}
            type="text"
            id="comment"
            placeholder="Add a comment..."
            class="bg-gray-50 ml-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>
      </div>
      {#if commentVisible}
        {#each comments as comment, i (comment)}
          <CommentCard
            comment={{ ...comment, idPost: post._id, userIdPost, type: "post" }}
          />
        {/each}
      {/if}
    </div>
  </div>
{/if}
