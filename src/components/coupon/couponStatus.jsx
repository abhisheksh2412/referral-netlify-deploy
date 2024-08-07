export const CouponStatus = ({ status }) => {
  switch (status) {
    case "active":
      return (
        <span className="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-1 rounded-full dark:bg-green-900 dark:text-green-300">
          Active
        </span>
      );
    case "inactive":
      return (
        <span className="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
          Inactive
        </span>
      );

    default:
      return null;
  }
};
