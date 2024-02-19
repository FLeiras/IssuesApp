import axios from 'axios';

export const gitHubApi = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}`,
  headers: {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});
