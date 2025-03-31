import { useEffect } from 'react';
import { FaBuilding, FaCalendarAlt } from 'react-icons/fa';

interface ProjectCardProps {
  title: string;
  company: string;
  date: string;
  stack: string[];
  description: string;
}

export default function ProjectCard({ title, company, date, stack, description }: ProjectCardProps) {
  useEffect(() => {
    console.log('ProjectCard rendering:', title);
  }, [title]);

  return (
    <div className="project-card" style={{ minHeight: '300px' }}>
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        
        <div className="project-company">
          <FaBuilding className="project-icon" />
          <span>{company}</span>
        </div>
        
        <div className="project-date">
          <FaCalendarAlt className="project-icon" />
          <span>{date}</span>
        </div>
        
        <p className="project-description">{description}</p>
        
        <div className="project-technologies">
          {stack.map(tech => (
            <span key={tech} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 