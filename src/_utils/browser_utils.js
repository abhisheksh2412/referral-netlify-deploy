import Swal from "sweetalert2";

export const copyToClipboard = (link) => {
  if (typeof navigator !== "undefined") {
    navigator.clipboard.writeText(link).then(
      () => {
        Swal.mixin({ toast: true }).fire({
          icon: "success",
          text: "copied to clipboard",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        Swal.fire({
          icon: "error",
          text: "Failed to copy the link",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    );
  }
};
export const handleShare = async (url) => {
  if (typeof navigator !== "undefined") {
    if (navigator.share) {
      try {
        await navigator.share({
          url,
        });
        console.log("Link shared successfully");
      } catch (error) {
        console.error("Error sharing link:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  }
};
