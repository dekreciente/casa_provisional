function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("pt-PT", { timeZone: "Europe/Lisbon" });
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const day = dayNames[now.getDay()];

  const timeEl = document.getElementById("time");
  const dayEl = document.getElementById("day");
  const activityEl = document.getElementById("activity");

  if (timeEl) timeEl.textContent = time;
  if (dayEl) dayEl.textContent = day;

  updateActivity(now, day, activityEl);
}

function updateActivity(now, day, activityEl) {
  let activity = "";
  const hour = now.getHours();
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  if (hour === 9) {
    activity = "the cats are playing.";
    document.body.style.setProperty('--circle-color', "#00ff00");
  } else if (hour >= 10 && hour < 22 && weekdays.includes(day)) {
    activity = "the cats are sleeping.";
    document.body.style.setProperty('--circle-color', "#0000ff");
  } else {
    document.body.style.setProperty('--circle-color', "#ff0000");
  }

  if (activityEl) activityEl.textContent = activity;
}

function applyTheme(now) {
  const hour = now.getHours();
  if (hour < 7 || hour >= 20) {
    document.body.style.backgroundColor = "#111";
    document.body.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "inherit";
    document.body.style.color = "inherit";
  }
}
