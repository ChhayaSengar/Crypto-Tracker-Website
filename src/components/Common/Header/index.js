import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import MobileDrawer from "./Draw";
import Button from "../Button"


const Header = () => {

  return (
    <div className='navbar'>
    
<h1 className='logo'>CryptoTracker <span style={{color: "var(--blue)"}}>.</span></h1>
      
      <div className='links-flex'>
   
        <Link to="/"><p className='link'>Home</p></Link>
        <Link to="/compare"><p className='link'>Compare</p></Link>
        <Link to="/watchlist"><p className='link'>Watchlist</p></Link>
        <Link to="/dashboard">
         <Button  text ={"Dashboard"}
          onClick={() => console.log("hello")}
        />
          </Link>
      
      </div>

    
        <MobileDrawer />
      
    </div>
  )
}

export default Header;
