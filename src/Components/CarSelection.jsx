import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Axios from "axios";
import parseISO from "date-fns/parseISO";

function CarSelection(props) {
  const location = useLocation();
  const [rates, setRates] = useState({});
  const [exRates, setExRates] = useState({});
  const [extras, setExtras] = useState(0);
  const [insurance, setInsurance] = useState(0);

  const [extrasArray, setExtrasArray] = useState([]);
  const [insuranceArray, setInsuranceArray] = useState([]);

  const car = location.state.result.find((car) => {
    return car.category.name === props.match.params.name;
  });

  useEffect(() => {
    Axios.get(
      "https://stage.abgapiservices.com:443/cars/catalog/v1/vehicles/rates",
      {
        headers: {
          client_id: "12ba16b2baab4ce68571fcee599fcbf6",
          Authorization: `Bearer ${location.state.token}`,
          "Content-Type": "application/json",
        },
        params: {
          brand: "Avis",
          pickup_date: location.state.pickup_date,
          pickup_location: location.state.pickup_location,
          dropoff_date: location.state.dropoff_date,
          dropoff_location: location.state.dropoff_location,
          country_code: location.state.country_code || "IN",
          vehicle_class_code: car.category.vehicle_class_code,
          rate_code: car.rate_totals.rate.rate_code,
          client_id: "12ba16b2baab4ce68571fcee599fcbf6",
        },
      }
    ).then((resp) => setRates(resp.data));

    Axios.get("https://api.exchangeratesapi.io/latest?base=INR").then((resp) =>
      setExRates(resp.data.rates)
    );
  }, []);

  // console.log(rates);
  // console.log(car);

  const parsedPickupDate = String(parseISO(location.state.pickup_date));
  const parsedDropoffDate = String(parseISO(location.state.dropoff_date));

  const checkbox = (inx) => {
    return document.getElementById(inx);
  };

  const handleChange = (e) => {
    e.persist();
    const price =
      rates.reservation.rate_totals.rate.currency === "USD"
        ? (
            (1 / exRates.USD) *
            rates.reservation.extras[e.target.id].total_owed
          ).toFixed(0)
        : rates.reservation.rate_totals.rate.currency === "GBP"
        ? (
            (1 / exRates.GBP) *
            rates.reservation.extras[e.target.id].total_owed
          ).toFixed(0)
        : rates.reservation.rate_totals.rate.currency === "EUR"
        ? (
            (1 / exRates.EUR) *
            rates.reservation.extras[e.target.id].total_owed
          ).toFixed(0)
        : rates.reservation.extras[e.target.id].total_owed;

    checkbox(e.target.id).checked
      ? setExtras((prev) => Number(prev) + Number(price))
      : setExtras((prev) => Number(prev) - Number(price));

    rates.reservation.extras[e.target.id].quantity = 1;

    setExtrasArray((prev) => {
      // return rates.reservation.extras.filter((extra, index) => {
      //   return checkbox(index).checked === true ? extra : null;
      // });
      return checkbox(e.target.id).checked === true
        ? [...prev, rates.reservation.extras[e.target.id]]
        : [...prev].filter(
            (item) => item.code !== rates.reservation.extras[e.target.id].code
          );
    });
  };

  const handleInsChange = (e) => {
    e.persist();
    const price =
      rates.reservation.rate_totals.rate.currency === "USD"
        ? (
            (1 / exRates.USD) *
            rates.reservation.insurance[e.target.id - 14].total_owed
          ).toFixed(0)
        : rates.reservation.rate_totals.rate.currency === "GBP"
        ? (
            (1 / exRates.GBP) *
            rates.reservation.insurance[e.target.id - 14].total_owed
          ).toFixed(0)
        : rates.reservation.rate_totals.rate.currency === "EUR"
        ? (
            (1 / exRates.EUR) *
            rates.reservation.insurance[e.target.id - 14].total_owed
          ).toFixed(0)
        : rates.reservation.insurance[e.target.id - 14].total_owed;

    checkbox(e.target.id).checked
      ? setInsurance((prev) => Number(prev) + Number(price))
      : setInsurance((prev) => Number(prev) - Number(price));

    rates.reservation.insurance[e.target.id - 14].selected = !rates.reservation
      .insurance[e.target.id - 14].selected;

    checkbox(e.target.id).checked
      ? (rates.reservation.insurance[e.target.id - 14].selection_note =
          "ACCEPTED")
      : (rates.reservation.insurance[e.target.id - 14].selection_note =
          "DECLINED");

    setInsuranceArray((prev) => {
      // return rates.reservation.insurance.filter((ins, index) => {
      //   return checkbox(index + 14).checked === true ? ins : null;
      // });
      return checkbox(e.target.id).checked === true
        ? [...prev, rates.reservation.insurance[e.target.id - 14]]
        : [...prev].filter(
            (item) =>
              item.code !== rates.reservation.insurance[e.target.id - 14].code
          );
    });
  };

  // console.log(extrasArray);
  // console.log(insuranceArray);

  if (!rates.reservation) {
    return <h1 style={{ textAlign: "center", margin: "10rem" }}>Loading...</h1>;
  }
  return (
    <div className="container">
      <h2
        style={{ margin: "2rem 0", textAlign: "center" }}
      >{`${car.category.make} ${car.category.model}`}</h2>
      <div className="car-selection-img-div">
        <img
          className="car-selection-img"
          src={car.category.image_url}
          alt={car.category.name}
        ></img>
      </div>

      <div className="row">
        <div className="totals-table col-md-5">
          <table cellPadding="2rem" style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td>
                  <h4>Vehicle total</h4>
                </td>
                <td>
                  {rates.reservation.rate_totals.rate.currency === "USD" ||
                  "INR" ||
                  "GBP" ||
                  "EUR" ? (
                    <i className="fas fa-rupee-sign"></i>
                  ) : (
                    <h4>{car.rate_totals.rate.currency}</h4>
                  )}
                  <h4>
                    {rates.reservation.rate_totals.rate.currency === "USD"
                      ? (
                          (1 / exRates.USD) *
                          rates.reservation.rate_totals.totals.vehicle_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "GBP"
                      ? (
                          (1 / exRates.GBP) *
                          rates.reservation.rate_totals.totals.vehicle_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "EUR"
                      ? (
                          (1 / exRates.EUR) *
                          rates.reservation.rate_totals.totals.vehicle_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.totals.vehicle_total}{" "}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>{rates.reservation.rate_totals.rate.days} day(s)</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Taxes & Fees</h4>
                </td>
                <td>
                  {rates.reservation.rate_totals.rate.currency === "USD" ||
                  "INR" ||
                  "GBP" ||
                  "EUR" ? (
                    <i className="fas fa-rupee-sign"></i>
                  ) : (
                    <h4>{car.rate_totals.rate.currency}</h4>
                  )}
                  <h4>
                    {rates.reservation.rate_totals.rate.currency === "USD"
                      ? (
                          (1 / exRates.USD) *
                          rates.reservation.rate_totals.totals.taxes_fees_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "GBP"
                      ? (
                          (1 / exRates.GBP) *
                          rates.reservation.rate_totals.totals.taxes_fees_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "EUR"
                      ? (
                          (1 / exRates.EUR) *
                          rates.reservation.rate_totals.totals.taxes_fees_total
                        ).toFixed(0)
                      : rates.reservation.rate_totals.totals
                          .taxes_fees_total}{" "}
                  </h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Extras</h4>
                </td>
                <td>
                  <i className="fas fa-rupee-sign"></i>
                  <h4>{extras}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>Insurances</h4>
                </td>
                <td>
                  <i className="fas fa-rupee-sign"></i>
                  <h4>{insurance}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Total</h3>
                </td>
                <td>
                  {rates.reservation.rate_totals.rate.currency === "USD" ||
                  "INR" ||
                  "GBP" ||
                  "EUR" ? (
                    <i className="fas fa-rupee-sign"></i>
                  ) : (
                    <h3>{car.rate_totals.rate.currency}</h3>
                  )}
                  <h3>
                    {rates.reservation.rate_totals.rate.currency === "USD"
                      ? (
                          (1 / exRates.USD) *
                            rates.reservation.rate_totals.totals
                              .reservation_total +
                          extras +
                          insurance
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "GBP"
                      ? (
                          (1 / exRates.GBP) *
                            rates.reservation.rate_totals.totals
                              .reservation_total +
                          extras +
                          insurance
                        ).toFixed(0)
                      : rates.reservation.rate_totals.rate.currency === "EUR"
                      ? (
                          (1 / exRates.EUR) *
                            rates.reservation.rate_totals.totals
                              .reservation_total +
                          extras +
                          insurance
                        ).toFixed(0)
                      : rates.reservation.rate_totals.totals.reservation_total +
                        extras +
                        insurance}{" "}
                  </h3>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            *The price is subject to drastic changes. Hurry up in reserving the
            best-suited car for you in order to avoid disappointment.
          </p>
        </div>
        <div
          style={{ textAlign: "center", paddingTop: "1rem" }}
          className="col-md-2"
        >
          <br />
          <i className="fas fa-car-side fa-2x"></i>{" "}
          <h4>x{car.capacity.doors}</h4>
          <i className="fas fa-user fa-2x top-margin"></i>{" "}
          <h4>x{car.capacity.seats}</h4>
          <i className="fas fa-briefcase fa-2x"></i>{" "}
          <h4>x{car.capacity.luggage_capacity.large_suitcase}</h4>
          <i className="fas fa-cogs fa-2x top-margin"></i>{" "}
          <h4>
            {car.category.vehicle_transmission === "Automatic"
              ? car.category.vehicle_transmission.substring(0, 4)
              : car.category.vehicle_transmission}
          </h4>
          {car.category.mpg ? (
            <div>
              <i className="fas fa-gas-pump fa-2x"></i>
              <h4>{car.category.mpg}</h4>
            </div>
          ) : null}
          {car.features.smoke_free ? (
            <i className="fas fa-smoking-ban fa-2x"></i>
          ) : null}
          <br />
          <br />
          {car.features.bluetooth_equipped ? (
            <i className="fab fa-bluetooth fa-2x"></i>
          ) : null}
        </div>
        <div className="col-md-5 details">
          <h3>Details</h3>
          <h4 style={{ paddingBottom: "1rem" }}>Pick-up:</h4>
          <h5>
            <i className="fas fa-map-marker-alt"></i>{" "}
            {rates.reservation.pickup_location.location.name},{" "}
            {rates.reservation.pickup_location.address.city}
          </h5>{" "}
          <br />
          <h5>
            {" "}
            <i className="fas fa-phone"></i>{" "}
            {rates.reservation.pickup_location.location.telephone}
          </h5>{" "}
          <br />
          <h5>
            {" "}
            <i className="far fa-calendar-alt"></i>{" "}
            {parsedPickupDate.substring(0, 25)}
          </h5>
          <h4 style={{ padding: "1rem 0" }}>Drop-off:</h4>
          <h5>
            <i className="fas fa-map-marker-alt"></i>{" "}
            {rates.reservation.dropoff_location.location.name},{" "}
            {rates.reservation.pickup_location.address.city}
          </h5>{" "}
          <br />
          <h5>
            <i className="far fa-calendar-alt"></i>{" "}
            {parsedDropoffDate.substring(0, 25)}
          </h5>
        </div>
      </div>

      {rates.reservation.extras && (
        <div style={{ textAlign: "center" }}>
          <h2>Optional Extras</h2>
          <h6 style={{ color: "#808080", marginBottom: "1.5rem" }}>
            Check the ones you want
          </h6>
        </div>
      )}
      <div className="row">
        {rates.reservation.extras &&
          rates.reservation.extras.map((extra, index) => {
            return extra.total_owed === 0 ? (
              <div
                key={index + 1}
                className="col-lg-2 col-md-3 col-sm-4 extra-div"
              >
                <h4 style={{ marginBottom: "0" }}>{extra.code}</h4>
                <h5 style={{ marginTop: "2rem" }}>Default</h5>
              </div>
            ) : (
              <div
                key={index + 1}
                className="col-lg-2 col-md-3 col-sm-4 extra-div"
              >
                <h4 style={{ marginBottom: "0" }}>{extra.code}</h4>
                <input
                  id={index}
                  style={{ margin: "1rem 0" }}
                  type="checkbox"
                  onChange={handleChange}
                ></input>
                <h4>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {rates.reservation.rate_totals.rate.currency === "USD"
                    ? ((1 / exRates.USD) * extra.total_owed).toFixed(0)
                    : rates.reservation.rate_totals.rate.currency === "GBP"
                    ? ((1 / exRates.GBP) * extra.total_owed).toFixed(0)
                    : rates.reservation.rate_totals.rate.currency === "EUR"
                    ? ((1 / exRates.EUR) * extra.total_owed).toFixed(0)
                    : extra.total_owed}
                </h4>
              </div>
            );
          })}
      </div>
      {rates.reservation.insurance && (
        <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
          <h2>Insurances</h2>
          <h6 style={{ color: "#808080", marginBottom: "1.5rem" }}>
            Check the ones you want
          </h6>
        </div>
      )}
      <div className="row">
        {rates.reservation.insurance &&
          rates.reservation.insurance.map((ins, index) => {
            return ins.total_owed === 0 ? (
              <div key={index + 1} className="col-lg-3 col-md-6 insurance-div">
                <h4 style={{ marginBottom: "0" }}>
                  {ins.name.substring(0, ins.name.length - 6)}
                </h4>
                <h4>
                  {ins.name.substring(ins.name.length - 5, ins.name.length)}
                </h4>
                <h5 style={{ marginTop: "2rem" }}>Default</h5>
              </div>
            ) : (
              <div key={index + 1} className="col-lg-3 col-md-6 insurance-div">
                <h4 style={{ marginBottom: "0" }}>
                  {ins.name.substring(0, ins.name.length - 6)}
                </h4>
                <h4>
                  {ins.name.substring(ins.name.length - 5, ins.name.length)}
                </h4>
                <input
                  id={index + 14}
                  type="checkbox"
                  onChange={handleInsChange}
                  style={{ margin: "1rem 0" }}
                ></input>
                <h4>
                  <i className="fas fa-rupee-sign"></i>{" "}
                  {rates.reservation.rate_totals.rate.currency === "USD"
                    ? ((1 / exRates.USD) * ins.total_owed).toFixed(0)
                    : rates.reservation.rate_totals.rate.currency === "GBP"
                    ? ((1 / exRates.GBP) * ins.total_owed).toFixed(0)
                    : rates.reservation.rate_totals.rate.currency === "EUR"
                    ? ((1 / exRates.EUR) * ins.total_owed).toFixed(0)
                    : ins.total_owed}
                </h4>
              </div>
            );
          })}
      </div>
      <div style={{ textAlign: "center" }}>
        <Link
          to={{
            pathname: `/cars/${car.category.name}/terms&conditions`,
            state: {
              reservationInfo: {
                ...location.state,
              },
              car: car,
              ex_rates: exRates,
              rates: rates,
              extras_total: extras,
              insurance_total: insurance,
              user_extras: extrasArray,
              user_insurance: insuranceArray,
            },
          }}
        >
          <button
            type="button"
            id="checkout"
            className="btn btn-orange btn-lg btn-checkout"
          >
            Proceed
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CarSelection;
