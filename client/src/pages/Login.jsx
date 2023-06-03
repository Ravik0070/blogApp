import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { AuthContext } from '../context/authContext'
const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const {login} = useContext(AuthContext);
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let res = await login(inputs);
      console.log(res)
      if (res.data.success == false) { setError(res.data.response) }
      else { navigate("/") }
    } catch (error) {
      setError("Something went wrong.")
    }
  }
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" id="username" placeholder='username' onChange={handleChange}/>
        <input type="password" name="password" id="password" placeholder='password' onChange={handleChange}/>
        <button > Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account?<Link to="/register"> Register</Link></span>
      </form>

    </div>
  )
}

export default Login
