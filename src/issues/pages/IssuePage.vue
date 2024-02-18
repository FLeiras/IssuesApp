<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';

const route = useRoute();
const { id = '' } = route.params;
</script>

<template>
  <LoaderSpinner color="white" />

  <router-link class="text-white" to="/">Atras</router-link>

  <!-- Header -->
  <IssueCard />

  <!-- Comentarios -->
  <LoaderSpinner :thickness="1" size="1.5rem" :show-text="false" />

  <div class="column">
    <span class="text-h3 q-mb-md">Comentarios (5)</span>
    <IssueCard v-for="coments of 5" :key="coments" />
  </div>
</template>

<style scoped></style>
