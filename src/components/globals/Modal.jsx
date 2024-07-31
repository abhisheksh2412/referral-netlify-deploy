import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react"; // Adjust the import according to your library
import { X } from "lucide-react";

export default function Modal({ open, size, handleOpen, children }) {
  const headerChildren = [];
  const bodyChildren = [];
  const footerChildren = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.props.className === "modal-header") {
        headerChildren.push(child);
      } else if (child.props.className === "modal-footer") {
        footerChildren.push(child);
      } else {
        bodyChildren.push(child);
      }
    }
  });

  return (
    <Dialog
      open={open}
      size={size}
      handler={handleOpen}
      className="mobile:max-w-[98%] relative"
    >
      {headerChildren.length > 0 && (
        <DialogHeader className="p-0 flex-col">{headerChildren}</DialogHeader>
      )}
      <button
        onClick={() => handleOpen(null)}
        className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white text-gray-800"
      >
        <X size={13} />
      </button>
      <DialogBody>{bodyChildren}</DialogBody>
      {footerChildren.length > 0 && (
        <DialogFooter>{footerChildren}</DialogFooter>
      )}
    </Dialog>
  );
}
