<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Catatan Lokal (localForage)</h2>

    <form @submit.prevent="saveNote" class="mb-4">
      <input
        v-model="note"
        placeholder="Tulis catatan..."
        class="border px-2 py-1 mr-2"
      />
      <button type="submit" class="bg-blue-500 text-white px-3 py-1">
        {{ isEditing ? "Update" : "Tambah" }}
      </button>
    </form>
    {{ notes }}
    <ul>
      <li
        v-for="n in notes"
        :key="n.id"
        class="flex justify-between items-center border-b py-1"
      >
        <span>{{ n.text }}</span>
        <div>
          <button @click="editNote(n)" class="text-blue-500 mr-2">Edit</button>
          <button @click="deleteNote(n.id)" class="text-red-500">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import localforage from "localforage";

// Konfigurasi database localForage
const db = localforage.createInstance({
  name: "CatatanDB",
  storeName: "notes",
});

export default {
  setup() {
    const note = ref("");
    const notes = ref([]);
    const isEditing = ref(false);
    const editingId = ref(null);

    // Load semua catatan dari localForage
    const loadNotes = async () => {
      notes.value = [];
      await db.iterate((value, key) => {
        console.log("loadNotes", value, key);
        notes.value.push({ id: key, text: value.text });
      });
    };

    const saveNote = async () => {
      if (isEditing.value) {
        await db.setItem(editingId.value, { text: note.value });
        isEditing.value = false;
        editingId.value = null;
      } else {
        const id = Date.now().toString(); // id unik berbasis timestamp
        await db.setItem(id, { text: note.value });
      }

      note.value = "";
      await loadNotes();
    };

    const deleteNote = async (id) => {
      await db.removeItem(id);
      await loadNotes();
    };

    const editNote = (n) => {
      note.value = n.text;
      editingId.value = n.id;
      isEditing.value = true;
    };

    onMounted(loadNotes);

    return {
      note,
      notes,
      saveNote,
      deleteNote,
      editNote,
      isEditing,
    };
  },
};
</script>

<style scoped>
body {
  font-family: sans-serif;
}
</style>
