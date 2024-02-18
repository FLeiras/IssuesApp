<script setup lang="ts">
import IssueCard from './IssueCard.vue';
</script>

<template>
  <div class="row">
    <IssueCard v-for="label of 20" :key="label" />
  </div>
</template>

<style scoped></style>
