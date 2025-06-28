<template>
  <q-select
    class="q-mb-md"
    hint="Wajib diisi"
    :rules="[(val) => !!val || 'Wajib diisi']"
    outlined
    v-model="model"
    :options="options"
    label="Nama Kurir"
    color="teal"
    clearable
    options-selected-class="text-deep-orange"
  >
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <q-icon :name="scope.opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
          <q-item-label caption>{{ scope.opt.description }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),

      options: [
        {
          label: "Google",
          value: "Google",
          description: "Search engine",
          icon: "mail",
        },
        {
          label: "Facebook",
          value: "Facebook",
          description: "Social media",
          icon: "bluetooth",
        },
        {
          label: "Twitter",
          value: "Twitter",
          description: "Quick updates",
          icon: "map",
        },
        {
          label: "Apple",
          value: "Apple",
          description: "iStuff",
          icon: "golf_course",
        },
        {
          label: "Oracle",
          value: "Oracle",
          disable: true,
          description: "Databases",
          icon: "casino",
        },
      ],
    };
  },
};
</script>
