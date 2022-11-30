import { React, useEffect } from "react";

export default function useRemoveModal() {
  useEffect(() => {
    const modal = document.querySelector(".modal-backdrop");
    console.log(modal);
    if (modal) {
      modal.removeAttribute("class");
    }
  }, []);
}
