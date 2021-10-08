import React from "react";
import Navbar from "./Navbar";
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home'
import About from './About'


const App = () => {
    return (
        <div>
            <BrowserRouter>
            Home Component
            <Navbar/>
            <Route path ='/home' component = {Home}/>
            <Route path ='/about' component = {About}/>
            </BrowserRouter>
        </div>
    )
}

export default App;