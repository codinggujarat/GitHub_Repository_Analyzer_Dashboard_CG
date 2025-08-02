import React, { useEffect, useState } from 'react';
import github from '../api/github';
import CommitsChart from '../charts/CommitsChart';
import ContributorsChart from '../charts/ContributorsChart';
import LanguagesChart from '../charts/LanguagesChart';
import StarsGrowthChart from '../charts/StarsGrowthChart';

export default function Dashboard({ repo }) {
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [languages, setLanguages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');
                const [owner, name] = repo.split('/');

                // Fetch commits
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

                // Fetch contributors
                const contributorsRes = await github.get(`/repos/${owner}/${name}/contributors`);
                setContributors(contributorsRes.data);

                // Fetch languages
                const languagesRes = await github.get(`/repos/${owner}/${name}/languages`);
                setLanguages(languagesRes.data);

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
        <div className="dashboard-grid">
            <CommitsChart data={commits} />
            <ContributorsChart contributors={contributors} />
            <LanguagesChart languages={languages} />
            <StarsGrowthChart />
        </div>
    );
}
