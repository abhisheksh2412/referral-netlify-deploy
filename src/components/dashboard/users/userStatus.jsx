export const HandeStatus = ({ status }) => {
  switch (status) {
    case "pending":
      return (
        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          {status}
        </span>
      );
    case "active":
      return (
        <span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-green-900 dark:text-green-300">
          {status}
        </span>
      );
    case "rejected":
      return (
        <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-red-900 dark:text-red-300">
          {status}
        </span>
      );
    default:
      return (
        <span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
          {status}
        </span>
      );
  }
};
