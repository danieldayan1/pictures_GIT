import { useNavigate, useParams } from "react-router-dom";
import "./PictureDeatils.css";
import config from "../../../Utils/Config";
import picturesService from "../../../Services/PicturesService";
import { useEffect , useState } from "react";
import PictureModel from "../../../Models/PictureModel";
import { NavLink } from "react-router-dom";
import * as React from 'react'
import { picturesStore } from "../../../redux/PicturesState";



function PictureDeatils(): JSX.Element{

    const params = useParams()
    const navigate = useNavigate()
    const [picture , setPicture] = useState<PictureModel>()
    const [id , useId] = useState<number>()
    const [views,useViews] = useState<string>();
    const [category,useCategory] = useState<number>();
    let flag = picturesStore.getState().updateFlag
   
    useEffect(()=>{ 

        const prodId = params.prodId

        picturesService.getOnePictureById(prodId)
            .then(p => {
                setPicture(p),
                localStorage.setItem("views",p.views.toString()),
                localStorage.setItem("category",p.category.toString()),
                localStorage.setItem("id",p.id.toString())
            })
            .catch(err => {
                useViews(localStorage.getItem("views")),
                useCategory(parseInt(localStorage.getItem("category"))),
                useId(parseInt(localStorage.getItem("id")))
            })
        
       return(()=>{
        if(flag){
            localStorage.removeItem("views");
            localStorage.removeItem("category");
            localStorage.removeItem("id");
        }
       })

       } , [flag])
  

    return (
        <div className="ProductDeatils Box">
            { picture && <div >
			<div className="card">
                { picture.id?<img src={config.picturesUrl + picture.id} className="card-img-top" alt="..."/>:<img src={config.picturesUrl + picture.id} className="card-img-top" alt="..."/>}
                    <div className="card-body">
                        <p className="card-text">views: {picture.views?picture.views:views}</p>
                        <p className="card-text">category: {picture.category?picture.category:category}</p>
                    </div>
                    <NavLink to = '/products' ><button className="btn btn-warning">BACK</button></NavLink>
                </div>
            </div>} 
        </div>
    )
}
export default PictureDeatils;
