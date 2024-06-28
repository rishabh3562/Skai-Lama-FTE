import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import '../styles/ProjectCard.css';
import getInitials from '../utils/getIntials';
import getRandomColor from '../utils/randomColour';



const ProjectCard = (props) => {
  const { project } = props;
  const initials = getInitials(project.name);
  const backgroundColor = getRandomColor();
  const relativeTime = formatDistanceToNow(new Date(project.updatedAt), { addSuffix: true });

  return (
    <div className="project-card">
      <div className="initials-box" style={{ backgroundColor }}>
        {initials}
      </div>
      <div className="content-box">
        <p className="project-name" title={project.name}>
          {project.name.length > 20 ? `${project.name.substring(0, 17)}...` : project.name}
        </p>
        <p className="project-length">4 Episodes</p>
        <p className="last-edited">Last edited: {relativeTime}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
