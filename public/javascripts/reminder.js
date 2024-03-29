if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
        if (Notification.permission !== "granted") {
            // alert("Please allow notification access");
        }
    });
}

let timeoutIds = [];
let editingIndex = -1;

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    if (index !== null) {
        populateFormFields(index);
    }

    loadReminders();
});

function loadReminders() {
    let storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];

    for (let reminder of storedReminders) {
        addReminderToTable(reminder.title, reminder.description, reminder.dateTimeString);
        scheduleReminderNotification(reminder.title, reminder.description, reminder.dateTimeString);
    }
}

function saveReminderToLocalStorage(title, description, dateTimeString, index) {
    let storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];

    if (index !== undefined && index >= 0 && index < storedReminders.length) {
        // Update existing entry
        storedReminders[index] = { title, description, dateTimeString };
    } else {
        // Add new entry
        storedReminders.push({ title, description, dateTimeString });
    }

    localStorage.setItem("reminders", JSON.stringify(storedReminders));
}

function scheduleReminder() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('discription').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;

    let dateTimeString = date + " " + time;
    let scheduledTime = new Date(dateTimeString);
    let currentTime = new Date();
    let timeDifference = scheduledTime - currentTime;

    clearForm();

    if (timeDifference > 0) {
        if (editingIndex !== -1) {
            // Update existing entry
            saveReminderToLocalStorage(title, description, dateTimeString, editingIndex);
            editingIndex = -1; // Reset editing index after update
        } else {
            // Add new entry
            saveReminderToLocalStorage(title, description, dateTimeString);
        }

        let timeoutId = setTimeout(function () {
            document.getElementById("notificationSound").play();
            let notification = new Notification(title, {
                body: description,
                requireInteraction: true,
            });
        }, timeDifference);
        timeoutIds.push(timeoutId);
    } else {
        alert("The scheduled time is in the past!");
    }

    window.location.href = "/welcome/viewreminder";
}

function addReminderToTable(title, description, dateTimeString) {
    let tableBody = document.getElementById("reminderTableBody");

    if (!tableBody) {
        console.error("Element with id 'reminderTableBody' not found.");
        return;
    }

    let row = tableBody.insertRow();
    let titleCell = row.insertCell(0);
    let descriptionCell = row.insertCell(1);
    let dateTimeCell = row.insertCell(2);
    let actionCell = row.insertCell(3);

    titleCell.innerHTML = title;
    descriptionCell.innerHTML = description;
    dateTimeCell.innerText = dateTimeString;
    actionCell.innerHTML =
        '<button onclick="deleteReminder(this);">Delete</button> <button onclick="editReminder(this);">Edit</button>';
}

function scheduleReminderNotification(title, description, dateTimeString) {
    let scheduledTime = new Date(dateTimeString);
    let currentTime = new Date();
    let timeDifference = scheduledTime - currentTime;

    if (timeDifference > 0) {
        let timeoutId = setTimeout(function () {
            document.getElementById("notificationSound").play();
            let notification = new Notification(title, {
                body: description,
                requireInteraction: true,
            });
        }, timeDifference); 
        timeoutIds.push(timeoutId);
    }
}

function populateFormFields(index) {
    const storedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    const singleReminder = storedReminders[index];

    if (singleReminder) {
        document.getElementById('title').value = singleReminder.title || '';
        document.getElementById('discription').value = singleReminder.description || '';
        const dateTimeArray = singleReminder.dateTimeString.split(" ");
        document.getElementById('date').value = dateTimeArray[0] || '';
        document.getElementById('time').value = dateTimeArray[1] || '';
        editingIndex = index;
    }
}

function editReminder(button) {
    let row = button.closest("tr");
    let index = row.rowIndex - 1;

    // Redirect to the reminder.html page with the index as a query parameter
    window.location.href = "/welcome/reminder?index=" + index;
}

function deleteReminder(button) {
    let row = button.closest("tr");

    if (!row) {
        console.error("Parent row not found.");
        return;
    }

    let index = row.rowIndex;

    if (index < 1 || index > timeoutIds.length) {
        console.error("Invalid index:", index);
        return;
    }

    clearTimeout(timeoutIds[index - 1]);
    timeoutIds.splice(index - 1, 1);
    row.remove();

    // Remove the reminder from localStorage
    let storedReminders = JSON.parse(localStorage.getItem("reminders")) || [];
    storedReminders.splice(index - 1, 1);
    localStorage.setItem("reminders", JSON.stringify(storedReminders));
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('discription').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';
}
