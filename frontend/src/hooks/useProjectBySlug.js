// hooks/useProjectBySlug.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, API_ENDPOINTS } from '../utils/constants';
import { slugify } from '../utils/slugify';

const useProjectBySlug = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const url = `${BASE_URL}${API_ENDPOINTS.projects}/${slug}`;
        console.log(url);
        const response = await axios.get(url);
        console.log(response.data);
        setProject(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  return { project, loading, error };
};

export { useProjectBySlug, slugify };
