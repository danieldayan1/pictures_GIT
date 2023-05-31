
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
                    <NavLink style={{ textDecoration: 'none'}} to={`/pictures/details/`} state = {props.picture}>
                        <img src={props.picture.url} className="card-img-top" alt="..." />
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
