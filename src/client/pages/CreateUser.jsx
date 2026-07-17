import { useEffect, useState } from "react";
import createUserAPI from "../controllers/APIs";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ 'username': '', "password": '', "role": '' })
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e) {
        try {
            await createUserAPI(form)
            .then(res=>res.json())
            .then(response=>{
                response.ok ? alert(response.message):
                alert(response.message);
            })
            .then(navigate('/dashboard'))
             setForm({username:'', password:'', role:''})
        } catch (error) { 
            setForm({username:'', password:'', role:''});
            alert(error);
            navigate('/dashboard');
        }
    }
    // useEffect(()=>{
        
    //     console.log(response)
    // },[])
    return (
        <section className="create-user-screen">
            <div className="form-wrapper">
                <h1 className="create-user-header">Create User</h1>
                <form onSubmit={(e)=>{
                    e.preventDefault()
                    handleSubmit(e)
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
