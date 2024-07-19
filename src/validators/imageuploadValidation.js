export function CombovalidateImage(file) {
  return new Promise((resolve, reject) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return reject("Invalid file type. Only PNG, JPEG, and JPG are allowed.");
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      return reject("File size exceeds the maximum limit of 2MB.");
    }

    // Validate image dimensions
    const img = new Image();
    img.onload = function () {
      const requiredWidth = 120;
      const requiredHeight = 60;

      if (img.width !== requiredWidth || img.height !== requiredHeight) {
        return reject(
          `Image dimensions must be exactly ${requiredWidth}x${requiredHeight} pixels.`
        );
      }

      // If all validations pass
      resolve("Image is valid.");
    };

    img.onerror = function () {
      reject("Invalid image file.");
    };

    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
