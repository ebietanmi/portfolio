
import { useState, useEffect } from "react";
import { getProjectsAPI } from "../controllers/APIs";
import { useNavigate } from "react-router-dom";


function ProjectCard({project}) {
    const navigate = useNavigate();
    function projectViewMore(id){
        navigate(`/project/${project.id}`, { state: { project: project } })
    }
    return (
        <div className="project-card">
            <div className="project-card-avatar"
                style={{
                    background: `url(${project.project_img_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}></div>
            <div className="project_card-texts">
                <h6 className="project-card-title" >{project.project_title}</h6>
                <p>{project.project_author}</p>
                <p>{project.project_description}</p>
                <p>{project.project_date_created}</p>
            </div>
            <button onClick={() => {
                projectViewMore(project.id)
            }} className="check-out-project-btn">
                check out project →
            </button>
        </div>

    )
}
export default ProjectCard;

