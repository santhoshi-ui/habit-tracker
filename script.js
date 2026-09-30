const input = document.getElementById("habitInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("habitList");
const summary = document.getElementById("summary");

let habits = JSON.parse(localStorage.getItem("habits")) || [];

habits = habits.map(function (habit) {
  if (!habit.dates) {
    habit.dates = [];
  }
  return habit;
});

function save() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function dateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function getStreak(dates) {
  const day = new Date();
  if (!dates.includes(dateKey(day))) {
    day.setDate(day.getDate() - 1);
  }
  let streak = 0;
  while (dates.includes(dateKey(day))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

function render() {
  list.innerHTML = "";
  const today = dateKey(new Date());

  const doneCount = habits.filter(function (habit) {
    return habit.dates.includes(today);
  }).length;

  if (habits.length === 0) {
    summary.textContent = "";
  } else if (doneCount === habits.length) {
    summary.textContent = "All done today! 🎉";
  } else {
    summary.textContent = "Done today: " + doneCount + " / " + habits.length;
  }

  habits.forEach(function (habit, index) {
    const doneToday = habit.dates.includes(today);

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = doneToday;

    const label = document.createElement("span");
    label.className = "habit-name";
    label.textContent = habit.text;
    if (doneToday) {
      label.classList.add("done");
    }

    const streak = document.createElement("span");
    streak.className = "streak";
    streak.textContent = "🔥 " + getStreak(habit.dates);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete";

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        habit.dates.push(today);
      } else {
        habit.dates = habit.dates.filter(function (d) {
          return d !== today;
        });
      }
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
    li.appendChild(streak);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

button.addEventListener("click", function () {
  const text = input.value.trim();
  if (text === "") {
    return;
  }
  habits.push({ text: text, dates: [] });
  save();
  render();
  input.value = "";
});

render();