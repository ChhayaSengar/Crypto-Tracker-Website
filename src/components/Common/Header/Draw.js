import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <div  className="drawer-wrapper">

      <IconButton onClick={() => setOpen(true)}>
        <MenuRoundedIcon className="link" />
      </IconButton>
     
      <Drawer
        // if i say anchor value = top then drawer open  from top
        // anchor is place where my drawer open
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
      >

        <div className='drawer-div'>
          <Link to="/">
          <p className='link'>Home</p>
          </Link>
          <Link to="/compare">
          <p className='link'>Compare</p>
          </Link>
          <Link to="/watchlist">
          <p className='link'>Watchlist</p>
          </Link>
          <Link to="/dashboard">
          <p className='link'>Dashboard</p>
          </Link>
        </div>


      </Drawer>


    </div>
  );
}

