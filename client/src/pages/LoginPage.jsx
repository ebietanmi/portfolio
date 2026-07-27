import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { ScaleLoader } from "react-spinners"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { handleLogin, handleCreateProject } from '../controllers/client_controllers.js'


export default function LoginPage() {
    const [data, setData] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="login-screen">
            <div className="login-screen-content-wrapper">
                <ScaleLoader height={10} id="loader" loading={false} />
                <div className="login-form-wrapper">
                    <h2 className="login-page-header">LOGIN</h2>
                    <form className="login-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.target);
                            const username = formData.get('username');
                            const password = formData.get('password');
                            handleLogin({ username, password }, isLoading, setLoading, navigate);
                        }
                        } >
                        <div className="login-form-group">
                            <label htmlFor="username">Username</label>
                            <input name="username" required
                             id="login-usernameID" className="login-input" type="text" 
                             placeholder="Username" />
                        </div>
                        <div className="login-form-group">
                            <label htmlFor="password">Password</label>
                            <input name="password" required
                             id="login-passwordID" className="login-input" type="password"
                              placeholder="Password" />
                        </div>
                        <div className="form-action-wrapper">
                            <button className="login-action-btn action-cancel-btn" type="button">Cancel</button>
                            <button className="login-action-btn  action-submit-btn" type="submit" value="Submit" >Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </section>

    )
}