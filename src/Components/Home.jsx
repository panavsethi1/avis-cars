import React from 'react'
import 'antd/dist/antd.css';
import SearchForm from './SearchForm';

function Home() {


    //Background Image
    const styleBgParallax = {
        backgroundImage: "url(img/196_365_2048x1365.jpg)",
    };

    //Rendering
    return (
        <div className="top-area show-onload">

            <div className="bg-holder">

                <div className="bg-mask"></div>

                <div className="bg-parallax" style={styleBgParallax}></div>

                <div className="bg-content">

                    <div className="container">

                        <div>
                            <h1 className="main-header" style={{ color: "white", paddingTop: "3rem", paddingBottom: "2rem" }}>Find Your Perfect Car</h1>
                        </div>

                        <div className="city-searches">

                            <h2 className="search-form-header" style={{ textAlign: "left", paddingLeft: "0rem", paddingTop: "1rem" }}>Search For Cheap Rental Cars</h2>

                            <SearchForm button="Search for Rental Cars"/>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Home

