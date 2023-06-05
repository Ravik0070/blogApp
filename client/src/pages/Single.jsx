import { Link, useLocation, useNavigate } from 'react-router-dom'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/authContext"
import moment from "moment"
import axios from 'axios'
const Single = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        console.log(res)
        setPost(res.data.response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [postId])

  const handleDelete = async() =>{
    try {
      await axios.delete(`/posts/${postId}`)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          {post.userImage && <img src={post.userImage} alt="" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username &&
            <div className="edit">
              <Link to="/write?edit=2"><img src={Edit} alt="" /></Link>

              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          } 
        </div>
        <h1>{post?.title}</h1>
        <p>{post?.description}
        </p>
      </div>
      <div className="menu"><Menu /></div>
    </div>
  )
}

export default Single
