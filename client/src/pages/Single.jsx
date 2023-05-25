import React from 'react'
import { Link } from 'react-router-dom'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import Menu from '../components/Menu'
const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div className="user">
          <img src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to="/write?edit=2"><img src={Edit} alt="" /></Link>

            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro dolor facere tenetur debitis tempora distinctio animi itaque quos inventore dolores.</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto maxime repellat accusamus quos autem perspiciatis, ea suscipit quod, ratione aperiam aliquid? Molestias eveniet voluptatibus doloremque ea. At iste ex quis non qui quisquam sed. Numquam repudiandae quia, voluptatibus minus repellendus magnam ipsam voluptas, iste facilis omnis vel odit quasi corrupti.
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum sit aliquam qui? Repudiandae, aut eligendi culpa distinctio aliquid nihil sapiente facere eum et. Facere, consequuntur consequatur. Sed fuga odio molestiae.
        </p>
      </div>
      <div className="menu"><Menu/></div>
    </div>
  )
}

export default Single
