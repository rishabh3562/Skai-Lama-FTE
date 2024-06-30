import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/ProjectCard.css';
import getInitials from '../utils/getIntials';
import { Link, useNavigate } from 'react-router-dom';
import { useGetSlug } from '../hooks/queryHooks/useGetSlug';

const colors = ['#7E22CE', '#6366F1', '#F8A01D'];

const ProjectCard = ({ project }) => {
  const initials = getInitials(project.name);
  const backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  const relativeTime = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true });
  const navigate = useNavigate();

  const { data: slug, isLoading } = useGetSlug(project._id);

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder for loading state
  }

  const handleClick = () => {
    navigate(`/project/${slug.slug}/upload`, { state: { project, slug } });
  };

  return (
    // <Link to={`/project/${slug}/upload`} className="project-card-link" state={{ project, slug }}>
      <div className="project-card-link">
      <div className="project-card" onClick={handleClick}>
        <div className="initials-box" style={{ backgroundColor }}>
          <h1 className="initials">{initials}</h1>
        </div>
        <div className="content-box">
          <p className="project-name" title={project.name} style={{ color: backgroundColor }}>
            {project.name.length > 20 ? `${project.name.substring(0, 17)}...` : project.name}
          </p>
          <p className="project-length">4 Episodes</p> {/* Replace with actual project details */}
          <p className="last-edited">Last edited {relativeTime}</p> {/* Replace with actual project details */}
        </div>
      </div>
    {/* </Link> */}
    </div>
  );
};

export default ProjectCard;
