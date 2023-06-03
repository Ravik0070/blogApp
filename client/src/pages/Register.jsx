import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("auth/register", inputs)
      if (res.data.success == false) { setError(res.data.response) } else { navigate("/login") };
    } catch (error) {
      setError("Something went wrong.")
    }
  }
  return (
    <div className='auth'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" name="username" id="username" placeholder='username' onChange={handleChange} />
        <input required type="email" name="email" id="email" placeholder='email' onChange={handleChange} />
        <input required type="password" name="password" id="password" placeholder='password' onChange={handleChange} />
        <button> Register</button>
        {error && <p>{error}</p>}
        <span>Have an account?<Link to="/login"> Login</Link></span>
      </form>

    </div>
  )
}

export default Register
