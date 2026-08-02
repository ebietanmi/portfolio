import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faArrowLeft, faFile } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { handleLogin, handleCreateProject } from "../controllers/client_controllers";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";


export default function CreateProject() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="create-project-screen">
      <FontAwesomeIcon onClick={() => { navigate('/dashboard') }} className="addproject-back-btn" icon={faArrowLeft} color='white' />
      <div className="project-editor-wrapper">
        <div className="project-editor-header">
          <h6 className="project-editor-header-text">Project</h6>
          <ScaleLoader style={{ alignSelf: "center" }} height={10} width={3} loading={isLoading} />
          <FontAwesomeIcon className="project-editor-header-add-icon" icon={faAdd} size="1.5x" />
        </div>
        <hr className="hr-line" />
        <div className="form-wrapper">
          <form onSubmit={(e) => {
            e.preventDefault();
            let formData = new FormData(e.target);
            handleCreateProject({ formData }, isLoading, setLoading, navigate)
            formData = new FormData();
          }} method="post">
            <h5 className="project-textbox-label">Project Title</h5>
            <input required type="text" name="project_title" id="id-project-title" className="project-textbox" />
            <h5 className="project-textbox-label">Project Author</h5>
            <input required type="text" name="project_author" id="" className="project-textbox" />
            <h5 className="project-textbox-label">Project Description</h5>
            <textarea required name="project_description" id="" className="project-textbox" ></textarea>
            <h5 className="project-textbox-label">Project Thumbnail</h5>
            <input required className="project-select-file" type="file" name="img_file" id="fileID" />
            <FontAwesomeIcon icon={faFile} color="var(--accentColor)"></FontAwesomeIcon>
            <hr className="hr-line" />
            <div className="action-wrapper">
              <button className=" action-btn save-btn" type="submit" value="Save">Save</button>
              <button className=" action-btn cancel-btn" type="button" value="Cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}