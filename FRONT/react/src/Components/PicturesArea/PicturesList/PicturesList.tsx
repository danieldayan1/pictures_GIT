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
    const [myCategory , setCategory] = useState<string>('ALL');
    const [currPage , setCurrPage] = useState<number>(1)

    useEffect(() => {
        
        picturesService.fetchAllPictures()
            .then(picturesFromBackend => {
                setPictures(picturesFromBackend);
            })
            .catch(err => alert(err.message))

        let memCategory = picturesStore.getState().category
        if(memCategory)
            setCategory(memCategory)

        let memPage = picturesStore.getState().page
        if(memPage)
            setCurrPage(memPage)

        return(()=>{
            picturesStore.getState().category = localStorage.getItem("category");
            picturesStore.getState().page = parseInt(localStorage.getItem("page"))

        })

    }, [])


    const filterByCategory = (cat:string,page:number)=>{
        if(cat==' ')
            cat='ALL';
        if(cat !== myCategory)
            page=1;
        picturesService.fetchAllPictures(page,cat)
        .then(picturesFromBackEnd=>{
            setPictures(picturesFromBackEnd);
            setCategory(cat);
            setCurrPage(page);
            localStorage.setItem("category",cat);
            localStorage.setItem("page",page.toString());
        })
        .catch(err => alert(err.message))
    }

    return (
        <div className="PicturesList">

            {pictures.length === 0 && <Loading />}
           <span><b>Category:</b></span> <select  onChange={(option)=>filterByCategory(option.target.value,currPage)} >
                        {myCategory=='ALL' ? <option value={'ALL'} selected>ALL</option> : <option value={'ALL'}>ALL</option>}
                        {myCategory=='sports' ?<option value={'sports'} selected>sports</option>:<option value={'sports'} >sports</option>}
                        {myCategory=='work' ?<option value={'work'} selected>work</option>:<option value={'work'} >work</option>}
                        {myCategory=='animals' ?<option value={'animals'} selected>animals</option>:<option value={'animals'} >animals</option>}
                    </select>
            <br /> <br /> 
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {pictures.map(p => <PictureCard key={p.url} picture={p} />)}
            </div>
    
            <div  style={{display:"inline-flex",position:"fixed",bottom:100}}>
                <div style={{width:"60px",fontWeight:"bold",border:"2px solid black",margin:"2px"}}>
                    {currPage}/{pictures.length} 
                </div>
                <div style={{width:"60px"}}>
                <button title="page 1"  onClick={()=>{filterByCategory(myCategory,1)}}>{'1'}</button>
                </div>
                <div style={{width:"60px"}}>
                    {currPage===1?<button title="prev" disabled={true}>{'<--'}</button>:<button title="prev" onClick={()=>{filterByCategory(myCategory,currPage-1)}}>{'<--'}</button>} 
                </div>
                <div style={{width:"60px"}}>
                    {currPage===pictures.length?<button title="next" disabled={true}>{'-->'}</button>:<button title="next" onClick={()=>{filterByCategory(myCategory,currPage+1)}}>{'-->'}</button>}
                </div>
            </div>
            
        </div>
    );
}

export default PicturesList;
