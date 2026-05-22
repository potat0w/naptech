"use client";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const brand = {
  confirm: "#644596",
  cancel: "#6b6560",
};

export async function confirmDialog(options: {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  icon?: "warning" | "question" | "info";
}) {
  const result = await Swal.fire({
    title: options.title,
    text: options.text,
    icon: options.icon ?? "warning",
    showCancelButton: true,
    confirmButtonText: options.confirmText ?? "Confirm",
    cancelButtonText: options.cancelText ?? "Cancel",
    confirmButtonColor: brand.confirm,
    cancelButtonColor: brand.cancel,
    reverseButtons: true,
    focusCancel: true,
    customClass: {
      popup: "!rounded-2xl !font-[family-name:var(--font-outfit)]",
      title: "!text-lg !font-semibold !text-neutral-900",
      htmlContainer: "!text-sm !text-muted",
      confirmButton: "!rounded-xl !px-5 !py-2.5 !text-sm !font-semibold",
      cancelButton: "!rounded-xl !px-5 !py-2.5 !text-sm !font-medium",
    },
  });

  return result.isConfirmed;
}

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    customClass: {
      popup: "!rounded-xl !font-[family-name:var(--font-outfit)]",
    },
  });

  return Toast.fire({
    icon: type,
    title: message,
  });
}
