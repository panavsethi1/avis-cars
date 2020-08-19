import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Axios from "axios";
import HtmlToText from "html-to-text";

function TermsAndConditions() {
  const location = useLocation();
  const [tAndC, setTAndC] = useState([]);

  useEffect(() => {
    Axios.get(
      `https://stage.abgapiservices.com/terms/v1/location/Avis/${location.state.reservationInfo.country_code}/${location.state.reservationInfo.pickup_location}/en`,
      {
        headers: {
          client_id: "12ba16b2baab4ce68571fcee599fcbf6",
          Authorization: `Bearer ${location.state.reservationInfo.token}`,
        },
      }
    ).then((resp) => {
      setTAndC(resp.data.terms);
    });
  }, []);

  const onCheck = (e) => {
    document.getElementById(e.target.id).checked
      ? (document.getElementById("checkout").disabled = false)
      : (document.getElementById("checkout").disabled = true);
  };

  const htmlToText = (x) => {
    return HtmlToText.fromString(x, {
      ignoreHref: true,
      ignoreImage: true,
    })
  }

  return (
    <div className="container" style={{ textAlign: "center", margin: "2rem auto", padding: "2rem" ,border: "thick solid #ed8323", borderRadius:"10px"}}>
    <h1>Terms & Conditions</h1>
      {tAndC.map((term, index) => {
        return (
          <div key={index + 1}>
            <h4>{term.header}</h4>
            <p>{htmlToText(term.content).substring(0, htmlToText(term.content).length - 4)}</p>
          </div>
        );
      })}
      <p style={{ paddingBottom: "0", marginBottom: "0", marginTop: "1rem" }}>
        <input onChange={onCheck} id="terms" type="checkbox"></input> "I agree
        to the terms and conditions. Let's proceed to checkout."
      </p>
      <Link to={{
        pathname: `/results/${location.state.car.category.name}/checkout`,
        state: {info: location.state}
      }}>
        <button
          type="button"
          id="checkout"
          className="btn btn-orange btn-lg btn-checkout"
          disabled
        >
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default TermsAndConditions;
