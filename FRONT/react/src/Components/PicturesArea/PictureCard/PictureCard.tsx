
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PictureModel from "../../../Models/PictureModel";
import config from "../../../Utils/Config";
import "./PictureCard.css";
import * as React from 'react'

interface PictureCardProps {
    picture: PictureModel;
}

function ProductCard(props: PictureCardProps): JSX.Element {

    return (
        <div className="PictureCard">
            <div className="col">
                <div className="card" >
                    <NavLink  to={`/pictures/details/` + "" +props.picture.id}  style={{ textDecoration: 'none' }} >
                    <img src={config.picturesUrl + props.picture.id} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">category:{props.picture.category}</h5>
                        <p className="card-text">views: {props.picture.views}</p>
                    </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
