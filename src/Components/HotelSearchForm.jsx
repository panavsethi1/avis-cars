import React, { useState, useEffect } from "react";
import { AutoComplete, DatePicker, InputNumber, Input } from "antd";
import moment from "moment";
import Axios from "axios";
import { parseISO } from "date-fns/parseISO";
import { Link } from "react-router-dom";

const { Option } = AutoComplete;

function HotelSearchForm() {
  const [checkin, setCheckin] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotelToken, setHotelToken] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});

  useEffect(() => {
    Axios.post("https://api.tmp.trawish.com/v1/user/token", {
      client_id: "5ec43cdb6df0521da0092524",
      client_secret: "hrSZ5KHuzWJ3Vdd6c6sJLf2T1jcyv32z",
    }).then((res) => setHotelToken(res.data.access_token));
  }, []);

  const disabledCheckInDate = (current) => {
    return current && current < moment().endOf("day");
  };
  const disabledCheckOutDate = (day) => {
    return day && day < checkin;
  };
  const handleCheckInDateChange = (e) => {
    setCheckin(e);
    if (e !== null) {
      setCheckInDate(
        e.toISOString(true).substring(0, 10).split("-").reverse().join("/")
      );
    }
  };
  const handleCheckOutDateChange = (e) => {
    if (e !== null) {
      setCheckOutDate(
        e.toISOString(true).substring(0, 10).split("-").reverse().join("/")
      );
    }
  };
  const handleCityChange = (value) => {
    Axios.get(
      `https://api.tmp.trawish.com/v1/destinations?limit=50&page=1&term=${value}`,
      {
        headers: {
          Authorization: "Bearer " + hotelToken,
        },
      }
    ).then((res) => {
      setCityOptions(res.data.data);
      console.log(res.data.data);
    });
  };

  const handleSearch = (e) => {
    if (
      !checkInDate.length ||
      !checkOutDate.length ||
      !selectedCity.country_code
    ) {
      e.preventDefault();
      alert("Please fill in all the Details.");
    }
  };

  return (
    <div>
      <h6 style={{ textAlign: "left" }}>Where are you going?</h6>
      <AutoComplete
        placeholder={
          <span>
            <i className="fas fa-map-marker-alt"></i> City, Airport, Point of
            Interest
          </span>
        }
        onChange={handleCityChange}
        style={{ width: "100%" }}
        onSelect={(value) => {
          const loc = cityOptions.find((location) => {
            return location.destination === value;
          });
          setSelectedCity(loc);
        }}
      >
        {cityOptions.map((location, inx) => (
          <Option key={inx} value={location.destination}>
            {location.destination}
          </Option>
        ))}
      </AutoComplete>

      <div className="row" style={{ marginTop: "1.3rem", marginBottom: "0" }}>
        <div className="col-md-6">
          <h6 style={{ textAlign: "left" }}>Check-in</h6>
          <DatePicker
            className="date"
            disabledDate={disabledCheckInDate}
            showToday={false}
            onChange={handleCheckInDateChange}
          />
        </div>
        <div className="col-md-6">
          <h6 style={{ textAlign: "left" }}>Check-out</h6>
          <DatePicker
            className="date"
            disabledDate={disabledCheckOutDate}
            showToday={false}
            onChange={handleCheckOutDateChange}
          />
        </div>
        <div className="col-md-4" style={{ textAlign: "left" }}>
          <Link
            to={{
              pathname: "/rooms",
              state: {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                selectedCity: selectedCity,
                token: hotelToken,
              },
            }}
          >
            <button
              type="button"
              onClick={handleSearch}
              className="btn btn-orange btn-lg"
              style={{ margin: "2rem 0 0", width: "100%" }}
            >
              Search for Hotels
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HotelSearchForm;
