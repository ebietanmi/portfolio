import { useCallback, useState, useEffect, useRef } from "react";
import { handleSendMail } from "../controllers/client_controllers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward, faFaceAngry } from "@fortawesome/free-solid-svg-icons";
import { data, useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import { checkMailNetworkStatusAPI } from "../controllers/APIs";
import { ScaleLoader } from "react-spinners";

export default function Contact() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState("idle");
    const [isLoading, setLoading] = useState(false); 
    const [networkStatus, setnetworkStatus] = useState('checking');
    const prevStatusRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    async function handleSubmit(e) {
        e.preventDefault();
        await handleSendMail(form, isLoading, setLoading);
    };
    async function getNetworkStatus() {
        try {
            const response = await checkMailNetworkStatusAPI().then(res => res.json());
            setnetworkStatus(response.message);
            if (response.message !== prevStatusRef.current) {
                prevStatusRef.current = response.message;
                setnetworkStatus(prevStatusRef.current);
            }
        } catch (error) {

        } finally {
            timeoutRef.current = setTimeout(getNetworkStatus, 1000 * 60 * 1);
        }
    }
    useEffect(() => {
        getNetworkStatus();
        return()=>clearTimeout(timeoutRef.current);
    }, []);

    return (
        <section className="contact-section">
            <ScaleLoader loading={isLoading} height={8} id="loader"/>
            <p className="contact-network-status">{`${networkStatus}...`}</p>
            <div className="contact-container">
                <div className="contact-info">
                    <FontAwesomeIcon style={{ marginBottom: '1rem' }} icon={faArrowLeft} onClick={() => navigate('/')} />
                    <p className="contact-tag">Get In Touch</p>
                    <h2>Let's build something together</h2>
                    <p className="contact-desc">
                        I'm currently open to freelance work and full-time opportunities.
                        If you have a project that needs clean code and good design, let's talk.
                    </p>

                    <div className="contact-details">
                        <div className="detail-item">
                            <span className="icon">📧</span>
                            <div>
                                <p className="detail-label">Email</p>
                                <a href="taeb4all@gmail.com">taeb4all@gmail.com</a>
                            </div>
                        </div>
                        <div className="detail-item">
                            <span className="icon">📍</span>
                            <div>
                                <p className="detail-label">Location</p>
                                <p>Lokoja, Nigeria</p>
                            </div>
                        </div>
                    </div>

                    <div className="socials">
                        <a href="https://github.com/ebietanmi" aria-label="GitHub">GitHub
                            <FontAwesomeIcon/>
                         </a>
                        <a href="https://Linkedin.com/in/ebietanmi" aria-label="LinkedIn">LinkedIn</a>
                        <a href="https://x.com/ebietanmi" aria-label="Twitter">Twitter</a>
                        <a href="tel:+2348136477300" aria-label="Twitter">Call us: +2348136477300</a>
                    </div>
                </div>
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                    </div>
                     <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="enter email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Subject</label>
                        <input
                            type="text"
                            className="form-input"
                            id="subject"
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project..."
                            rows="5"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send Message"}
                    </button>
                    {status === "success" && <p className="success-msg">Message sent! I’ll get back to you soon.</p>}
                    {status === "error" && <p className="error-msg">Something went wrong. Try again.</p>}
                </form>
            </div>
        </section>
    );
}