
import localforage from "localforage";

// Konfigurasi database localForage
const db = localforage.createInstance({
  name: "FreeztoMartDB",
});

let note = ("");
let notes = ([]);
let isEditing = (false);
let editingId = (null);

// Load semua catatan dari localForage
export const loadNotes = async () => {
  let notes = [];
  await db.iterate((value, key) => {
    notes.push({ id: key, text: value.text });
  });
  return notes
};

export const saveNote = async () => {
  if (isEditing) {
    await db.setItem(editingId, { text: note });
    isEditing = false;
    editingId = null;
  } else {
    const id = Date.now().toString(); // id unik berbasis timestamp
    await db.setItem(id, { text: note });
  }

  note = "";
  await loadNotes();
};

export const deleteNote = async (id) => {
  await db.removeItem(id);
  await loadNotes();
};

export const editNote = (n) => {
  note = n.text;
  editingId = n.id;
  isEditing = true;
};

// onMounted(loadNotes);

// return {
//   note,
//   notes,
//   saveNote,
//   deleteNote,
//   editNote,
//   isEditing,
// };
