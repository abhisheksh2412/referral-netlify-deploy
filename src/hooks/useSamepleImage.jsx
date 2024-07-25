import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";

export const useSampleImage = () => {
  return (
    <Popover>
      <PopoverHandler>
        <Button className="text-white bg-blush-red w-full p-4">
          View Sample
        </Button>
      </PopoverHandler>
      <PopoverContent>
        <h3 className="font-semibold text-base text-black mb-2">
          Please Upload an Image That Meet The Following Guidelines
        </h3>
        <ol>
          <li>Image Should be in JPEG or PNG Format</li>
          <li>Maximum File Size is 2MB</li>
          <li>Dimensions Should be at Least 500x500 Pixels.</li>
        </ol>
        <h2 className="font-semibold text-base text-black m-4 text-center text-pink-400">
          Sample Card Image
        </h2>
        <div className=" rounded-xl bg-gray-50">
          <Image
            src="/assets/combo-3.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="!w-60 !h-60 mx-auto object-cover"
          />

          <div className="text-center m-4">
            <button className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mb-5">
              Download Sample Image
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
