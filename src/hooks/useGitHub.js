import { useState, useEffect } from 'react';
import axios from 'axios';

const GITHUB_USERNAME = 'TheRealLaksh';
const REPO_NAMES = [
  'Portfolio-Website',
  'stranger-things',
  'Music-Player',
  'Callender-Events',
  'artist-portfolio',
  'Shopping-demo'
];

const useGitHub = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Fetch all repos in parallel
        const repoRequests = REPO_NAMES.map(name => 
          axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`)
        );

        const results = await Promise.allSettled(repoRequests);
        
        const validData = results
          .filter(result => result.status === 'fulfilled')
          .map(result => {
            const repo = result.value.data;
            
            // Genre Detection Logic
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
              language: repo.language,
              topics: repo.topics || [], // Fetch topics/tags
              genre: genre
            };
          });

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