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
        <section className="login-page">
            <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target);
                const username = formData.get('username');
                const password = formData.get('password');
                handleLogin({ username, password }, navigate, isLoading, setLoading);
            }
            } >
                {/* <Link className='login-page-btn' to={'/'}><FontAwesomeIcon icon={faArrowLeft} size='2x' /></Link> */}
                <div className="login-form-input-wrapper">
                    <h2 className="login-page-header">LOGIN</h2>
                    <input name="username" required id="login-usernameID" className="login-input" type="text" placeholder="Username" />
                    <ScaleLoader height={10} width={3} loading={isLoading} />
                    <input name="password" required id="login-passwordID" className="login-input" type="password" placeholder="Password" />
                    <div className="form-action-wrapper">
                        <input className="login-action-btn action-cancel-btn" type="button" value="Cancel" />
                        <input className="login-action-btn  action-submit-btn" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </section>

    )
}