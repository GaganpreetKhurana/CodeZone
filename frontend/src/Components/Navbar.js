import React from "react";
import {Link,Navlink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div>
            Navbar Component
            <button><Link to ='/'>Home</Link></button>
            <button><Link to='/about'>About</Link></button>
        </div>
    )
}

export default Navbar;