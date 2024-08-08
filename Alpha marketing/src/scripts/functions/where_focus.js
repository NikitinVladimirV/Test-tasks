export function whereFocus() {
  document.addEventListener("focusin", function (event) {
    console.log("Focused element:", document.activeElement);
  });
}
