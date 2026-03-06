<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from "vue";

// Props für alle Texte & Optionen
const props = defineProps<{
  modelValue: boolean,
  dialogTitle?: string,
  closeButtonText?: string,
  dragTitle?: string,
  browseText?: string,
  dividerText?: string,
  accept?: string // z.B. ".json"
}>();

// Events
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "file-loaded", file: File): void;
  (e: "content-loaded", content: string): void;
}>();

const fileModel = ref<File | null>(null);

// Watcher für File-Upload
watch(fileModel, (newFile) => {
  if (!newFile) return;

  emit("file-loaded", newFile);

  const reader = new FileReader();
  reader.onload = (e) => {
    const content = e.target?.result as string;
    emit("content-loaded", content);

    // Auto-clear nach Upload
    fileModel.value = null;
  };
  reader.readAsText(newFile, "UTF-8");
});

// Dialog schließen
function closeDialog() {
  emit("update:modelValue", false);
  fileModel.value = null;
}
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="600px">
    <v-card>
      <v-card-title>
        {{ props.dialogTitle ?? "import File" }}
        <v-spacer></v-spacer>
        <v-btn icon @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-file-upload
          v-model="fileModel"
          :browse-text="props.browseText ?? 'Local Filesystem'"
          :divider-text="props.dividerText ?? 'or choose locally'"
          icon="mdi-upload"
          :title="props.dragTitle ?? 'Drag and Drop Here'"
          :accept="props.accept ?? ''"
        ></v-file-upload>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="closeDialog">
          {{ props.closeButtonText ?? "Close" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>