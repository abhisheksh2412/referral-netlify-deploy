"use client";
import EasySelect from "../globals/EasySelect";
import GlobalInput from "../globals/globalInput";

export default function CustomerAddStoreForm() {
  const options = [{ label: "name", value: "name" }];
  return (
    <div className="w-full flex items-center justify-center">
      <form className="w-2/4 p-4 shadow-lg rounded-xl">
        {/* Image upload */}
        <div className="w-full">
          <p className="text-base font-semibold mb-2">Upload Store Logo</p>
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG (MAX. 100x100px , 2MB)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        {/* store name */}
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Store Name
          </label>
          <GlobalInput
            placeholder="Enter Store Name"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Select Category
          </label>
          <EasySelect
            options={options}
            placeholder="Select Category"
            className="text-xs"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Store No
          </label>
          <GlobalInput
            type="number"
            placeholder="Enter Store House No"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Street
          </label>
          <GlobalInput
            type="text"
            placeholder="Enter Store Street"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Town
          </label>
          <GlobalInput
            type="text"
            placeholder="Enter Town"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Postal Code
          </label>
          <GlobalInput
            type="number"
            placeholder="12-345"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Mobile No
          </label>
          <GlobalInput
            type="text"
            placeholder="Enter Mobile No"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Mobile No
          </label>
          <GlobalInput
            type="text"
            placeholder="Enter Mobile No"
            inputClassName="outline-none text-sm"
            parentClassName="p-1.5 px-2 rounded-md border"
          />
        </div>
        <div className="py-3">
          <label htmlFor="store_name" className="text-sm text-gray-700">
            Store Description
          </label>
          <textarea
            rows={3}
            className="w-full px-2 p-1.5 text-sm border rounded-md outline-none"
            placeholder="Enter Sort Description"
          ></textarea>
        </div>

        <button className="w-full p-2 text-white text-sm rounded-md font-semibold bg-blush-red">
          Submit
        </button>
      </form>
    </div>
  );
}
