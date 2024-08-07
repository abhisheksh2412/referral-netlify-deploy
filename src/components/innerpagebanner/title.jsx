import React from "react";

function Title({ title }) {
  return (
    <div>
      <h3 className="text-center text-2xl mobile:text-xl leading-tight mb-6 mobile:mb-3 md:mb-2 mobile:font-semibold font-bold text-black whitespace-nowrap">
        {title}
      </h3>
    </div>
  );
}

export default Title;
