// clock.js

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString("pt-PT", { timeZone: "Europe/Lisbon" });
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[now.getDay()];

    document.getElementById("time").textContent = time;
    document.getElementById("day").textContent = day;
    updateActivity(now, time, day);
    //applyTheme(now) applyTheme(now); 
}

function updateActivity(now, time, day) {
    let activity = "";
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if (time >= "09:00:00" && time < "10:00:00") {
        activity = "the cats are playing.";
        document.body.style.setProperty('--circle-color', "#00ff00");
    } else if (time >= "10:00:00" && time < "22:00:00" && weekdays.includes(day)) {
        activity = "the cats are sleeping.";
        document.body.style.setProperty('--circle-color', "#0000ff");
    }

    document.getElementById("activity").textContent = activity;
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

document.addEventListener("DOMContentLoaded", () => {
    updateClock();
    setInterval(updateClock, 1000);
});
