<script>
  export let idCollection;
  import { Button, Dropdown, DropdownItem, Chevron } from "flowbite-svelte";
</script>

<main class="md:mx-72">
  <div class="md:container md:mx-auto my-16">
    <div class="flex justify-between mb-6">
      <a href="" class="flex">
        <img
          class="w-14 h-14 rounded-full object-cover"
          src="/icon-user.png"
          alt="Rounded avatar"
        />
        <div class="ml-4 ">
          <div>
            <div class="font-bold text-lg hover:underline leading-tight">
              WebCalculator
            </div>
            <div class="font-light text-xs">JavaScript</div>
            <div class="font-light text-xs">Created : 22 May 2020</div>
          </div>
        </div>
      </a>
      <div>
        <Button color="green"><Chevron>Add file</Chevron></Button>
        <Dropdown>
          <DropdownItem
            ><a href="/collection/add-image/1">Add Image</a></DropdownItem
          >
          <DropdownItem
            ><a href="/collection/add-video/1">Add Video</a></DropdownItem
          >
          <DropdownItem
            ><a href="/collection/add-certificate/1">Add Certificate</a
            ></DropdownItem
          >
        </Dropdown>
      </div>
    </div>

    <div>
      <div class="mb-6">
        This app can detect skin diseases on the face and give recommendations
        as first aid. This app can help a lot of people to overcome ...
      </div>
      <div class="border border-r-0 border-l-0 border-b-0 rounded-">
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
        <div class="flex items-center border border-t-0 p-2">
          <img class="w-8 mr-4" src="/icon-user.png" alt="" />
          <div>Pengenalan pemrograman dasar dengan Java 1</div>
          <div class="flex-auto" />
          <div>pemrograman1.docx</div>
        </div>
      </div>
    </div>
  </div>
</main>
