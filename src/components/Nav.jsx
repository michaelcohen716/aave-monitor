import React from "react";
import "./Nav.css"

function Navbar() {
  return (
    <nav className="navbar fixed-top navbar-light bg-primary navbar-custom shadow-sm bg-white rounded">
      <div className="d-flex px-3 justify-content-between w-100">
        <div className="navbar-brand my-auto d-flex">
          {/* <img src={logo} className="img-fluid nav-icon my-auto" alt="logo" /> */}
          <div className="ml-3 nav-text">Aave Monitor</div>
        </div>
        <div className="my-auto d-flex pr-3">
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
