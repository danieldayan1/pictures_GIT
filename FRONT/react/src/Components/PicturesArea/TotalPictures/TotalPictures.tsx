import { useEffect, useState } from "react";
import { picturesStore } from "../../../redux/PicturesState";
import "./TotalPictures.css";
import React from "react";

function TotalPictures(): JSX.Element {

    const [count, setCount] = useState<number>(0);
    let flag = picturesStore.getState().updateFlag

    useEffect(() => {
        //Take products length when our site is up
        setCount(picturesStore.getState().pictures.length);
        

        const unsubscribe = picturesStore.subscribe(() => { //listen to any changes, and invoke the callback when something changed
            setCount(picturesStore.getState().pictures.length)
        })

        return () => {
            unsubscribe();
        }

    }, [flag])


    return (
        <div className="TotalPictures">
            <span>Total Pictures: {count}</span>
        </div>
    );
}

export default TotalPictures;
