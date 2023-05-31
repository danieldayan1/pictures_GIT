import "./Home.css";
import * as React from 'react'
import PicturesList from "../../PicturesArea/PicturesList/PicturesList";

function Home(): JSX.Element {

    return (
        <div className="Home">
            <PicturesList />
        </div>
    );
}

export default Home;
