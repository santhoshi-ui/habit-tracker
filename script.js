const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function render() {
  list.innerHTML = "";

  habits.forEach(function (habit, index) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;

    const label = document.createElement("span");
    label.textContent = habit.text;
    if (habit.done) {
      label.classList.add("done");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";

    checkbox.addEventListener("change", function () {
      habits[index].done = checkbox.checked;
      save();
      render();
    });

    deleteBtn.addEventListener("click", function () {
      habits.splice(index, 1);
      save();
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", function () {
  const text = input.value.trim();
  if (text === "") {
    return;
  }
  habits.push({ text: text, done: false });
  save();
  render();
  input.value = "";
});

render();