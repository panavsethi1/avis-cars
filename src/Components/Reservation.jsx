import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import parseISO from "date-fns/parseISO";
import Axios from "axios";

function Reservation(props) {
  const location = useLocation();
  const [info, setInfo] = useState({});
  const [exRates, setExRates] = useState({});

  useEffect(() => {
    setInfo(location.state);
    Axios.get("https://api.exchangeratesapi.io/latest?base=INR").then((resp) =>
      setExRates(resp.data.rates)
    );
  }, [location.state]);
  // console.log(info);
  // console.log(exRates);

  const exchange = (x) => {
    return info.res.reservation.rate_totals.rate.currency === "USD"
      ? ((1 / exRates.USD) * x).toFixed(0)
      : info.res.reservation.rate_totals.rate.currency === "GBP"
      ? ((1 / exRates.GBP) * x).toFixed(0)
      : info.res.reservation.rate_totals.rate.currency === "EUR"
      ? ((1 / exRates.EUR) * x).toFixed(0)
      : x;
  };

  if (info === undefined || !info.res) {
    return <h1 style={{ textAlign: "center", margin: "10rem" }}>Loading...</h1>;
  }

  const pickup_date = parseISO(info.res.reservation.confirmation.pickup_date);
  const dropoff_date = parseISO(info.res.reservation.confirmation.dropoff_date);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ margin: "1rem 0 0" }}>Reservation Details</h1>
      <h4 style={{ marginBottom: "1.5rem" }}>
        Thank you,{" "}
        <span style={{ color: "#ed8323" }}>
          {info.user.fName} {info.user.lName}
        </span>
        . Your car has been reserved.
      </h4>
      <div
        className="container"
        style={{
          backgroundColor: "#d3d3d3",
          border: "solid #ed8323",
          marginBottom: "2rem",
        }}
      >
        <h3 style={{ margin: "2rem 0" }}>
          Confirmation Number:{" "}
          <span style={{ color: "#ed8323" }}>
            {info.res.reservation.confirmation.number}
          </span>
        </h3>
        <hr />
        <h3 style={{ marginTop: "2rem" }}>
          {info.res.reservation.vehicle.category.make}{" "}
          {info.res.reservation.vehicle.category.model}
        </h3>
        <img
          style={{ width: "40%" }}
          src={info.res.reservation.vehicle.category.image_url}
          alt={info.res.reservation.vehicle.category.name}
        ></img>
        <h5>
          Pickup Location:{" "}
          <span style={{ color: "#ed8323" }}>
            {info.res.reservation.pickup_location.location.name},{" "}
            {info.res.reservation.pickup_location.address.city}
          </span>
        </h5>
        <h5>
          Dropoff Location:{" "}
          <span style={{ color: "#ed8323" }}>
            {info.res.reservation.dropoff_location.location.name},{" "}
            {info.res.reservation.dropoff_location.address.city}
          </span>
        </h5>
        <h5>
          Pickup Date:{" "}
          <span style={{ color: "#ed8323" }}>
            {String(pickup_date).substring(0, 24)}
          </span>
        </h5>
        <h5 style={{ marginBottom: "2rem" }}>
          Dropoff Date:{" "}
          <span style={{ color: "#ed8323" }}>
            {String(dropoff_date).substring(0, 24)}
          </span>
        </h5>
        <hr />
        <h3 style={{ margin: "2rem 0" }}>Rates & Totals</h3>
        <table style={{ margin: "1rem auto" }}>
          <tbody>
            <tr>
              <td style={{ textAlign: "left" }}>
                <h4 style={{ padding: "0.5rem" }}>Vehicle Total</h4>
              </td>
              <td style={{ textAlign: "right" }}>
                <h4 style={{ padding: "0.5rem" }}>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {exchange(
                    info.res.reservation.rate_totals.totals.vehicle_total
                  )}
                </h4>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <h4 style={{ padding: "0.5rem" }}>Extras Total</h4>
              </td>
              <td style={{ textAlign: "right" }}>
                <h4 style={{ padding: "0.5rem" }}>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {exchange(
                    info.res.reservation.rate_totals.totals.extras_total
                  )}
                </h4>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <h4 style={{ padding: "0.5rem" }}>Insurance Total</h4>
              </td>
              <td style={{ textAlign: "right" }}>
                <h4 style={{ padding: "0.5rem" }}>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {exchange(
                    info.res.reservation.rate_totals.totals.insurance_total
                  )}
                </h4>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <h4 style={{ padding: "0.5rem" }}>Taxes & Fees Total</h4>
              </td>
              <td style={{ textAlign: "right" }}>
                <h4 style={{ padding: "0.5rem" }}>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {exchange(
                    info.res.reservation.rate_totals.totals.taxes_fees_total
                  )}
                </h4>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "left" }}>
                <h4 style={{ padding: "0.5rem" }}>Reservation Total</h4>
              </td>
              <td style={{ textAlign: "right" }}>
                <h4 style={{ padding: "0.5rem" }}>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {exchange(
                    info.res.reservation.rate_totals.totals.reservation_total
                  )}
                </h4>
              </td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginBottom: "2rem" }}>
          *All the rates above are approximate conversions to INR from the
          respective currency.
        </p>
      </div>
    </div>
  );
}

export default Reservation;
