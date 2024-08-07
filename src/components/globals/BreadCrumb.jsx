import clsx from "clsx";
import Link from "next/link";

const BreadcrumbGlobal = ({
  pageName,
  description,
  PreviousPathClass,
  caretClass,
}) => {
  return (
    <>
      <section className="relative z-10">
        <div className="containers">
          <div className=" flex flex-wrap items-center">
            <div className="text-end">
              <ul className="flex items-center md:justify-end">
                <li className="flex items-center">
                  <Link href="/" legacyBehavior>
                    <a
                      className={clsx(
                        "pr-1 text-base mobile:text-sm font-normal",
                        PreviousPathClass
                      )}
                    >
                      Home
                    </a>
                  </Link>
                  <span
                    className={clsx(
                      "mr-3 block h-2 w-2 rotate-45 border-t-2 border-r-2 border-gray-800",
                      caretClass
                    )}
                  ></span>
                </li>
                <li className="text-base mobile:text-sm font-semibold text-pink-400 whitespace-nowrap">
                  {pageName}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadcrumbGlobal;
