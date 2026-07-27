import { useEffect, useState } from "react";
import createUserAPI from "../controllers/APIs";
import { useNavigate } from "react-router-dom";
import { handleCreateUser } from "../controllers/client_controllers";
import { ScaleLoader } from "react-spinners";

export default function CreateUser() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false)
    const [form, setForm] = useState({ 'username': '', "password": '', "role": '' })
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    return (
        <section className="create-user-screen">
            <ScaleLoader height={10} id="loader" loading={isLoading} />
            <div className="form-wrapper">
                <h1 className="create-user-header">Create User</h1>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handleCreateUser(form, isLoading, setLoading, navigate)
                }} className="_user_form" action="submit" method="post">
                    <label className="_input_label" htmlFor="username">Username</label>
                    <input required className="_username" type="text" name="username" id=""
                        onChange={handleChange}
                        value={form.username}
                    />
                    <br />
                    <label className="_input_label" htmlFor="password">Password</label>
                    <input required className="_password" type="password" name="password" id=""
                        onChange={handleChange}
                        value={form.password}
                    />
                    <br />
                    <label className="_input_label" htmlFor="role">Role</label>
                    <select required className="_role" type="text" name="role" id=""
                        onChange={handleChange}
                        value={form.role}
                    >
                        <option className="_role_option" value="">Select Role</option>
                        <option className="_role_option" value="admin">Admin</option>
                        <option className="_role_option" value="user">User</option>
                    </select>
                    <button className="_submit_btn" type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
}


