import React from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import SearchForm from "./SearchForm";
import HotelSearchForm from "./HotelSearchForm";

const { TabPane } = Tabs;

function Home() {
  //Background Image
  const styleBgParallax = {
    backgroundImage: "url(img/196_365_2048x1365.jpg)",
  };

  function handleTabChange(key) {
    console.log(key);
  }

  //Rendering
  return (
    <div className="top-area show-onload">
      <div className="bg-holder">
        <div className="bg-mask"></div>

        <div className="bg-parallax" style={styleBgParallax}></div>

        <div className="bg-content">
          <div className="container">
            <div>
              <h1
                className="main-header"
                style={{
                  color: "white",
                  paddingTop: "3rem",
                  paddingBottom: "1.5rem",
                }}
              >
                Find Your Perfect Trip
              </h1>
            </div>
            <Tabs
              className="tabs"
              tabBarStyle={{ marginBottom: "0" }}
              type="card"
              defaultActiveKey="1"
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <span>
                    <i className="fas fa-car"></i> Cars
                  </span>
                }
                key="1"
              >
                <div className="city-searches">
                  <h2
                    className="search-form-header"
                    style={{
                      textAlign: "left",
                      paddingLeft: "0",
                      paddingTop: "1rem",
                      marginBottom: "0",
                    }}
                  >
                    Search For Cheap Rental Cars
                  </h2>

                  <p>
                    Already have a reservation? View, Update or Delete it{" "}
                    <a className="res" href="/car-reservation">
                      here
                    </a>
                    .
                  </p>

                  <SearchForm button="Search for Rental Cars" />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <i className="fas fa-hotel"></i> Hotels
                  </span>
                }
                key="2"
              >
                <div
                  className="hotel-city-searches"
                  style={{ marginBottom: "2rem" }}
                >
                  <div>
                    {" "}
                    <h2
                      className="search-form-header"
                      style={{
                        textAlign: "left",
                        paddingLeft: "0rem",
                        paddingTop: "1rem",
                        marginBottom: "0",
                      }}
                    >
                      Search And Save On Hotels
                    </h2>
                    <p>
                      Already have a reservation? View, Update or Delete it{" "}
                      <a className="res" href="/">
                        here
                      </a>
                      .
                    </p>
                    <HotelSearchForm />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
