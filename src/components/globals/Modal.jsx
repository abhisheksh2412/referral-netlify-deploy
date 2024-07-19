import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react"; // Adjust the import according to your library

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
    <Dialog open={open} size={size} handler={handleOpen} className="mobile:max-w-[98%]">
      {headerChildren.length > 0 && (
        <DialogHeader className="p-0 flex-col">{headerChildren}</DialogHeader>
      )}
      <DialogBody>{bodyChildren}</DialogBody>
      {footerChildren.length > 0 && (
        <DialogFooter>{footerChildren}</DialogFooter>
      )}
    </Dialog>
  );
}
