import { NavLink } from "react-router-dom";
import React from "react";
import TotalProducts from "../../PicturesArea/TotalPictures/TotalPictures";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            <NavLink to="/home">Home</NavLink><br />
            <NavLink to="/products">Products</NavLink><br />
            <NavLink to="/shop">Shop</NavLink>

            
            <TotalProducts />
        </div>
    );
}

export default Menu;
