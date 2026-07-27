import logo from '../../../assets/logo.jpg'
import { useState } from 'react';
import { Link, redirect, useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons/faPerson';
import { faPersonCircleCheck, faUser } from '@fortawesome/free-solid-svg-icons';
import App from './../../App';

function Header() {
    // const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);

    function toggle() {
        setToggle(isToggle => !isToggle);
    }
    function isAuth() {
        const token = localStorage.getItem("token");
        if (token !== null || token !== '') {
            return '/dashboard';
        } else {
            return '/login'
        }
    }
    return (
        <nav className="navbar" style={{marginBottom:`${isOpen?'7%':''}`}}>
            <img className='nav-logo' src={logo} alt="logo" srcSet="" />
            <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                <li ><Link className='_link' to={'/about'}>About</Link></li>
                <li><Link className='_link' to={'/blogs'}>Blog</Link></li>
                <li><Link className='_link' to={'/contact'}>Contact</Link></li>
                <li>
                    <Link to={'login'} className=' _link'>
                        <FontAwesomeIcon icon={faUser} color='white' size='1x' />
                    </Link>
                </li>
            </ul>
            <button onClick={() => setOpen(!isOpen)} className="nav-toggle" aria-label="toggle menu">
                {isOpen ? '*' : "☰"}
            </button>
        </nav>
    )
}

export default Header;