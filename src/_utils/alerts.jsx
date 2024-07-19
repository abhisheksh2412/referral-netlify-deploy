import Swal from "sweetalert2";

export const popup = ({
  status,
  message,
  confirmBtn = false,
  position = "top-right",
  timer = 1000,
}) => {
  return Swal.fire({
    icon: status,
    text: message,
    showConfirmButton: confirmBtn,
    position: position,
    timer: timer,
    
  });
};
