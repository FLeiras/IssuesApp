import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { gitHubApi } from 'src/api/githubApi';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  body = '',
  labels = [],
}: Args): Promise<Issue> => {
  const newIssueData = {
    title,
    body,
    labels,
  };

  const { data } = await gitHubApi.post<Issue>('/issues', newIssueData);
  console.log('Data de GitHub', data);

  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();

  const issueMutation = useMutation({
    mutationFn: addIssue,
    onSuccess: (issue) => {
      queryClient.invalidateQueries({ queryKey: ['isuues'], exact: false });
      queryClient.refetchQueries({ queryKey: ['issues'], exact: false });
      queryClient.setQueryData(['issue', issue], issue);
    },
    onError: () => {
      // Algo
    },
  });

  return {
    issueMutation,
  };
};

export default useIssueMutation;
