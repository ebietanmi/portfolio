import { faArrowLeft, faBackspace } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";

export default function About() {
    const navigate = useNavigate();
    return (
        <section className="about">
            <FontAwesomeIcon icon={faArrowLeft} onClick={()=>navigate('/')}/>
            <h1>About Me</h1>
            <div className="wrapper">
                <p>
                    Hi, I'm <strong>Ebietanmi Taiwo</strong>. <strong>I am a Graduate of computer science, a Software Engineer, Tech enthusiast and a lover of inovation </strong>
                    based in <strong>Lokoja, Nigeria</strong>, I am passionate about building clean, user-friendly digital experiences for the screens.
                </p>
            </div>

            <p>
                I specialize in <strong>HTML/CSS, Java, Javascript, React, Node.js, Python, Kubernetes, Git, AWS etc..</strong> and enjoy I turning complex problems into simple,
                beautiful solutions. With <strong>6 years</strong> of experience, I've worked on projects ranging from
                <strong> portfolio sites, e-commerce sites and even stand-alone applications.</strong>
            </p>

            <div className="wrapper">
                <h2>My Approach:</h2>
                <p>
                    I believe great products are built at the intersection of design, technology, and empathy.
                    I focus on writing maintainable code, collaborating with teams, and shipping things that people actually love to use.
                </p>
            </div>

            <div className="wrapper">
                <h2>Outside of Work:</h2>
                <p>
                    When I'm not coding, you can find me <strong>reading, exercising,  seeing fooball and learning new tech skills</strong>.
                    I'm always curious and always building.
                </p>
            </div>
            <a href="/contact" className="work-together-btn">Let's Work Together</a>
        </section>
    )
}