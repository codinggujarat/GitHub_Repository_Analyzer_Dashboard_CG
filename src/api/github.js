import axios from 'axios';

const github = axios.create({
    baseURL: 'https://api.github.com/',
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
});

// ✅ 1. Get Repo Details
export const fetchRepoDetails = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}`);
    return response.data;
};

// ✅ 2. Get Pull Requests (open + closed)
export const fetchPullRequests = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}/pulls?state=all&per_page=100`);
    return response.data;
};

// ✅ 3. Get Issues (excluding PRs)
export const fetchIssues = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}/issues?state=all&per_page=100`);
    // Filter out PRs (issues with `pull_request` key are PRs)
    return response.data.filter(issue => !issue.pull_request);
};

// ✅ 4. Get Contributor Stats
export const fetchContributorStats = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}/stats/contributors`);
    return response.data;
};

// ✅ 5. Get Languages Used
export const fetchLanguages = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}/languages`);
    return response.data;
};

// ✅ 6. Get Commits (for mock growth or time-based analysis)
export const fetchCommits = async (repo) => {
    const [owner, name] = repo.split('/');
    const response = await github.get(`/repos/${owner}/${name}/commits?per_page=100`);
    return response.data;
};

export default github;
