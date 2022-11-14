<script>
  import DropdownPost from "./DropdownPost.svelte";
</script>

<div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg post mb-16">
  <div class="flex mb-4 align-top">
    <img
      class="w-14 h-14 rounded-full object-cover"
      src="https://ubico.id/wp-content/uploads/2019/11/project-details-2.jpg"
      alt="Rounded avatar"
    />
    <div class="flex flex-col meta ml-4 leading-tight flex-auto">
      <div class="font-bold text-lg">SKINSIS - Skin Disease Detection</div>
      <div class="font-light text-xs">Java, Python, HTML</div>
      <div class="font-light text-xs">6 Contributors</div>
    </div>
    <DropdownPost />
  </div>
  <a href="project">
    <p class="ellipsis-3 mb-6">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
      molestiae blanditiis ducimus ipsum. Magnam sed labore aperiam dolorum. Eum
      quidem, dolorem rem voluptates vero accusamus? Beatae fuga totam assumenda
      facilis?
    </p>
    <img
      class="max-w-sm h-auto rounded-md"
      src="https://cdn.dribbble.com/users/2279170/screenshots/18260328/media/9ac184a31d30bb99849a08d9540cc0ea.png?compress=1"
      alt="image description"
    />
  </a>
</div>
