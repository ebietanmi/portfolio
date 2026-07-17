import { useState } from "react";
import { createRecievedMailAPI } from "../controllers/APIs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBackward } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";

export default function Contact() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e){
        e.preventDefault();
        setStatus("loading");

        // Fake submit - replace with your API call
        const response = await createRecievedMailAPI(form);
        console.log(response)
        if(response.ok){
            setStatus("success");
            alert("Message Sent")
            setForm({ name: "", email: "", message: "" });
        }
        else{
            alert("Message Failed");
            console.log(response)
        }
        // setTimeout(() => {
        //     setStatus("success");
        //     setForm({ name: "", email: "", message: "" });
        //     setTimeout(() => setStatus("idle"), 3000);
        // }, 1500);
    };

    return (
        <section className="contact-section">       
            <div className="contact-container">
                <div className="contact-info">   
                    <FontAwesomeIcon style={{marginBottom:'1rem'}} icon={faArrowLeft} onClick={()=>navigate('/')}/>              
                    <p className="contact-tag">Get In Touch</p>
                    <h2>Let's build something together</h2>
                    <p className="contact-desc">
                        I'm currently open to freelance work and full-time opportunities.
                        If you have a project that needs clean code and good design, let’s talk.
                    </p>

                    <div className="contact-details"> 
                        <div className="detail-item">
                            <span className="icon">📧</span>
                            <div>
                                <p className="detail-label">Email</p>
                                <a href="mailto:you@email.com">taeb4all@gmail.com</a>
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
                        <a href="https://github.com/ebietanmi" aria-label="GitHub">GitHub</a>
                        <a href="https://Linkedin.com/in/ebietanmi" aria-label="LinkedIn">LinkedIn</a>
                        <a href="https://x.com/ebietanmi" aria-label="Twitter">Twitter</a>
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

                    <button type="submit" className="submit-btn" disabled={status === "loading"}>
                        {status === "loading" ? "Sending..." : "Send Message"}
                    </button>

                    {status === "success" && <p className="success-msg">Message sent! I’ll get back to you soon.</p>}
                    {status === "error" && <p className="error-msg">Something went wrong. Try again.</p>}
                </form>
            </div>
        </section>
    );
}