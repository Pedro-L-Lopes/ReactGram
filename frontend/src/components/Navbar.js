import './Navbar.css'

// Componets 
import { NavLink, Link } from 'react-router-dom'

// Hooks
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// Redux
import {logout, reset} from '../slices/authSlice'

// Icons
import { BsSearch, BsFillPersonFill, BsFillCameraFill } from 'react-icons/bs'
import { FaReact } from 'react-icons/fa'
import { AiOutlineHome, AiOutlineCamera, AiOutlineUser } from 'react-icons/ai'

const Navbar = () => {
  const {auth} = useAuth() 
  const {user} = useSelector((state) => state.auth) 

  const navigate = useNavigate()

  const dispacth = useDispatch()

  const handleLogout = () => {
    dispacth(logout())
    dispacth(reset())

    navigate("/logout")
  }

  return (
    <div id='cont'>
        <nav id="nav">
            <Link to="/"><h2>ReactGram</h2></Link>
            <form id='search-form'>
                <BsSearch />
                <input type="text" />
            </form>
            <ul id="nav-links">
                {auth ? (
                    <>
                    <li>
                        <NavLink to="/">
                            <AiOutlineHome />
                        </NavLink>
                    </li>
                    {user && (
                        <li>
                            <NavLink to={`/users/${user._id}`}>
                                <AiOutlineCamera />
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink to={`/profile`}>
                            <AiOutlineUser />
                        </NavLink>
                    </li>
                    <li>
                        <span onClick={handleLogout}>Sair</span>
                    </li>
                    </>
                ) : (
                    <>
                    <li>
                        <NavLink to="/login">Entrar</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register">Cadastrar</NavLink>
                    </li>
                    </>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default Navbar