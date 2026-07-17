import { useLocation, useParams } from "react-router-dom";
// import logo from '../../assets/images/logo.jpg';

export default function PreviewProject() {
    const location = useLocation();
    const { id } = useParams();
    const data = location.state?.data;
    console.log(data);
    return (
        <div className="preview-wrapper">
            <div className="preview-container">

                {/* HERO IMAGE WITH CENTERED OVERLAY */}
                <div className="preview-hero">
                    <img  src={'../../assets/logo.jpg'} alt={data.project_title} className="preview-hero-img" />
                    <div className="preview-hero-overlay">
                        <h1 className="preview-title">{data.project_title}</h1>
                        <p className="preview-subtitle">By {data.project_author}</p>
                    </div>
                </div>

                {/* CONTENT CARD */}
                <div className="preview-card">
                    <h2 className="preview-card-heading">About this Project</h2>
                    <p className="preview-description">{data.project_description}</p>

                    <div className="preview-meta">
                        <div className="preview-meta-item">
                            <span className="preview-meta-label">Author</span>
                            <span className="preview-meta-value">{data.project_author}</span>
                        </div>
                        <div className="preview-meta-item">
                            <span className="preview-meta-label">Created</span>
                            <span className="preview-meta-value">{data.project_date_created}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}