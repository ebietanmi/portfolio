
import { useState, useEffect } from "react";
import { getProjectsAPI } from "../controllers/APIs";


function ProjectCard({ title, author, description, date_created, img_url }) {
    return (
        <div className="project-card">
            <div className="project-card-avatar"
                style={{background:`url(src/server/${img_url})`,
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat',
            }}></div>
            <div className="project_card-texts">
                <h6 className="project-card-title" >{title}</h6>
                <p>{author}</p>
                <p>{description}</p>
                <p>{date_created}</p>
            </div>
        </div>

    )
}
export default ProjectCard;
