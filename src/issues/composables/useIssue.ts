// import { computed } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

import { Issue } from '../interfaces/issue';
import { gitHubApi } from 'src/api/githubApi';

const getIssue = async (issueId: number): Promise<Issue> => {
  const { data } = await gitHubApi.get<Issue>(`/issues/${issueId}`);

  return data;
};

const getIssueComments = async (issueId: number): Promise<Issue[]> => {
  const { data } = await gitHubApi.get<Issue[]>(`/issues/${issueId}/comments`);

  return data;
};

interface Options {
  //? AutoLoad issue and comments
  autoload?: boolean;
}

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoload = true } = options ?? {};

  const queryClient = useQueryClient();

  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
    enabled: autoload,
  });

  const issueCommentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueNumber),
    // queryFn: () => getIssueComments(issueQuery.data.value?.number || 0),
    staleTime: 1000 * 15,
    enabled: autoload,
    // enabled: computed(() => !!issueQuery.data.value),
  });

  const preFetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssue(issueNumber),
      staleTime: 1000 * 60,
    });

    queryClient.prefetchQuery({
      queryKey: ['issue', issueNumber, 'comments'],
      queryFn: () => getIssueComments(issueNumber),
      staleTime: 1000 * 15,
    });
  };

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return {
    //* Properties
    issueQuery,
    issueCommentsQuery,

    //* Methods
    preFetchIssue,
    setIssueCacheData,
  };
};

export default useIssue;
