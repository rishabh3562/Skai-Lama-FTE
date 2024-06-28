import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/ProjectCard.css';
import getInitials from '../utils/getIntials';

const colors = ['#7E22CE', '#6366F1', '#F8A01D'];

const ProjectCard = ({ project, index }) => {
  const initials = getInitials(project.name);
  const colorIndex = index % colors.length;
  const backgroundColor = colors[colorIndex];
  const relativeTime = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true });

  return (
    <div className="project-card">
      <div className="initials-box" style={{ backgroundColor }}>
        <h1 className='initials'>
          {initials}
        </h1>
      </div>
      <div className="content-box">
        <p className="project-name" title={project.name} style={{ color: backgroundColor }}>
          {project.name.length > 20 ? `${project.name.substring(0, 17)}...` : project.name}
        </p>
        <p className="project-length">4 Episodes</p>
        <p className="last-edited">Last edited {relativeTime}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
