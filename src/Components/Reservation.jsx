import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

function Reservation() {
  const location = useLocation();
  console.log(location.state);

  useEffect(() => {
    const body = {
      product: {
        brand: "Avis",
      },
      transaction: {
        transaction_id: location.state.info.rates.transaction.transaction_id,
      },
      reservation: {
        pickup_date: location.state.info.reservationInfo.pickup_date,
        pickup_location: location.state.info.reservationInfo.pickup_location,
        dropoff_date: location.state.info.reservationInfo.dropoff_date,
        dropoff_location:
          location.state.info.reservationInfo.dropoff_location,
        vehicle_class_code:
          location.state.info.car.category.vehicle_class_code,
      },
      rate_totals: {
        rate: {
          currency:
            location.state.info.rates.reservation.rate_totals.rate.currency,
          rate_code:
            location.state.info.rates.reservation.rate_totals.rate.rate_code,
          days: location.state.info.rates.reservation.rate_totals.rate.days,
          amount:
            location.state.info.rates.reservation.rate_totals.rate.amount,
          taxes_fees: {
            ...location.state.info.rates.reservation.rate_totals.rate
              .taxes_fees,
          },
        },
        totals: {
          reservation_total:
            location.state.info.rates.reservation.rate_totals.totals
              .reservation_total +
              location.state.info.car.rate_totals.rate.currency ===
            "USD"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.USD
              : location.state.info.car.rate_totals.rate.currency === "GBP"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.GBP
              : location.state.info.car.rate_totals.rate.currency === "EUR"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.EUR
              : location.state.info.car.rate_totals.rate.currency === "INR"
              ? location.state.info.extras_total
              : 0 + location.state.info.car.rate_totals.rate.currency ===
                "USD"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.USD
              : location.state.info.car.rate_totals.rate.currency === "GBP"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.GBP
              : location.state.info.car.rate_totals.rate.currency === "EUR"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.EUR
              : location.state.info.car.rate_totals.rate.currency === "INR"
              ? location.state.info.insurance_total
              : 0,
          taxes_fees_total:
            location.state.info.rates.reservation.rate_totals.totals
              .taxes_fees_total,
          vehicle_total:
            location.state.info.rates.reservation.rate_totals.totals
              .vehicle_total,
          extras_total:
            location.state.info.car.rate_totals.rate.currency === "USD"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.USD
              : location.state.info.car.rate_totals.rate.currency === "GBP"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.GBP
              : location.state.info.car.rate_totals.rate.currency === "EUR"
              ? location.state.info.extras_total *
                location.state.info.ex_rates.EUR
              : location.state.info.car.rate_totals.rate.currency === "INR"
              ? location.state.info.extras_total
              : 0,
          insurance_total:
            location.state.info.car.rate_totals.rate.currency === "USD"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.USD
              : location.state.info.car.rate_totals.rate.currency === "GBP"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.GBP
              : location.state.info.car.rate_totals.rate.currency === "EUR"
              ? location.state.info.insurance_total *
                location.state.info.ex_rates.EUR
              : location.state.info.car.rate_totals.rate.currency === "INR"
              ? location.state.info.insurance_total
              : 0,
        },
      },
      passenger: {
        contact: {
          first_name: location.state.user.fName,
          last_name: location.state.user.lName,
          email: location.state.user.email,
        },
      },
      insurance: [...location.state.info.user_insurance],
      extras: [...location.state.info.user_extras],
    }

    if (location.state.info) {
    Axios.post("https://stage.abgapiservices.com:443/cars/reservation/v1", body, {
      headers: {
        client_id: "12ba16b2baab4ce68571fcee599fcbf6",
        Authorization: "Bearer " + location.state.info.reservationInfo.token,
        "Content-Type": "application/json" 
      }
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, []);
  return (
    <div style={{textAlign: "center"}}>
      <h1>Reservation Details</h1>
    </div>
  );
}

export default Reservation;
