import React, { useContext } from 'react'
import logo from "../img/logo.png"
import { Link } from 'react-router-dom'
import {AuthContext} from "../context/authContext"
const Navbar = () => {
  const {currentUser,logout} = useContext(AuthContext)
  
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
          <img src={logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art"><h6>ART</h6></Link>
          <Link className='link' to="/?cat=cinema"><h6>CINEMA</h6></Link>
          <Link className='link' to="/?cat=design"><h6>DESIGN</h6></Link>
          <Link className='link' to="/?cat=food"><h6>FOOD</h6></Link>
          <span>{currentUser?.username}</span>
         {currentUser != null? <span onClick={logout}>Logout</span>:<Link className='link' to="/login">login</Link>}
          <span className="write">
            <Link to="/write" className='link'>Write</Link>
          </span>
        </div>
      </div>

    </div>
  )
}

export default Navbar