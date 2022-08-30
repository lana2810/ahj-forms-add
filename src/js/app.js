import Table from "./table";
import data from "./data";
import validator from "./validator";
import tooltip from "./tooltip";

const IdItem = "IdItem";
const table = new Table(data);
table.render();

const addButton = document.querySelector(".add");
const confirmButton = document.querySelector(".confirm");
const cancelButton = document.querySelector(".cancel");
const form = document.querySelector("form");
const tbody = document.querySelector(".table-body");
const errors = {
  isRequired: "Поле должно быть заполнено",
  isNumber: "Значение должно быть числом",
};

const renderForm = ({ name, price }) => {
  if (form.querySelector(".tooltip")) {
    form.querySelector(".tooltip").remove();
  }

  form.querySelectorAll("input").forEach((el) => el.classList.remove("error"));
  form.classList.remove("hidden");
  const inputName = document.querySelector("#name");
  const inputPrice = document.querySelector("#price");
  inputName.value = name;
  inputPrice.value = price;
};

addButton.addEventListener("click", (e) => {
  e.preventDefault();
  renderForm({ name: "", price: "" });
});

tbody.addEventListener("click", ({ target }) => {
  if (target.classList.contains("icon-edit")) {
    const editItemName = target
      .closest("tr")
      .querySelector("td.name-item").textContent;
    const editItem = data.find((it) => it.name === editItemName);
    localStorage.setItem(IdItem, editItem.id);
    renderForm(editItem);
  }

  if (target.classList.contains("icon-remove")) {
    const deletedItemName = target
      .closest("tr")
      .querySelector("td.name-item").textContent;
    table.remove(deletedItemName);
  }
});

confirmButton.addEventListener("click", (e) => {
  e.preventDefault();
  const inputName = document.querySelector("#name");
  const inputPrice = document.querySelector("#price");
  if (validator("isRequired", inputName.value)) {
    tooltip(inputName, errors.isRequired);
    return;
  }
  if (validator("isRequired", inputPrice.value)) {
    tooltip(inputPrice, errors.isRequired);
    return;
  }
  if (validator("isRequired", inputPrice.value)) {
    tooltip(inputPrice, errors.isRequired);
    return;
  }
  if (validator("isNumber", inputPrice.value)) {
    tooltip(inputPrice, errors.isNumber);
    return;
  }
  const newData = {};
  newData.name = inputName.value;
  newData.price = inputPrice.value;

  if (localStorage.getItem(IdItem)) {
    const id = +localStorage.getItem(IdItem);
    localStorage.removeItem(IdItem);
    form.classList.add("hidden");
    table.edit(id, newData);
  } else {
    newData.id = Date.now();
    form.classList.add("hidden");
    table.add(newData);
  }
});

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
  form.classList.add("hidden");
});
