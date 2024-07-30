export default function waitForTime(delay) {
  // Generate a random number between 2000 and 4000 milliseconds (2-4 seconds)
  const randomTime = parseInt(delay);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, randomTime);
  });
}
