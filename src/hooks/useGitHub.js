import { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = 'TheRealLaksh';
const REPO_NAMES = [
  'portfolio-react',
  'stranger-things',
  'Music-Player',
  'Callender-Events',
  'Portfolio-Website ',
  'Shopping-demo'
];

const useGitHub = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const promises = REPO_NAMES.map(async (repoName) => {
          try {
            // 1. Fetch Repo Info
            const { data: repo } = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
            
            // 2. Fetch Languages
            const { data: langs } = await axios.get(repo.languages_url);
            const languages = Object.keys(langs); // Get array of language names

            // Genre Detection
            let genre = 'code';
            const lowerName = repo.name.toLowerCase();
            if (lowerName.includes('music')) genre = 'music';
            else if (lowerName.includes('artist')) genre = 'art';
            else if (lowerName.includes('calendar') || lowerName.includes('callender')) genre = 'calendar';
            else if (lowerName.includes('shop')) genre = 'shop';
            else if (lowerName.includes('stranger')) genre = 'tv';

            return {
              id: repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.html_url,
              demo: repo.homepage,
              stars: repo.stargazers_count,
              languages: languages, // Now contains ["HTML", "CSS", "JavaScript"] etc.
              genre: genre
            };
          } catch (err) {
            console.warn(`Failed to fetch ${repoName}`, err);
            return null;
          }
        });

        const results = await Promise.all(promises);
        const validData = results.filter(Boolean); // Filter out nulls

        if (validData.length === 0) {
          setError("No projects found or API limit reached.");
        } else {
          setProjects(validData);
        }
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading, error };
};

export default useGitHub;