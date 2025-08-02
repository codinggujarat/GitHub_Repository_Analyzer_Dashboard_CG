import React, { useEffect, useState } from 'react';
import github from '../api/github';
import CommitsChart from '../charts/CommitsChart';
import ContributorsChart from '../charts/ContributorsChart';
import LanguagesChart from '../charts/LanguagesChart';
import StarsGrowthChart from '../charts/StarsGrowthChart';
import '../styles/Dashboard.css';

export default function Dashboard({ repo }) {
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [languages, setLanguages] = useState({});
    const [pullRequests, setPullRequests] = useState([]);
    const [issues, setIssues] = useState([]);
    const [forks, setForks] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const [owner, name] = repo.split('/');

                const commitsRes = await github.get(`/repos/${owner}/${name}/commits?per_page=100`);
                const commitData = commitsRes.data.map(commit => ({
                    date: new Date(commit.commit.author.date).toLocaleDateString(),
                    count: 1
                }));
                const grouped = commitData.reduce((acc, cur) => {
                    acc[cur.date] = (acc[cur.date] || 0) + 1;
                    return acc;
                }, {});
                const finalCommits = Object.keys(grouped).map(date => ({ date, count: grouped[date] }));
                setCommits(finalCommits);

                const contributorsRes = await github.get(`/repos/${owner}/${name}/contributors`);
                setContributors(contributorsRes.data);

                const languagesRes = await github.get(`/repos/${owner}/${name}/languages`);
                setLanguages(languagesRes.data);

                const pullsRes = await github.get(`/repos/${owner}/${name}/pulls?state=all&per_page=100`);
                setPullRequests(pullsRes.data);

                const issuesRes = await github.get(`/repos/${owner}/${name}/issues?state=all&per_page=100`);
                setIssues(issuesRes.data.filter(issue => !issue.pull_request));

                const repoRes = await github.get(`/repos/${owner}/${name}`);
                setForks(repoRes.data.forks_count);

            } catch (err) {
                console.error(err);
                setError('❌ Failed to fetch data. Please check the repository name or try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [repo]);

    if (loading) return <p className="text-gray-700">⏳ Loading data...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            {/* Summary Cards */}
            <div className="summary-cards">
                <div className="card-box">
                    <div className="dashboard-card">
                        <i className='bx bx-git-pull-request icon'></i>
                        <span className="label">Pull Requests</span>
                    </div>
                    <p>{pullRequests.length}</p>
                </div>

                <div className="card-box">
                    <div className="dashboard-card">
                        <i className='bx bx-error icon'></i>
                        <span className="label">Issues</span>
                    </div>
                    <p>{issues.length}</p>
                </div>

                <div className="card-box">
                    <div className="dashboard-card">
                        <i className='bx bx-git-repo-forked icon'></i>
                        <span className="label">Forks</span>
                    </div>
                    <p>{forks}</p>
                </div>

                <div className="card-box">
                    <div className="dashboard-card">
                        <i className='bx bx-group icon'></i>
                        <span className="label">Contributors</span>
                    </div>
                    <p>{contributors.length}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="dashboard-grid">
                <CommitsChart data={commits} />
                <ContributorsChart contributors={contributors} />
                <LanguagesChart languages={languages} />
                <StarsGrowthChart />
            </div>
        </div>
    );
}
