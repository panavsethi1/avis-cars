import React, { useState } from "react";
import { Input } from "antd";
import { Link, useLocation, useHistory } from "react-router-dom";
import Axios from "axios";

function Checkout() {
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    DOB: "",
    telephone: "",
    address: "",
  });

  const location = useLocation();
  const history = useHistory();

  const handleFNameChange = (e) => {
    const fName = e.target.value;
    setUser((prev) => {
      return { ...prev, fName: fName };
    });
  };

  const handleLNameChange = (e) => {
    const lName = e.target.value;
    setUser((prev) => {
      return { ...prev, lName: lName };
    });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setUser((prev) => {
      return { ...prev, email: email };
    });
  };

  const handleDOBChange = (e) => {
    const DOB = e.target.value;
    setUser((prev) => {
      return { ...prev, DOB: DOB };
    });
  };

  const handleTelephoneChange = (e) => {
    const telephone = e.target.value;
    setUser((prev) => {
      return { ...prev, telephone: telephone };
    });
  };

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setUser((prev) => {
      return { ...prev, address: address };
    });
  };

  const body = {
    product: {
      brand: "Avis",
    },
    reservation: {
      email_notification: true,
      pickup_date: location.state.info.reservationInfo.pickup_date,
      pickup_location: location.state.info.reservationInfo.pickup_location,
      dropoff_date: location.state.info.reservationInfo.dropoff_date,
      dropoff_location: location.state.info.reservationInfo.dropoff_location,
      vehicle_class_code: location.state.info.car.category.vehicle_class_code,
    },
    rate_totals: {
      rate: {
        rate_code:
          location.state.info.rates.reservation.rate_totals.rate.rate_code,
        country_code: location.state.info.reservationInfo.country_code,
      },
    },
    passenger: {
      contact: {
        first_name: user.fName,
        last_name: user.lName,
        email: user.email,
      },
    },
    insurance: [...location.state.info.user_insurance],
    extras: [...location.state.info.user_extras],
  };

  const handleProceed = (e) => {
    if (!user.fName.length || !user.lName.length || !user.email.length) {
      alert("Please fill in all the required fields (*)");
      e.preventDefault();
    } else {
      Axios.post(
        "https://stage.abgapiservices.com:443/cars/reservation/v1",
        body,
        {
          headers: {
            client_id: "12ba16b2baab4ce68571fcee599fcbf6",
            Authorization:
              "Bearer " + location.state.info.reservationInfo.token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => {
          console.log(resp);
          history.push(
            `/results/${location.state.info.car.category.name}/reservation`,
            {res: resp.data, user: user}
          );
        })
        .catch((err) => {
          console.log(err);
          if(err) {
            e.preventDefault()
            alert("There was some error while making the reservation. Please try again after some time.")
          }
        });
    }
  };

  return (
    <div
      className="container"
      style={{
        textAlign: "center",
        margin: "2rem auto",
        padding: "2rem",
        border: "thick solid #ed8323",
        borderRadius: "10px",
      }}
    >
      <h3>Please fill in your details to complete the reservation process.</h3>

      <div style={{ width: "50%", margin: "2rem auto 0" }}>
        <form>
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="First Name *"
            autoComplete="false"
            suffix={<i className="fas fa-user"></i>}
            size="large"
            value={user.fName}
            onChange={handleFNameChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Last Name *"
            autoComplete="false"
            suffix={<i className="fas fa-user"></i>}
            size="large"
            value={user.lName}
            onChange={handleLNameChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="E-mail *"
            autoComplete="false"
            suffix={<i className="fas fa-envelope"></i>}
            size="large"
            value={user.email}
            onChange={handleEmailChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Telephone"
            placeholder="+91 9876543210"
            suffix={<i className="fas fa-phone-alt"></i>}
            size="large"
            value={user.telephone}
            onChange={handleTelephoneChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Date of Birth"
            placeholder="YYYY-MM-DD"
            suffix={<i className="fas fa-birthday-cake"></i>}
            size="large"
            value={user.DOB}
            onChange={handleDOBChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Address"
            suffix={<i className="fas fa-map-marked-alt"></i>}
            size="large"
            value={user.address}
            onChange={handleAddressChange}
          />
            <p style={{ marginBottom: "0" }}>
              *Please check all the details before proceeding.
            </p>
          <Link
            to={{pathname: `/results/${location.state.info.car.category.name}/reservation`}}
          >
            <button
              type="button"
              id="checkout"
              className="btn btn-orange btn-lg"
              onClick={handleProceed}
            >
              Reserve My Car
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
