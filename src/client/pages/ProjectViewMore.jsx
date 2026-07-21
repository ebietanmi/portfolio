import { useLocation, useParams } from "react-router-dom";
// import logo from '../../assets/images/logo.jpg';

export default function PreviewProject() {
    const location = useLocation();
    const { id } = useParams();
    const project = location.state?.project;
    console.log(project);
    return (
        <div className="preview-wrapper">
            <div className="preview-container">
                {/* Centered overlayed */}
                <div className="preview-hero">
                    <img  src={`${project.project_img_url}`} alt={project.project_title} className="preview-hero-img" />
                    <div className="preview-hero-overlay">
                        <h1 className="preview-title">{project.project_title}</h1>
                        <p className="preview-subtitle">By {project.project_author}</p>
                    </div>
                </div>

                {/* CONTENT CARD */}
                <div className="preview-card">
                    <h2 className="preview-card-heading">About this Project</h2>
                    <p className="preview-description">{project.project_description}</p>

                    <div className="preview-meta">
                        <div className="preview-meta-item">
                            <span className="preview-meta-label">Author</span>
                            <span className="preview-meta-value">{project.project_author}</span>
                        </div>
                        <div className="preview-meta-item">
                            <span className="preview-meta-label">Created</span>
                            <span className="preview-meta-value">{project.project_date_created}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}