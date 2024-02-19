<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;

const { issueQuery, issueCommentsQuery } = useIssue(+id);
</script>

<template>
  <router-link class="text-white" to="/">Atras</router-link>

  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isPending.value"
    color="white"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>La Issue con el ID: {{ id }} no existe</p>

  <!-- Comentarios -->
  <LoaderSpinner
    v-if="issueCommentsQuery.isPending.value"
    :thickness="1"
    size="1.5rem"
    :show-text="false"
  />

  <div v-else-if="issueCommentsQuery.data.value" class="column">
    <span class="text-h3 q-mb-md"
      >Comentarios ({{ issueCommentsQuery.data.value.length }})</span
    >
    <IssueCard
      v-for="coments of issueCommentsQuery.data.value"
      :key="coments.id"
      :issue="coments"
    />
  </div>
</template>

<style scoped></style>
