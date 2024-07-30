import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import { useState } from "react";
import clsx from "clsx";
import { Info } from "lucide-react";

const Content = ({ imageSize, imageUrl }) => {
  const handleDownloadClick = (event) => {
    event.preventDefault();
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "sample-image.png";
    link.click();
  };
  return (
    <>
      <h3 className="font-semibold text-xs text-black mb-2">
        Please Upload an Image That Meet The Following Guidelines
      </h3>
      <ol>
        <li className="text-xs">Image Should be in JPEG or PNG Format</li>
        <li className="text-xs">Maximum File Size is 2MB</li>
        <li className="text-xs">
          Dimensions Should be at Least {imageSize} Pixels.
        </li>
      </ol>
      <h2 className="font-semibold text-sm m-4 text-center text-pink-400">
        Sample Card Image
      </h2>
      <div className=" rounded-xl bg-gray-50">
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="Picture of the author"
          className="!w-40 !h-40 mx-auto object-cover"
        />

        <div className="text-center m-4">
          <Link
            href={imageUrl}
            onClick={handleDownloadClick}
            className="text-white text-xs bg-blush-red text-md rounded-lg py-3 px-8 mb-5"
          >
            Download Sample Image
          </Link>
        </div>
      </div>
    </>
  );
};

export default function UseSampleImage({
  imageSize = "500x500",
  imageUrl = "/assets/combo-3.png",
  buttonClass = "text-white bg-blush-red w-full p-4",
  popper = true,
  buttonContent = "View Sample",
}) {
  const [contentHeight, setContextHeight] = useState(false);
  const contentHtml = ReactDOMServer.renderToString(
    <Content imageSize={imageSize} imageUrl={imageUrl} />
  );

  const handleContentShow = () => {
    setContextHeight(!contentHeight);
  };

  const handleOnclick = () => {
    return Swal.mixin({ toast: true }).fire({
      html: contentHtml,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        popup: "swal2-content",
      },
    });
  };

  return (
    <>
      {popper ? (
        <Popover>
          <PopoverHandler>
            <Button className={buttonClass}>{buttonContent}</Button>
          </PopoverHandler>
          <PopoverContent className="!z-50">
            <Content imageSize={imageSize} imageUrl={imageUrl} />
          </PopoverContent>
        </Popover>
      ) : (
        <div>
          <Button
            onClick={() => handleContentShow()}
            className={clsx(
              buttonClass,
              "bg-white !p-1 mb-3 border border-blush-red !text-xs text-blush-red rounded-full !font-normal capitalize flex gap-2"
            )}
          >
            <Info size={14} /> image Sample
          </Button>
          <div
            className={clsx(
              `overflow-hidden transition-all duration-500 w-full`,
              contentHeight ? "h-[55vh]" : "h-[0vh]"
            )}
          >
            <Content imageSize={imageSize} imageUrl={imageUrl} />
          </div>
        </div>
      )}
    </>
  );
}
