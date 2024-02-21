<script setup lang="ts">
import { ref, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
  isOpened: boolean;
  getLabels: string[];
}

interface Emits {
  (e: 'onClosed'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isOpen = ref<boolean>(false);

const title = ref<string>('');
const body = ref<string>('');
const labels = ref<string[]>([]);

watch(props, () => {
  isOpen.value = props.isOpened;
});

watch(
  () => issueMutation.isSuccess.value,
  (isSucces) => {
    if (isSucces) {
      title.value = '';
      body.value = '';
      labels.value = [];

      issueMutation.reset();
      emits('onClosed');
    }
  }
);
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form @submit="issueMutation.mutate({ title, body, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">Nueva Issue</div>
              <div class="text-grey">Agrega una etiqueta</div>
            </div>

            <q-space />

            <div>
              <q-input
                dense
                filled
                v-model="title"
                label="Title"
                placeholder="Title"
                class="q-mb-sm"
                :rules="[(val) => !!val || 'El input no puede estar vacio']"
              />

              <q-select
                filled
                v-model="labels"
                multiple
                :options="props.getLabels"
                use-chips
                stack-label
                label="Selector multiple"
                class="q-mb-sm"
              />

              <!-- Markdown editor -->
              <MdEditor
                v-model="body"
                placeholder="# Markdown"
                language="en-US"
              />
            </div>
          </q-card-section>

          <q-card-actions align="left">
            <q-btn
              :disable="issueMutation.isPending.value"
              @click="emits('onClosed')"
              flat
              label="Cancelar"
              v-close-popup
              color="dark"
            />
            <q-space />
            <q-btn
              :disable="issueMutation.isPending.value"
              type="submit"
              flat
              label="Agregar issue"
              v-close-popup
              color="dark"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
