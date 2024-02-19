<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';

const { issuesQuery } = useIssues();
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12"></div>
    <span class="text-h4">GitHub Issues</span>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!-- TODO: Filtros -->
      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <!-- TODO: Loader -->
      <LoaderSpinner v-if="issuesQuery.isPending.value" color="white" />
      <!-- TODO: IssuesList - Array de IssueCard -->
      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>
</template>

<style scoped></style>
