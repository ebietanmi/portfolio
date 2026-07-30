import Header from '../componets/Header.jsx';
import logo from '../../../assets/logo.jpg'
import ProjectCard from '../componets/ProjectCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getProjectsAPI } from '../controllers/APIs.js';
import { useEffect, useState, useCallback } from 'react';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Link, useLoaderData } from 'react-router-dom';
import { resumeDownloadHandler } from '../controllers/client_controllers.js'
import { ScaleLoader } from 'react-spinners';

function Homepage() {
    const [isLoading, setIsloading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [isProjectAvailable, setProjectAvailable] = useState(false);

    const fetchProjects = useCallback(() => {
     setTimeout(()=>{
        console.log('time out')
            setProjectAvailable(isProjectAvailable=>false);
        }, 10000)

        getProjectsAPI()
            .then(res => res.json())
            .then(setProjects)
            .then(setProjectAvailable(isProjectAvailable => true));
    }, []); // empty deps = function never changes

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]); // now safe to put in deps

    return (
        <section className="home-container">
            <Header />
            <div className="home-content-wrapper">
                 <div className="home-top-content"> 
                    <div className='home-top-content-left'>
                        <div className="avatar"></div>
                        <h1 id='dev-name'>Ebietanmi Taiwo</h1>
                        <p id='dev-pos'>Software Engineer</p>
                        <div className="skills">
                            <p>Tech Stacks: 
                                <br />
                                <span>Html, Css, Javacript, React, Node, Pyhton. </span>
                            </p>
                        </div>
                    </div>
                    <div className='home-top-content-right'>
                        <h1 id='dev-name'>EBIETANMI TAIWO</h1>
                        <h1 id='dev-pos'>Sofware Engineer</h1>
                        <p className='motto'>...Building Software solutions on code at a time</p>
                        <div className="home-top-content-right-action">
                            <button>View Details</button>
                            <button onClick={()=>resumeDownloadHandler()}>Download CV</button>
                        </div>
                    </div>
                </div>
                <div className="home-bottom-content">
                        {projects.length > 0 ?
                            projects.map((project) => {
                                return (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                    />
                                )
                            },) : isProjectAvailable ? <ScaleLoader loading={isProjectAvailable} color='white'/> :<div>No avalable project...</div>
                        } 
                </div>
            </div> 
        </section>
    );
}

export default Homepage;