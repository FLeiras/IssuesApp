<script setup lang="ts">
import { useIssueStore } from 'src/stores/issues';

const issuesStore = useIssueStore();
</script>

<template>
  <q-btn-toggle
    v-model="issuesStore.state"
    toogle-color="primary"
    push
    spread
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Close', value: 'closed' },
    ]"
  />
</template>

<style scoped></style>
