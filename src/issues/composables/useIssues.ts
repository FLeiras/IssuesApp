import { useQuery } from '@tanstack/vue-query';

import useStore from './useStore';
import { gitHubApi } from 'src/api/githubApi';
import { Issue, State } from '../interfaces/issue';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);
  if (labels.length > 0) {
    const lablesString = labels.join(',');
    params.append('labels', lablesString);
  }

  params.append('per_page', '10');

  const { data } = await gitHubApi.get<Issue[]>('/issues', {
    params,
  });

  return data;
};

const useIssues = () => {
  const { labels, state } = useStore();
  // const issueStore = useIssueStore();
  // const { labels, state } = storeToRefs(issueStore);

  const issuesQuery = useQuery({
    queryKey: ['issues', { labels, state }],
    queryFn: () => getIssues(labels.value, state.value),
  });

  return {
    issuesQuery,
  };
};

export default useIssues;
