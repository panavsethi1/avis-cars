import React from "react";
import { useLocation } from "react-router-dom";
import HotelSearchForm from "./HotelSearchForm";

function HotelResults() {
  const location = useLocation();
  console.log(location.state);

  if (!location.state) {
    return <h1 style={{ textAlign: "center", margin: "10rem" }}>Loading...</h1>;
  }
  return (
    <div className="container" style={{ margin: "2rem auto 3rem" }}>
      <h1 style={{ textAlign: "center" }}>The Best Hotels For You</h1>
      {location.state.map((hotel, inx) => {
        const type = hotel.room_details[0].type;
        const desc = hotel.room_details[0].desc;
        return (
          <div key={hotel.id} id={hotel.id}>
            <div
              className="row"
              style={{
                border: "solid #ed8323",
                borderRadius: "10px",
                padding: "2rem 1rem",
                marginBottom: "2rem",
              }}
            >
              <div className="col-md-4">
                <img
                  style={{
                    borderRadius: "10px",
                    height: "80%",
                    marginTop: "10%",
                    marginBottom: "10%",
                  }}
                  src={hotel.image}
                  alt={hotel.name}
                ></img>
              </div>
              <div className="col-md-8">
                <h2 style={{ textAlign: "center" }}>{hotel.name}</h2>
                {type.length ? (
                  <h3 style={{ marginBottom: "2rem", textAlign: "center" }}>
                    {type.substring(0, desc.indexOf("|")) || type}.
                  </h3>
                ) : null}

                <div className="row" style={{ textAlign: "center" }}>
                  <div className="col-md-4">
                    {Number(hotel.rating) === 1 ? (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <i className="fas fa-star fa-2x star"></i>
                      </div>
                    ) : Number(hotel.rating) === 2 ? (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                      </div>
                    ) : Number(hotel.rating) === 3 ? (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                      </div>
                    ) : Number(hotel.rating) === 4 ? (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                      </div>
                    ) : Number(hotel.rating) === 5 ? (
                      <div style={{ marginBottom: "0.75rem" }}>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                        <i className="fas fa-star fa-2x star"></i>
                      </div>
                    ) : null}
                    <h4>
                      Room Count:{" "}
                      <span style={{ color: "#ed8323" }}>
                        {Number(hotel.room_details[0].total_rooms)}
                      </span>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <h4>
                      Adults:{" "}
                      <span style={{ color: "#ed8323" }}>
                        {Number(hotel.room_details[0].adults.substring(0, 1)) +
                          Number(hotel.room_details[0].adults.substring(2, 3)) +
                          Number(hotel.room_details[0].adults.substring(4, 5)) +
                          Number(hotel.room_details[0].adults.substring(6, 7))}
                      </span>
                    </h4>
                    <h4>
                      Children:{" "}
                      <span style={{ color: "#ed8323" }}>
                        {Number(
                          hotel.room_details[0].children.substring(0, 1)
                        ) +
                          Number(
                            hotel.room_details[0].children.substring(2, 3)
                          ) +
                          Number(
                            hotel.room_details[0].children.substring(4, 5)
                          ) +
                          Number(
                            hotel.room_details[0].children.substring(6, 7)
                          )}
                      </span>
                    </h4>
                  </div>
                  <div className="col-md-4">
                    <h3>
                      Price:{" "}
                      <i
                        style={{ color: "#ed8323" }}
                        className="fas fa-rupee-sign"
                      ></i>{" "}
                      <span style={{ color: "#ed8323" }}>
                        {Math.floor(hotel.price)}
                      </span>
                    </h3>
                  </div>
                </div>
                {desc.length ? (
                  <h5 style={{ marginTop: "2rem", textAlign: "center" }}>
                    *{desc.substring(0, desc.indexOf("|")) || desc}.
                  </h5>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default HotelResults;
