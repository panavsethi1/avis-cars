import React, { useState, useEffect } from "react";
import { Input } from "antd";
import _ from "lodash";
import Axios from "axios";

function OldReservation() {
  const [token, setToken] = useState("");
  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isCancelClicked, setIsCancelClicked] = useState(false);
  const [view, setView] = useState({ confNum: "", lName: "" });
  const [cancel, setCancel] = useState({ confNum: "", lName: "" });
  const [viewInfo, setViewInfo] = useState({});
  const [cancelInfo, setCancelInfo] = useState({});

  useEffect(() => {
    // Token fetch
    Axios.get("https://stage.abgapiservices.com/oauth/token/v1", {
      headers: {
        client_id: "12ba16b2baab4ce68571fcee599fcbf6",
        client_secret: "94c7fBf210B445a29AF1D5C61Dfac145",
      },
    })
      .then((res) => setToken(res.data.access_token))
      .catch((err) => console.log(err));
  }, []);

  // View Reservation
  const handleViewClick = () => {
    setIsViewClicked(!isViewClicked);
    setIsUpdateClicked(false);
    setIsCancelClicked(false);
  };
  const handleViewConfChange = (e) => {
    const confNum = e.target.value;
    setView((prev) => {
      return { ...prev, confNum: confNum.toUpperCase() };
    });
  };
  const handleViewLNameChange = (e) => {
    const lName = e.target.value;
    setView((prev) => {
      return { ...prev, lName: _.capitalize(lName) };
    });
  };
  const handleViewProceed = (e) => {
    if (!view.confNum.length || !view.lName.length) {
      e.preventDefault();
      alert("Please fill in all the Details.");
    }
    Axios.get("https://stage.abgapiservices.com:443/cars/reservation/v1", {
      headers: {
        client_id: "12ba16b2baab4ce68571fcee599fcbf6",
        access_token: token,
      },
      params: {
        brand: "Avis",
        confirmation_number: view.confNum,
        last_name: view.lName,
      },
    })
      .then((res) => {
        console.log(res.data);
        setViewInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.status.errors[0].reason);
      });
  };

  // Update Reservation
  const handleUpdateClick = () => {
    setIsViewClicked(false);
    setIsUpdateClicked(!isUpdateClicked);
    setIsCancelClicked(false);
  };

  // Cancel Reservation
  const handleCancelClick = () => {
    setIsViewClicked(false);
    setIsUpdateClicked(false);
    setIsCancelClicked(!isCancelClicked);
  };
  const handleCancelConfChange = (e) => {
    const confNum = e.target.value;
    setCancel((prev) => {
      return { ...prev, confNum: confNum.toUpperCase() };
    });
  };
  const handleCancelLNameChange = (e) => {
    const lName = e.target.value;
    setCancel((prev) => {
      return { ...prev, lName: _.capitalize(lName) };
    });
  };
  console.log(cancel);
  const handleCancelProceed = (e) => {
    if (!cancel.confNum.length || !cancel.lName.length) {
      e.preventDefault();
      alert("Please fill in all the Details.");
    }
    Axios.put(
      "https://stage.abgapiservices.com:443/cars/reservation/v1",
      {
        product: {
          brand: "Avis",
        },
        reservation: {
          email_notification: true,
          confirmation: {
            number: cancel.confNum,
          },
        },
        passenger: {
          contact: {
            last_name: cancel.lName,
          },
        },
      },
      {
        headers: {
          client_id: "12ba16b2baab4ce68571fcee599fcbf6",
          access_token: token,
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setCancelInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.status.errors[0].reason);
      });
  };

  return (
    <div
      className="container"
      style={{ textAlign: "center", margin: "2rem auto" }}
    >
      <h2>We thank you for making a Reservation with us.</h2>
      <hr />
      <h3 style={{ margin: "2rem auto 0" }}>
        Click here to View your Reservation
      </h3>

      {isViewClicked ? (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <Input
            style={{ marginBottom: "1rem", marginTop: "2rem" }}
            addonBefore="Confirmation No."
            placeholder="09369988GB2"
            onChange={handleViewConfChange}
            value={view.confNum}
          />
          <Input
            style={{ marginBottom: "1rem" }}
            addonBefore="Last Name"
            placeholder="As in the Reservation"
            onChange={handleViewLNameChange}
            value={view.lName}
          />
          <button
            type="button"
            style={{ margin: "0 auto 2rem" }}
            className="btn btn-orange btn-lg"
            onClick={handleViewProceed}
          >
            Proceed
          </button>
        </div>
      ) : (
        <button
          type="button"
          style={{ margin: "2rem auto" }}
          className="btn btn-orange btn-lg"
          onClick={handleViewClick}
        >
          View Reservation
        </button>
      )}
      <hr />
      <h3 style={{ margin: "2rem auto 0" }}>...to Update your Reservation</h3>
      <button
        type="button"
        style={{ margin: "2rem auto" }}
        className="btn btn-orange btn-lg"
        onClick={handleUpdateClick}
      >
        Update Reservation
      </button>
      <hr />
      {!cancelInfo.status ? (
        <h3 style={{ margin: "2rem auto 0" }}>
          ...and to Cancel your Reservation
        </h3>
      ) : null}

      {cancelInfo.status ? (
        <h3>
          Your Reservation was Successfully Cancelled.
          <br />
          We'll look forward to serving you again!
        </h3>
      ) : isCancelClicked ? (
        <div style={{ width: "50%", margin: "0 auto" }}>
          <Input
            style={{ marginBottom: "1rem", marginTop: "2rem" }}
            addonBefore="Confirmation No."
            placeholder="09369988GB2"
            onChange={handleCancelConfChange}
            value={cancel.confNum}
          />
          <Input
            style={{ marginBottom: "1rem" }}
            addonBefore="Last Name"
            placeholder="As in the Reservation"
            onChange={handleCancelLNameChange}
            value={cancel.lName}
          />
          <button
            type="button"
            style={{ margin: "0 auto 2rem" }}
            className="btn btn-orange btn-lg"
            onClick={handleCancelProceed}
          >
            Proceed
          </button>
        </div>
      ) : (
        <button
          type="button"
          style={{ margin: "2rem auto" }}
          className="btn btn-orange btn-lg"
          onClick={handleCancelClick}
        >
          Cancel Reservation
        </button>
      )}
    </div>
  );
}

export default OldReservation;
