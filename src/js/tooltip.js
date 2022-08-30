export default function tooltip(element, message) {
  const formControl = element.closest(".form-control");
  if (formControl.querySelector(".tooltip")) {
    formControl.querySelector(".tooltip").remove();
  }
  const tooltipElement = document.createElement("span");
  tooltipElement.textContent = message;
  tooltipElement.classList.add("tooltip");
  formControl.append(tooltipElement);
  element.classList.add("error");
}
