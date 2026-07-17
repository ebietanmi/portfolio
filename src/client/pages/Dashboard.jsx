import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faBlog, faCake, faDashboard, faFile, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLoaderData, data } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react";
import { getProjectsAPI } from "../controllers/APIs";
import TableData from "../componets/TableData";
import { handleLogout } from "../controllers/client_controllers";
import PreviewProjectModal from '../componets/PreviewProjectModal';
import { ResetPassword } from "../componets/ResetPassword";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons/faUserAlt";

function Dashboard() {

    const { username } = useLoaderData(); //Because we used createBrowser router we can use useLoader to fetch data across the site
    const navigate = useNavigate()
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const fetchProjects = useCallback(() => {
        getProjectsAPI()
            .then(res => res.json())
            .then(setProjects)
    }, [])

    useEffect(() => {
        fetchProjects()
    }, [])

    function previewProjectHandler(project){
        console.log(project);
        // <Link to={`/dashboard/project/${project.id}`} />
        navigate(`/dashboard/project/${project.id}`, {state:{data:project}});
    }

    return (
        <section className="dashboard-container">
            <aside className="dashboard-content-left">
                <div className="top">
                    <h3 className="dashboard-head"><FontAwesomeIcon className="pr-2!" icon={faDashboard} color="white" size="1.5x" />
                        Dashboard - Welcome,
                        <br />
                        <span>{username.toUpperCase()}</span>
                    </h3>
                    <hr />
                    <h6 className="project-count customSecondarytextColor">Number of projects:{projects.length}</h6>
                    <div className="operation-wrapper">
                       <button onClick={()=>{navigate('/dashboard/create-blog')}} className="operation-btn" type="button"><FontAwesomeIcon icon={faBlog} ></FontAwesomeIcon> Blog</button> 
                       <button onClick={()=>{navigate('/dashboard/create-user')}} type="button"><FontAwesomeIcon icon={faUser} ></FontAwesomeIcon> User</button> 
                    </div>
                </div>
                <ResetPassword />
            </aside>
            <div className="dashboard-content-right">
                <h2 className=" project-list-header ">PROJECTS</h2>
                <aside className="dashboard-content-right-wrapper">
                    <div className="top-wrapper">
                        <Link
                            to={'/dashboard/create-project'}
                            className="add-project-btn" type="button">
                            <FontAwesomeIcon icon={faAdd} size="1.5x" className="pr-2!" />
                            Add new Project
                        </Link>
                    </div>
                    <div className="project-table-wrapper">
                        <table className="project-table">
                            <tbody>
                                <tr>
                                    <th className="project-table-head">Project Title</th>
                                    <th className="project-table-head">Project Description</th>
                                    <th className="project-table-head">Project Author</th>  
                                    <th className="project-table-head">Date created</th>
                                </tr>
                            </tbody>
                            {projects.length > 0 ? projects.map((project) => {
                                return <TableData
                                    key={project.id}
                                    project={project}
                                    previewProjecthandler={()=>previewProjectHandler(project)}
                                    />
                            }) : <></>}
                        </table>
                    </div>
                    <div className="bottom-wrapper">
                        <button onClick={() => {
                            handleLogout({ isLoading, setLoading, navigate })
                        }} className="cancel-project-btn text-base! sm:text-sm md:text-md!" type="button">Logout</button>
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default Dashboard;
