import { useIssueStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const useStore = () => {
  const issuesStore = useIssueStore();
  const { labels, state } = storeToRefs(issuesStore);

  return {
    //* Reactive Properties
    labels,
    state,

    //* Getters

    //* Actions or Methods
  };
};

export default useStore;
