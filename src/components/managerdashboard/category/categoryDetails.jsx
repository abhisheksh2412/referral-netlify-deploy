import Image from "next/image";
export default function CategoryDetails({ data }) {
  console.log(data);
  return (
    <div className=" rounded-md overflow-hidden">
      <div className="p-2 text-white font-semibold text-base bg-gradient-to-r from-blush-red  to-pink-200">
        <h1>Category Details</h1>
      </div>
      <div className="pt-4 flex flex-col items-center">
       
        <Image
          src={data?.category_image}
          width={500}
          height={500}
          alt="category_image"
          className="object-cover w-36 h-36 rounded-full shadow-lg p-2"
        />

        <div className="p-3  font-semibold text-lg text-center rounded-b-md text-blush-red">
          {data?.name}
        </div>
      </div>

      <div className="pb-4 text-center px-4">
        <h4 className="text-base text-gray-800 font-semibold">Description</h4>
        <p className="text-sm text-gray-800">{data?.description}</p>
      </div>
    </div>
  );
}
