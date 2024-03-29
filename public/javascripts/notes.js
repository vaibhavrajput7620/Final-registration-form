let editingIndex = -1; // To track the index of the note being edited

document.addEventListener("DOMContentLoaded", () => {
    displayNotes();
});

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const storedEntries = localStorage.getItem('notes');

    if (storedEntries) {
      //  userEntries = JSON.parse(storedEntries);
        if (index !== null) {
            populateFormFields(index);
        } else {
            displayNotes();
        }
    } else {
       // userEntries = [];
    }
};

function addNote() {
    const noteInput = document.getElementById("note-input");
    const noteText = noteInput.value.trim();
    let notes = getNotes();

 

    window.location.replace("/welcome/viewnotes");
    

    if (noteText !== "" && editingIndex === -1 ) {
       
        notes.push(noteText);
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        editingIndex = -1;
        displayNotes();
    }

    if(editingIndex !== -1){
        const note = notes[editingIndex];
        const updatedNote = noteText;
      notes[editingIndex] = updatedNote;
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        editingIndex = -1;
        displayNotes();
    }

}

function getNotes() {
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];
}

function displayNotes() {
    const notesList = document.getElementById("notes-list");
    const notes = getNotes();

    notesList.innerHTML = "";

    if (notes.length === 0) {
        notesList.innerHTML = "<p>No notes available</p>";
    } else {
        notes.forEach((note, index) => {
            const noteItem = document.createElement("div");
            noteItem.className = "note-item";
            noteItem.innerHTML = `
                <p>${note}</p>
                <button onclick="editNote(${index})">Edit</button>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesList.appendChild(noteItem);
        });
    }
}
 
function populateFormFields(index) {
    console.log()
    const userEntries = JSON.parse(localStorage.getItem('notes'));
    const singleUserData = userEntries[index];

    document.getElementById('note-input').value = singleUserData;
    editingIndex = index;
}

function editNote(index) {
    const noteInput = document.getElementById('note-input');
    let notes = getNotes();
    
    console.log({noteInput,notes,index});

    // if (noteInput !== null) {
    //     noteInput.value = notes[index];
    //     editingIndex = index;   // Track the index being edited
    //     console.log({editingIndex});
    // }
    
 window.location.replace(`/welcome/notes?index=${index}`);
}

function updateNote() {
    const noteInput = document.getElementById("note-input");
    const updatedNote = noteInput.value.trim();

    if (updatedNote !== "") {
        let notes = getNotes();

        if (editingIndex !== -1) {
            notes[editingIndex] = updatedNote;
            localStorage.setItem("notes", JSON.stringify(notes));
            noteInput.value = "";
            editingIndex = -1;
            displayNotes();
        }
    }
}

function deleteNote(index) {
    let notes = getNotes();
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    editingIndex = -1;
    displayNotes();
}
