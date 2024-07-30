import React from "react";
import Image from "next/image";

function Logo() {
  return (
    <div>
    
      <Image
        src="/assets/logo.png"
        width={500}
        height={500}
        alt="logo"
        className="w-24 md:w-32 lg:w-40 md-landscape:w-28"
      />
    </div>
  );
}

export default Logo;
