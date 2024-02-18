import { storeToRefs } from 'pinia';
import { useQuery } from '@tanstack/vue-query';

import { Label } from '../interfaces/label';
import { gitHubApi } from 'src/api/githubApi';
import { useIssueStore } from 'src/stores/issues';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await gitHubApi('/labels?per_page=100');

  return data;
};

const useLabels = () => {
  const issuesStore = useIssueStore();
  const { labels: selectedLabels } = storeToRefs(issuesStore);

  const labelsQuery = useQuery({
    queryKey: [],
    queryFn: () => getLabels(),
    staleTime: 1000 * 60 * 60, //! Esto es una hora
  });

  return {
    labelsQuery,

    //? Getters
    selectedLabels,

    //? Methods
    toggleLabel: issuesStore.toggleLabel,
  };
};

export default useLabels;
