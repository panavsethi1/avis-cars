import React, { useState } from "react";
import { Input } from "antd";
import { Link, useLocation } from "react-router-dom";

function Checkout() {

  const [user, setUser] = useState({fName: "", lName: "", email:"", DOB:"", telephone:"", address:""})
  
  const location = useLocation();

  const handleFNameChange = (e) => {
    const fName = e.target.value
    setUser((prev) => {return {...prev, fName: fName}})
  }
  
  const handleLNameChange = (e) => {
    const lName = e.target.value
    setUser((prev) => {return {...prev, lName: lName}})
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setUser((prev) => {return {...prev, email: email}})
  }

  const handleDOBChange = (e) => {
    const DOB = e.target.value
    setUser((prev) => {return {...prev, DOB: DOB}})
  }

  const handleTelephoneChange = (e) => {
    const telephone = e.target.value
    setUser((prev) => {return {...prev, telephone: telephone}})
  }

  const handleAddressChange = (e) => {
    const address = e.target.value
    setUser((prev) => {return {...prev, address: address}})
  }

  const handleProceed = (e) => {
    if(!user.fName || !user.lName || !user.email) {
      alert("Please fill in all the required fields (*)")
      e.preventDefault();
    }
  }

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
            suffix={<i className="fas fa-user"></i>}
            size="large"
            value={user.fName}
            onChange={handleFNameChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Last Name *"
            suffix={<i className="fas fa-user"></i>}
            size="large"
            value={user.lName}
            onChange={handleLNameChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="E-mail *"
            suffix={<i className="fas fa-envelope"></i>}
            size="large"
            value={user.email}
            onChange={handleEmailChange}
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
            addonBefore="Telephone"
            defaultValue="+91 9876543210"
            suffix={<i className="fas fa-phone-alt"></i>}
            size="large"
            value={user.telephone}
            onChange={handleTelephoneChange}
          />
          <Input
            style={{ marginBottom: "1.5rem" }}
            addonBefore="Address"
            suffix={<i className="fas fa-map-marked-alt"></i>}
            size="large"
            value={user.address}
            onChange={handleAddressChange}
          />
          <p style={{marginBottom:"0"}}>*Please check all the details before proceeding.</p>
          <Link
            to={{
              pathname: `/results/${location.state.info.car.category.name}/reservation`,
              state: { info: location.state.info, user: user },
            }}
          >
            <button
              type="button"
              id="checkout"
              className="btn btn-orange btn-lg"
              onChange={handleProceed}
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
