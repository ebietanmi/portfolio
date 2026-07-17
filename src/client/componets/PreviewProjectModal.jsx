import { useState } from 'react'
import {handleDeleteProject} from '../controllers/client_controllers.js'
import { Dialog } from './Dialog.jsx';
import { ScaleLoader } from 'react-spinners';




export default function PreviewProjectModal({ project, isModalShowing, setIsModalShowing, onProjectDeleted}) {
    const [acceptDeleteProject, setAcceptDeleteProject] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    return (
        <section className="project-preview-modal">
            { showDialog ? < Dialog
            isModalShowing={isModalShowing}
            setIsModalShowing={setIsModalShowing}
            projectID={project.id} 
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            acceptDeleteProject={acceptDeleteProject} 
            setAcceptDeleteProject={setAcceptDeleteProject}
            isLoading={isLoading}
            setLoading={setLoading}
            onProjectDelelted={onProjectDeleted} //Called to trigger reload
            /> 
            : <></>}
            <input onClick={() => { setIsModalShowing(false) }} className="close-modal-btn" type="button" value="x" />
            <div className="preview-heading">{project.project_title}</div>
            <div className="project-preview-content-wrapper">
                <div className="project-preview-avatar" style={{background:`url(src/server/${project.project_img_url})`,
                height:"400px",
                height:'400px',
                backgroundSize:'cover',
                backgroundPosition:'center',
                backgroundRepeat:'no-repeat'}}>
                </div>
                <div className="preview-content"> Author: {project.project_author}</div>
                <div className="preview-content"> Description: {project.project_description}</div>
                <div className="preview-content">Project was created on :{project.project_date_created}</div>
            </div>
            <div className="preview-actions">
                <input disabled={showDialog} onClick={(e)=>{
                    e.preventDefault()
                    e.stopPropagation()
                    setShowDialog(true)
                }} type="button" value="DELETE" />
            </div>
        </section>
    )
}