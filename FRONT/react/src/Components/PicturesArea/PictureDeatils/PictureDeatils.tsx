import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./PictureDeatils.css";
import config from "../../../Utils/Config";
import picturesService from "../../../Services/PicturesService";
import { useEffect , useState } from "react";
import PictureModel from "../../../Models/PictureModel";
import { NavLink } from "react-router-dom";
import * as React from 'react'
import { picturesStore } from "../../../redux/PicturesState";


function PictureDeatils(): JSX.Element{

    const parameters = useParams()
    const navigate = useNavigate()

    const [picture,setPicture] = useState<PictureModel>()

    const [url , useUrl] = useState<string>()
    const [views,useViews] = useState<number>();
    const [downloads,useDownloads] = useState<number>();
    const [category,useCategory] = useState<string>();
    const [comments,useComments] = useState<string>();
    const [likes,useLikes] = useState<number>();

    let flag = picturesStore.getState().updateFlag;

    const pic = useLocation().state
    
   
    useEffect(()=>{ 


        if(pic){
            setPicture(pic),
            localStorage.setItem("views",pic.views.toString()),
            localStorage.setItem("category",pic.category),
            localStorage.setItem("downloads",pic.downloads.toString()),
            localStorage.setItem("likes",pic.likes.toString()),
            localStorage.setItem("url",pic.url),
            localStorage.setItem("comments",pic.comments)

        }
        else{
            useViews(parseInt(localStorage.getItem("views"))),
            useCategory(localStorage.getItem("category")),
            useDownloads(parseInt(localStorage.getItem("downloads"))),
            useLikes(parseInt(localStorage.getItem("likes"))),
            useUrl(localStorage.getItem("url")),
            useComments(localStorage.getItem("comments"))
        }
        
       return(()=>{
        if(flag){
            localStorage.removeItem("views"),
            localStorage.removeItem("category"),
            localStorage.removeItem("downloads"),
            localStorage.removeItem("likes"),
            localStorage.removeItem("url"),
            localStorage.removeItem("comments")
        }
       })

       } , [flag])
  

    return (
        <div className="PicturesDeatils Box">
            { picture && <div >
			<div className="card">
                { picture.url?<img src={picture.url} className="card-img-top" alt="..."/>:<img src={url} className="card-img-top" alt="..."/>}
                    <div className="card-body">
                        <p className="card-text"><b>views:</b> {picture.views?picture.views:views}</p>
                        <p className="card-text"><b>category:</b> {picture.category?picture.category:category}</p>
                        <p className="card-text"><b>downloads:</b> {picture.downloads?picture.downloads:downloads}</p>
                        <p className="card-text"><b>likes:</b> {picture.likes?picture.likes:likes}</p>
                        <p className="card-text"><b>comments:</b> {picture.comments?picture.comments:comments}</p>
                    </div>
                    <NavLink to = '/home' ><button className="btn btn-warning">BACK</button></NavLink>
                </div>
            </div>} 
        </div>
    )
}
export default PictureDeatils;