import React, { useState, useEffect } from "react";
import { Input } from "antd";
import _ from "lodash";
import Axios from "axios";
import parseISO from "date-fns/parseISO";

function OldReservation() {
  const [token, setToken] = useState("");
  const [exRates, setExRates] = useState({});

  const [isViewClicked, setIsViewClicked] = useState(false);
  const [isViewProceedClicked, setIsViewProceedClicked] = useState(false);

  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [isUpdateProceedClicked, setIsUpdateProceedClicked] = useState(false);

  const [isCancelClicked, setIsCancelClicked] = useState(false);

  const [view, setView] = useState({ confNum: "", lName: "" });
  const [viewInfo, setViewInfo] = useState({});
  const [viewError, setViewError] = useState(false);

  const [update, setUpdate] = useState({ confNum: "", lName: "" });
  const [updateInfo, setUpdateInfo] = useState({});
  const [updateError, setUpdateError] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({});
  const [updatedError, setUpdatedError] = useState(false);

  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    DOB: "",
    telephone: "",
    address: "",
  });

  const [cancel, setCancel] = useState({ confNum: "", lName: "" });
  const [cancelInfo, setCancelInfo] = useState({});

  useEffect(() => {
    // exRates fetch
    Axios.get("https://api.exchangeratesapi.io/latest?base=INR").then((resp) =>
      setExRates(resp.data.rates)
    );
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

  // exchange function
  const exchange = (x) => {
    return viewInfo.reservation.rate_totals.rate.currency === "USD"
      ? ((1 / exRates.USD) * x).toFixed(0)
      : viewInfo.reservation.rate_totals.rate.currency === "GBP"
      ? ((1 / exRates.GBP) * x).toFixed(0)
      : viewInfo.reservation.rate_totals.rate.currency === "EUR"
      ? ((1 / exRates.EUR) * x).toFixed(0)
      : x;
  };

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
    setIsViewProceedClicked(true);
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
        setViewError(true);
        alert(err.response.data.status.errors[0].details);
      });
  };

  // Update Reservation
  const handleUpdateClick = () => {
    setIsViewClicked(false);
    setIsUpdateClicked(!isUpdateClicked);
    setIsCancelClicked(false);
  };
  const handleUpdateConfChange = (e) => {
    const confNum = e.target.value;
    setUpdate((prev) => {
      return { ...prev, confNum: confNum.toUpperCase() };
    });
  };
  const handleUpdateLNameChange = (e) => {
    const lName = e.target.value;
    setUpdate((prev) => {
      return { ...prev, lName: _.capitalize(lName) };
    });
  };
  const handleUpdateProceed = (e) => {
    if (!update.confNum.length || !update.lName.length) {
      e.preventDefault();
      alert("Please fill in all the Details.");
    }
    setIsUpdateProceedClicked(true);
    Axios.get("https://stage.abgapiservices.com:443/cars/reservation/v1", {
      headers: {
        client_id: "12ba16b2baab4ce68571fcee599fcbf6",
        access_token: token,
      },
      params: {
        brand: "Avis",
        confirmation_number: update.confNum,
        last_name: update.lName,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUpdateInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUpdateError(true);
        alert(err.response.data.status.errors[0].details);
      });
  };

  // User details to be updated
  const handleFNameChange = (e) => {
    const fName = e.target.value;
    setUser((prev) => {
      return { ...prev, fName: _.capitalize(fName) };
    });
  };

  const handleLNameChange = (e) => {
    const lName = e.target.value;
    setUser((prev) => {
      return { ...prev, lName: _.capitalize(lName) };
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

  const handleUpdateDetails = () => {
    Axios.patch(
      "https://stage.abgapiservices.com:443/cars/reservation/v1",
      {
        product: {
          brand: "Avis",
        },
        reservation: {
          email_notification: true,
          pickup_date: updateInfo.reservation.confirmation.pickup_date,
          pickup_location: updateInfo.reservation.pickup_location.location.code,
          dropoff_date: updateInfo.reservation.confirmation.dropoff_date,
          dropoff_location:
            updateInfo.reservation.dropoff_location.location.code,
          vehicle_class_code:
            updateInfo.reservation.vehicle.category.vehicle_class_code,
          confirmation: {
            number: update.confNum,
          },
        },
        rate_totals: {
          rate: {
            rate_code: updateInfo.reservation.rate_totals.rate.rate_code,
            country_code:
              updateInfo.reservation.pickup_location.address.country_code,
          },
        },
        passenger: {
          contact: {
            first_name:
              user.fName || updateInfo.reservation.passenger.contact.first_name,
            last_name:
              user.lName || updateInfo.reservation.passenger.contact.last_name,
            email: user.email || updateInfo.reservation.passenger.contact.email,
          },
        },
        insurance: updateInfo.reservation.insurance,
        extras: updateInfo.reservation.extras,
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
        setUpdatedInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUpdatedError(true);
        alert(err.response.data.status.errors[0].details);
      });
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
  // console.log(cancel);
  const handleCancelProceed = (e) => {
    if (!cancel.confNum.length || !cancel.lName.length) {
      alert("Please fill in all the Details.");
    } else {
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
    }
  };

  return (
    <div
      className="container"
      style={{ textAlign: "center", margin: "2rem auto" }}
    >
      <h2>We thank you for making a Reservation with us.</h2>
      <hr />
      {!isViewProceedClicked || viewError ? (
        <div>
          {" "}
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
          )}{" "}
        </div>
      ) : !viewInfo.reservation && !viewError ? (
        <h3 style={{ margin: "2rem auto" }}>Loading...</h3>
      ) : null}
      {isViewProceedClicked && viewInfo.reservation ? (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ margin: "1rem 0 0.35rem" }}>Reservation Details</h3>
          <h5 style={{ marginBottom: "1.75rem" }}>
            Thank you,{" "}
            <span style={{ color: "#ed8323" }}>
              {viewInfo.reservation.passenger.contact.first_name}{" "}
              {viewInfo.reservation.passenger.contact.last_name}
            </span>
            , for making a Reservation with us.
          </h5>
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
                {viewInfo.reservation.confirmation.number}
              </span>
            </h3>
            <hr />
            <h3 style={{ marginTop: "2rem" }}>
              {viewInfo.reservation.vehicle.category.make}{" "}
              {viewInfo.reservation.vehicle.category.model}
            </h3>
            <img
              style={{ width: "40%" }}
              src={viewInfo.reservation.vehicle.category.image_url}
              alt={viewInfo.reservation.vehicle.category.name}
            ></img>
            <h5>
              Pickup Location:{" "}
              <span style={{ color: "#ed8323" }}>
                {viewInfo.reservation.pickup_location.location.name},{" "}
                {viewInfo.reservation.pickup_location.address.city}
              </span>
            </h5>
            <h5>
              Dropoff Location:{" "}
              <span style={{ color: "#ed8323" }}>
                {viewInfo.reservation.dropoff_location.location.name},{" "}
                {viewInfo.reservation.dropoff_location.address.city}
              </span>
            </h5>
            <h5>
              Pickup Date:{" "}
              <span style={{ color: "#ed8323" }}>
                {String(
                  parseISO(viewInfo.reservation.confirmation.pickup_date)
                ).substring(0, 24)}
              </span>
            </h5>
            <h5 style={{ marginBottom: "2rem" }}>
              Dropoff Date:{" "}
              <span style={{ color: "#ed8323" }}>
                {String(
                  parseISO(viewInfo.reservation.confirmation.dropoff_date)
                ).substring(0, 24)}
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
                        viewInfo.reservation.rate_totals.totals.vehicle_total
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
                        viewInfo.reservation.rate_totals.totals.extras_total
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
                        viewInfo.reservation.rate_totals.totals.insurance_total
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
                        viewInfo.reservation.rate_totals.totals.taxes_fees_total
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
                        viewInfo.reservation.rate_totals.totals
                          .reservation_total
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
      ) : null}
      <hr />
      {!isUpdateProceedClicked || !updateInfo.reservation ? (
        <div>
          <h3 style={{ margin: "2rem auto 0" }}>
            ...to Update your Reservation
          </h3>
          {!isUpdateClicked ? (
            <button
              type="button"
              style={{ margin: "2rem auto" }}
              className="btn btn-orange btn-lg"
              onClick={handleUpdateClick}
            >
              Update Reservation
            </button>
          ) : (
            <div style={{ width: "50%", margin: "0 auto" }}>
              <Input
                style={{ marginBottom: "1rem", marginTop: "2rem" }}
                addonBefore="Confirmation No."
                placeholder="09369988GB2"
                onChange={handleUpdateConfChange}
                value={update.confNum}
              />
              <Input
                style={{ marginBottom: "1rem" }}
                addonBefore="Last Name"
                placeholder="As in the Reservation"
                onChange={handleUpdateLNameChange}
                value={update.lName}
              />
              <button
                type="button"
                style={{ margin: "0 auto 2rem" }}
                className="btn btn-orange btn-lg"
                onClick={handleUpdateProceed}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      ) : !updatedInfo.reservation || updatedError ? (
        <div>
          <h3>What do you want to update?</h3>
          <div style={{ width: "50%", margin: "2rem auto 0" }}>
            <form>
              <Input
                style={{ marginBottom: "1.5rem" }}
                addonBefore="First Name"
                autoComplete="false"
                suffix={<i className="fas fa-user"></i>}
                size="large"
                value={user.fName}
                onChange={handleFNameChange}
              />
              <Input
                style={{ marginBottom: "1.5rem" }}
                addonBefore="Last Name"
                autoComplete="false"
                suffix={<i className="fas fa-user"></i>}
                size="large"
                value={user.lName}
                onChange={handleLNameChange}
              />
              <Input
                style={{ marginBottom: "1.5rem" }}
                addonBefore="E-mail"
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
              <button
                type="button"
                style={{ margin: "2rem auto" }}
                className="btn btn-orange btn-lg"
                onClick={handleUpdateDetails}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h3 style={{ margin: "2rem auto" }}>
          Successfully Updated your Reservation.
          <br />
          For Details, check your email inbox.
        </h3>
      )}

      <hr />
      {!cancelInfo.status ? (
        <h3 style={{ margin: "2rem auto 0" }}>
          ...or to Cancel your Reservation
        </h3>
      ) : null}

      {cancelInfo.status ? (
        <h3 style={{ margin: "2rem auto" }}>
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
