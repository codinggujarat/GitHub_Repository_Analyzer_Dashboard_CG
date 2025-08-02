import { useState, useEffect } from 'react';
import {
    fetchCommits, fetchContributors, fetchLanguages, fetchStargazers,
} from '../api/github';
import CommitsChart from '../charts/CommitsChart';
import ContributorsChart from '../charts/ContributorsChart';
import LanguagesChart from '../charts/LanguagesChart';
import StarsGrowthChart from '../charts/StarsGrowthChart';
import PDFButton from './PDFButton';

export default function Dashboard({ owner, repo }) {
    const [commits, setCommits] = useState([]);
    const [contributors, setContributors] = useState([]);
    const [languages, setLanguages] = useState({});
    const [stars, setStars] = useState([]);

    useEffect(() => {
        (async () => {
            setCommits(await fetchCommits(owner, repo));
            setContributors(await fetchContributors(owner, repo));
            setLanguages(await fetchLanguages(owner, repo));
            setStars(await fetchStargazers(owner, repo));
        })();
    }, [owner, repo]);

    return (
        <div id="dashboard">
            <h2 className="text-xl font-bold mb-4">{owner}/{repo}</h2>
            <CommitsChart commits={commits} />
            <ContributorsChart contributors={contributors} />
            <LanguagesChart languages={languages} />
            <StarsGrowthChart stars={stars} />
            <PDFButton />
        </div>
    );
}
