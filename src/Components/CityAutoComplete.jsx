import React, { useState } from "react";
import { AutoComplete } from "antd";
import axios from "axios";

const { Option } = AutoComplete;

function CityAutoComplete(props) {
  const [option, setOption] = useState([]);
  const [locations, setLocations] = useState([]);

  const handleSearch = (value) => {
    axios
      .get("https://stage.abgapiservices.com/cars/locations/v1", {
        params: {
          keyword: value,
        },
        headers: {
          client_id: "7bc7af29041645fe80aa5d16e71876e5",
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLocations(response.data.locations);
        setOption((prev) =>
          response.data.locations.map((location) => {
            return { value: location.name };
          })
        );
        console.log(response.data.locations);
      })
      .catch((err) => console.log(err));
  };

  return (
    <AutoComplete
      placeholder={props.placeholder}
      style={props.style}
      onSearch={handleSearch}
      options={option.filter((opt) => {
        return (
          opt.value !== "Marcos A Gelabert Intl Airport" &&
          opt.value !== "Roma Downtown" &&
          opt.value !== "Rome Downtown"
        );
      })}
      onSelect={(value) => {
        const loc = locations.find((location) => {
          return location.name === value;
        });
        const code = loc.code;
        const countryCode = loc.address.country_code;
        props.cb(code, countryCode, value);
      }}
      defaultValue={props.value}
      prefix={<i class="fas fa-map-marker-alt"></i>}
    />
  );
}

export default CityAutoComplete;
