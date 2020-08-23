import React, { useState, useEffect } from "react";
import CityAutoComplete from "./CityAutoComplete";
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { useHistory } from "react-router-dom";

function SearchForm(props) {
  let history = useHistory();

  //Initializing states and constants
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [defaultDropoff, setDefaultDropoff] = useState("");

  const [noISOPickup, setNoISOPickup] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");

  const [countryCode, setCountryCode] = useState("");

  const [token, setToken] = useState("");
  const clientID = "12ba16b2baab4ce68571fcee599fcbf6";
  const [isClicked, setIsClicked] = useState(false);

  //Handling selections and clicks
  const handlePickupChange = (code, ctryCode) => {
    setPickupLocation(code);
    setDropoffLocation(code);
    setCountryCode(ctryCode);
  };
  const handlePickupDateChange = (date) => {
    setNoISOPickup(date);
    setPickupDate(date.toISOString(true).substring(0, 19));
  };

  const handleDropoffChange = (code, value) => {
    setDropoffLocation(code);
    setDefaultDropoff(value);
  };
  const handleDropoffDateChange = (date) => {
    setDropoffDate(date.toISOString(true).substring(0, 19));
  };

  //Token fetch
  useEffect(() => {
    axios
      .get("https://stage.abgapiservices.com/oauth/token/v1", {
        headers: {
          client_id: "12ba16b2baab4ce68571fcee599fcbf6",
          client_secret: "94c7fBf210B445a29AF1D5C61Dfac145",
        },
      })
      .then((res) => setToken(res.data.access_token))
      .catch((err) => console.log(err));
  }, []);

  //Handling submit click
  const handleClick = (e) => {
    axios
      .get("https://stage.abgapiservices.com:443/cars/catalog/v1/vehicles", {
        headers: {
          client_id: clientID,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: {
          brand: "Avis",
          pickup_date: pickupDate,
          pickup_location: pickupLocation || props.pickupLoc,
          dropoff_date: dropoffDate,
          dropoff_location: dropoffLocation || props.dropoffLoc,
          country_code: countryCode || "IN",
        },
      })
      .then((resp) =>
        history.push({
          pathname: "/results",
          state: {
            result: resp.data.vehicles,
            pickup_location: pickupLocation || props.pickupLoc,
            dropoff_location: dropoffLocation || props.dropoffLoc,
            pickup_date: pickupDate,
            dropoff_date: dropoffDate,
            country_code: countryCode,
            token: token,
          },
        })
      )
      .catch((err) => {
        console.log(err);
        alert(err.response.data.status.errors[0].details);
      });

    // if (!pickupDate || !dropoffDate || (!pickupLocation && !props.pickupLoc) || (!dropoffLocation && !props.dropoffLoc)) {
    //     alert("Please fill in all the details.")
    // }
  };

  function disabledPickupDate(current) {
    return current && current < moment().endOf("day");
  }

  function disabledDropoffDate(date) {
    return date <= noISOPickup;
  }

  return (
    <div className={`row ${props.class}`}>
      <div className="col-md-6">
        <h6 style={{ textAlign: "left" }}>Pick-up Location</h6>
        <CityAutoComplete
          placeholder="City, Airport"
          style={{ width: "100%" }}
          cb={handlePickupChange}
          token={token}
        />
        <div className="row date-time">
          <div className="col-md-12 ">
            <h6 style={{ textAlign: "left" }}>Pick-up Date</h6>
            <DatePicker
              className="date"
              disabledDate={disabledPickupDate}
              minuteStep={15}
              secondStep={60}
              onOk={handlePickupDateChange}
              showToday={false}
              showNow={false}
              showTime={{ defaultValue: moment().startOf("hour") }}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <h6 className="top-padding" style={{ textAlign: "left" }}>
          Drop-off Location
        </h6>
        <div onClick={() => setIsClicked(true)}>
          <CityAutoComplete
            placeholder={
              isClicked
                ? "City, Airport"
                : "Same as Pick-up Location. Click to change."
            }
            style={{ width: "100%" }}
            cb={handleDropoffChange}
            token={token}
            value={!isClicked ? defaultDropoff : null}
          />
        </div>
        <div className="row date-time">
          <div className="col-md-12 ">
            <h6 style={{ textAlign: "left" }}>Drop-off Date</h6>
            <DatePicker
              className="date"
              showTime={{ defaultValue: moment().startOf("hour") }}
              disabledDate={disabledDropoffDate}
              minuteStep={15}
              secondStep={60}
              onOk={handleDropoffDateChange}
              showToday={false}
              showNow={false}
            />
          </div>
        </div>
      </div>
      <form action="/results">
        <button
          type="button"
          onClick={handleClick}
          className="btn btn-orange btn-lg"
        >
          {props.button}
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
