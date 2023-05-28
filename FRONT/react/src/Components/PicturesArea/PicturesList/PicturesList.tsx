import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Pictureodel from "../../../Models/PictureModel";
import picturesService from "../../../Services/PicturesService";
import Loading from "../../SharedArea/Loading/Loading";
import PictureCard from "../PictureCard/PictureCard";
import "./PicturesList.css";
import * as React from 'react'
import { picturesStore } from "../../../redux/PicturesState";


function PicturesList(): JSX.Element {
    const [pictures, setPictures] = useState<Pictureodel[]>([]);
    const [myCategory , setCategory] = useState<number>(0);
    let flag = picturesStore.getState().updateFlag;
    let category:number=0;

    useEffect(() => {
        picturesService.fetchAllPictures()
            .then(picturesFromBackend => {setPictures(picturesFromBackend);
                category = parseInt(localStorage.getItem("category")||'0');
                if(category>0){
                    filterByCategory(category);
                }})
            .catch(err => alert(err.message))

        return(()=>{
            if(flag){
                localStorage.removeItem("category");
            }
        })

    }, [flag])


    const filterByCategory = (category:number)=>{
        picturesService.getOnePictureByCategory(category)
        .then(picturesFromBackend => {
            setPictures(picturesFromBackend);
            setCategory(category);
            localStorage.setItem("category",category.toString());})
        .catch(err => alert(err.message))
    }

    return (
        <div className="PicturesList">

            {pictures.length === 0 && <Loading />}
           <span><b>Category:</b></span> <select  onChange={(option)=>filterByCategory(+option.target.value)} >
                        {myCategory==0 ? <option value={0} selected>ALL</option> : <option value={0}>ALL</option>}
                        {myCategory==1 ?<option value={1} selected>vegetables & fruits</option>:<option value={1} >vegetables & fruits</option>}
                        {myCategory==2 ?<option value={2} selected>meat</option>:<option value={2} >meat</option>}
                        {myCategory==3 ?<option value={3} selected>cakes</option>:<option value={3} >cakes</option>}
                        {myCategory==4 ?<option value={4} selected>drinks</option>:<option value={4} >drinks</option>}
                    </select>
            <br /> <br /> 
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {pictures.map(p => <PictureCard key={p.id} picture={p} />)}
            </div>
        </div>
    );
}

export default PicturesList;
