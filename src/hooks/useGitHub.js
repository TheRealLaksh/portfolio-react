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
        const repoRequests = REPO_NAMES.map(name => 
          axios.get(`https://api.github.com/repos/${GITHUB_USERNAME}/${name}`)
        );

        const responses = await Promise.all(repoRequests);
        
        const data = responses.map(res => {
          const repo = res.data;
          
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
            genre: genre
          };
        });

        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("GitHub API Error:", err);
        setError("Failed to load projects from GitHub.");
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { projects, loading, error };
};

export default useGitHub;