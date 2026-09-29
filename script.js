const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");

button.addEventListener("click", function () {
  const text = input.value;
  if (text === "") {
    return;
  }
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
  input.value = "";
});