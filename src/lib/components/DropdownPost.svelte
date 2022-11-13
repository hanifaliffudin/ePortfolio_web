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
      <a href="#" class="block py-2 px-4 hover:bg-gray-100">Edit</a>
    </li>
    <li>
      <a href="#" class="block py-2 px-4 hover:bg-gray-100">Delete</a>
    </li>
    <li>
      <button
        id="doubleDropdownButton"
        data-dropdown-toggle="doubleDropdown"
        data-dropdown-placement="right-start"
        type="button"
        class="flex justify-between items-center py-2 px-4 w-full hover:bg-gray-100"
      >
        Visibility
      </button>
      <div
        id="doubleDropdown"
        class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
        data-popper-reference-hidden=""
        data-popper-escaped=""
        data-popper-placement="right-start"
        style="
                            position: absolute;
                            inset: 0px auto auto 0px;
                            margin: 0px;
                            transform: translate3d(10px, 6833.5px, 0px);
                          "
      >
        <ul
          class="p-3 space-y-3 text-sm text-gray-700"
          aria-labelledby="dropdownRadioButton"
        >
          <li>
            <div class="flex items-center">
              <input
                id="default-radio-1"
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                for="default-radio-1"
                class="ml-2 text-sm font-medium text-gray-900">Public</label
              >
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <input
                checked
                id="default-radio-2"
                type="radio"
                value=""
                name="default-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                for="default-radio-2"
                class="ml-2 text-sm font-medium text-gray-900">Private</label
              >
            </div>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</div>
