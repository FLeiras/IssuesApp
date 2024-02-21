import { ref } from 'vue';
import { defineStore } from 'pinia';
import { State } from 'src/issues/interfaces/issue';

export const useIssueStore = defineStore('issues', () => {
  //TODO: arreglar tipo de dato
  const state = ref<State>(State.All); //* all, open, closed
  const labels = ref<string[]>([]);

  return {
    //? State Properties
    state,
    labels,

    //? Getters

    //? Actions
    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label !== labelName);
        return;
      }

      labels.value.push(labelName);
    },
  };
});
