
import { useState } from 'react';
import { handleChangePassword } from '../controllers/client_controllers.js'
import { resetPasswordAPI } from '../controllers/APIs.js';


export function ResetPassword() {
    const[isLoading, setLoading] = useState(false);
    const [form, setForm] = useState({ oldPassword: '', newPassword: '' });
    const [validationMessage, setValidationMessage] = useState('');
    const [message, setMessage] = useState('');

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await resetPasswordAPI(form, isLoading, setLoading);
            if (res.ok) {
                setMessage('Password Updated')
                alert('Password Updated')
                setForm({ oldPassword: '', newPassword: '' })
            }
            else if (res.status === 400) {
                setMessage(`All field required`),
                alert(`All field required`), setForm({ oldPassword: '', newPassword: '' })
            }
            else if (res.status === 401) {
                setMessage(`Invalid Token`),
                alert(`Invalid Token`), setForm({ oldPassword: '', newPassword: '' })
            }
            else if (res.status === 404) {
                setMessage(`Old Password Incorrect`),
                alert(`Old Password Incorrect`), setForm({ oldPassword: '', newPassword: '' })
            }
        } catch (error) {
            setMessage('Network eror')
        }
    }
    return (
        <section className="reset-password-wrapper">
            <h4 className="reset-password-header">Reset Password</h4>
            <form auto_complete="false" onSubmit={handleSubmit} action="submit" method="post">
            {validationMessage !== '' || null ? <div className='validation-message' >{validationMessage}
                <span onClick={() => {
                    setValidationMessage('');
                }} style={{ color: 'red', marginLeft: '10px' }}>x</span>
            </div> : <></>}
            <input autoComplete='off'
                required
                className="reset-password-input"
                type="password"
                name="oldPassword"
                id="old-passwordID" placeholder="Enter Password"
                value={form.oldPassword}
                onChange={handleChange}
            />
            <input autoComplete='false'
                required
                className="reset-password-input"
                type="password"
                name="newPassword"
                id="new-passwordID" placeholder="Enter new Password"
                value={form.newPassword}
                onChange={handleChange}
            />
            <button className="reset-password-btn" type="submit" value="Reset">Reset</button>
        </form>
        </section>
        
    )
}



