import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import Axios from "axios";

function Results() {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [rates, setRates] = useState({});
  const [pickupLoc, setPickupLoc] = useState("");
  const [dropoffLoc, setDropoffLoc] = useState("");

  // console.log(location.state.pickup_location);
  // console.log(location.state.dropoff_location);

  useEffect(() => {
    setResults(location.state.result);
    setPickupLoc(location.state.pickup_location);
    setDropoffLoc(location.state.dropoff_location);

    Axios.get("https://api.exchangeratesapi.io/latest?base=INR").then((resp) =>
      setRates(resp.data.rates)
    );
  }, []);

  // console.log(rates);
  // console.log(results);
  // console.log(location.state);

  if (results === []) {
    alert("No cars available. Please refine your search!");
  }

  return (
    <div className="results-page bg-content">
      <div className=" row">
        <SearchForm
          button="Update Search"
          class="search-update"
          pickupLoc={pickupLoc}
          dropoffLoc={dropoffLoc}
        />

        {results.map((car, index) => {
          return (
            <div key={index + 1} className="car">
              <div className="car-img-div">
                <img
                  className="car-images"
                  src={car.category.image_url}
                  alt={`Car ${index + 1}`}
                />
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h3 className="align">{car.category.name}</h3>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2 align">
                  {car.features.smoke_free ? (
                    <i className="fas fa-smoking-ban fa-2x"></i>
                  ) : null}
                  <br />
                  <br />
                  {car.features.bluetooth_equipped ? (
                    <i className="fab fa-bluetooth fa-2x"></i>
                  ) : null}
                </div>

                <div className="col-md-2 align">
                  <i className="fas fa-car-side fa-2x"></i>{" "}
                  <h4>x{car.capacity.doors}</h4>
                  <i className="fas fa-user fa-2x top-margin"></i>{" "}
                  <h4>x{car.capacity.seats}</h4>
                </div>

                <div className="col-md-3 align">
                  <i className="fas fa-briefcase fa-2x"></i>{" "}
                  <h4>x{car.capacity.luggage_capacity.large_suitcase}</h4>
                  <i className="fas fa-cogs fa-2x top-margin"></i>{" "}
                  <h4>{car.category.vehicle_transmission}</h4>
                </div>

                <div className="col-md-4 align">
                  {car.rate_totals.rate.currency === "USD" ||
                  "INR" ||
                  "GBP" ||
                  "EUR" ? (
                    <i className="fas fa-rupee-sign fa-3x"></i>
                  ) : (
                    <h2>{car.rate_totals.rate.currency}</h2>
                  )}
                  <h3>
                    {car.rate_totals.rate.currency === "USD"
                      ? (
                          (1 / rates.USD) *
                          car.rate_totals.pay_later.reservation_total
                        ).toFixed(2)
                      : car.rate_totals.rate.currency === "GBP"
                      ? (
                          (1 / rates.GBP) *
                          car.rate_totals.pay_later.reservation_total
                        ).toFixed(2)
                      : car.rate_totals.rate.currency === "EUR"
                      ? (
                          (1 / rates.EUR) *
                          car.rate_totals.pay_later.reservation_total
                        ).toFixed(2)
                      : car.rate_totals.pay_later.reservation_total}
                  </h3>
                  <Link
                    to={{
                      pathname: `/cars/${car.category.name}`,
                      state: {
                        result: results,
                        pickup_location: pickupLoc,
                        dropoff_location: dropoffLoc,
                        pickup_date: location.state.pickup_date,
                        dropoff_date: location.state.dropoff_date,
                        country_code: location.state.country_code,
                        token: location.state.token,
                      },
                    }}
                  >
                    <button
                      type="button"
                      className="btn btn-orange btn-lg btn-block select-button"
                    >
                      Select
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Results;

// {!error ?
// <div className="price">
// <i className="fas fa-rupee-sign fa-3x"></i> <h3>{
//     car.rate_totals.rate.currency === "USD" ?
//         Math.ceil((car.rate_totals.pay_later.vehicle_total + car.rate_totals.pay_later.reservation_total) * rates.USD) :
//         Math.ceil((car.rate_totals.pay_later.vehicle_total + car.rate_totals.pay_later.reservation_total) * rates.GBP)
// }</h3>
// </div> :
// car.rate_totals.rate.currency === "USD" ?
// <div className="price">
//     <i className="fas fa-dollar-sign fa-3x"></i>
//     <h3>{(car.rate_totals.pay_later.vehicle_total + car.rate_totals.pay_later.reservation_total).toFixed(2)}</h3>
// </div> :
// <div className="price">
//     {/* <i className="fas fa-pound-sign fa-3x"></i> */} <h2>{car.rate_totals.rate.currency}</h2>
//     <h3>{(car.rate_totals.pay_later.vehicle_total + car.rate_totals.pay_later.reservation_total).toFixed(2)}</h3>
// </div>}

// {Axios.get(`https://free.currconv.com/api/v7/convert?q=${car.rate_totals.rate.currency}_INR&compact=ultra&apiKey=9c09c1ad2256a3e21912`)
//  .then(res => {return res.data[Object.keys(res.data)[0]] * (car.rate_totals.pay_later.vehicle_total+car.rate_totals.pay_later.reservation_total)})}

// car.rate_totals.rate.currency, car.rate_totals.pay_later.vehicle_total+car.rate_totals.pay_later.reservation_total
// `https://free.currconv.com/api/v7/convert?q=${curr}_INR&compact=ultra&apiKey=dd8e835c3d0a875afe5e`

// 9c09c1ad2256a3e21912
