export default class Table {
  constructor(data) {
    this.data = data;
  }

  render() {
    const tbody = document.querySelector(".table-body");
    tbody.innerHTML = "";
    this.data.map((row) => {
      const { name, price } = row;

      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      tdName.classList.add("name-item");
      tdName.textContent = name;
      tr.append(tdName);

      const tdPrice = document.createElement("td");
      tdPrice.textContent = price;
      tr.append(tdPrice);

      const trEdit = document.createElement("td");
      trEdit.classList.add("icon");
      trEdit.classList.add("icon-edit");
      trEdit.textContent = String.fromCodePoint(9998);
      tr.append(trEdit);

      const trDelete = document.createElement("td");
      trDelete.classList.add("icon");
      trDelete.classList.add("icon-remove");
      trDelete.textContent = String.fromCodePoint(10006);
      tr.append(trDelete);

      tbody.prepend(tr);
      return tr;
    });
  }

  add(newData) {
    this.data.push(newData);
    this.render();
  }

  remove(name) {
    this.data = this.data.filter((it) => it.name !== name);
    this.render();
  }

  edit(id, newData) {
    const editData = { id, name: newData.name, price: +newData.price };
    this.data = this.data.map((it) => (it.id === id ? editData : it));
    this.render();
  }
}
