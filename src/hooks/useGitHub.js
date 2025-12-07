import { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = 'TheRealLaksh';
const REPO_NAMES = [
  'portfolio-react',
  'stranger-things',
  'Music-Player',
  'Callender-Events',
  'Portfolio-Website', 
  'Shopping-demo'
];

const CACHE_KEY = 'github_repos_data';
const CACHE_DURATION = 60 * 60 * 1000; // 1 Hour

const useGitHub = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      // 1. Check Cache
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setProjects(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error("Cache parse error", e);
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // 2. Fetch if no cache
      try {
        const promises = REPO_NAMES.map(async (repoName) => {
          try {
            // Fix: Trim repo name to avoid 404s from trailing spaces
            const cleanName = repoName.trim();
            const { data: repo } = await axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${cleanName}`);
            
            // Optional: Fetch languages if needed, or default to empty
            let langs = {};
            try {
               const langRes = await axios.get(repo.languages_url);
               langs = langRes.data;
            } catch (e) {
               console.warn(`Could not fetch languages for ${cleanName}`);
            }
            
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
              languages: Object.keys(langs),
              genre: genre
            };
          } catch (err) {
            console.warn(`Failed to fetch ${repoName}`, err);
            return null; // Return null so we can filter it out later
          }
        });

        const results = await Promise.all(promises);
        const validData = results.filter(Boolean); // Filter out failed requests (nulls)

        if (validData.length > 0) {
          setProjects(validData);
          // Save to Cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: validData,
            timestamp: Date.now()
          }));
        } else {
          setError("No projects found or API limit reached.");
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