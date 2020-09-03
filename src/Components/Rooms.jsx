import React, { useState, useEffect } from "react";
import { InputNumber, Input, Slider } from "antd";
import { useLocation, Link, useHistory } from "react-router-dom";
import Axios from "axios";

function Rooms(props) {
  const location = useLocation();
  const history = useHistory();

  const [rooms, setRooms] = useState(1);
  const [room1, setRoom1] = useState({
    type: "Room-1",
    adults: 1,
    children: 0,
    children_ages: [],
  });
  const [room2, setRoom2] = useState({
    type: "Room-2",
    adults: 1,
    children: 0,
    children_ages: [],
  });
  const [room3, setRoom3] = useState({
    type: "Room-3",
    adults: 1,
    children: 0,
    children_ages: [],
  });
  const [room4, setRoom4] = useState({
    type: "Room-4",
    adults: 1,
    children: 0,
    children_ages: [],
  });
  const [roomDetails, setRoomDetails] = useState([]);

  // useEffect(() => {
  //   console.log(location.state);
  // }, []);

  const addRoom = () => {
    if (rooms < 4) {
      setRooms(rooms + 1);
    }
  };

  const removeRoom = () => {
    if (rooms > 1) {
      setRooms(rooms - 1);
    }
    rooms === 4
      ? setRoom4({
          type: "Room-4",
          adults: 1,
          children: 0,
          children_ages: [],
        })
      : rooms === 3
      ? setRoom3({
          type: "Room-3",
          adults: 1,
          children: 0,
          children_ages: [],
        })
      : rooms === 2
      ? setRoom2({
          type: "Room-2",
          adults: 1,
          children: 0,
          children_ages: [],
        })
      : setRoom1({
          type: "Room-1",
          adults: 1,
          children: 0,
          children_ages: [],
        });
  };

  const handleRoom1AdultsChange = (value) => {
    setRoom1((prev) => {
      return { ...prev, adults: value };
    });
  };
  const handleRoom1ChildrenChange = (value) => {
    setRoom1((prev) => {
      return value === 1
        ? {
            ...prev,
            children: value,
            children_ages: [7],
          }
        : value === 2
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7],
          }
        : value === 3
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7, 7],
          }
        : {
            ...prev,
            children: 0,
            children_ages: [],
          };
    });
  };
  // console.log(room1);

  const handleRoom2AdultsChange = (value) => {
    setRoom2((prev) => {
      return { ...prev, adults: value };
    });
  };
  const handleRoom2ChildrenChange = (value) => {
    setRoom2((prev) => {
      return value === 1
        ? {
            ...prev,
            children: value,
            children_ages: [7],
          }
        : value === 2
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7],
          }
        : value === 3
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7, 7],
          }
        : {
            ...prev,
            children: 0,
            children_ages: [],
          };
    });
  };
  // console.log(room2);

  const handleRoom3AdultsChange = (value) => {
    setRoom3((prev) => {
      return { ...prev, adults: value };
    });
  };
  const handleRoom3ChildrenChange = (value) => {
    setRoom3((prev) => {
      return value === 1
        ? {
            ...prev,
            children: value,
            children_ages: [7],
          }
        : value === 2
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7],
          }
        : value === 3
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7, 7],
          }
        : {
            ...prev,
            children: 0,
            children_ages: [],
          };
    });
  };
  // console.log(room3);

  const handleRoom4AdultsChange = (value) => {
    setRoom4((prev) => {
      return { ...prev, adults: value };
    });
  };
  const handleRoom4ChildrenChange = (value) => {
    setRoom4((prev) => {
      return value === 1
        ? {
            ...prev,
            children: value,
            children_ages: [7],
          }
        : value === 2
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7],
          }
        : value === 3
        ? {
            ...prev,
            children: value,
            children_ages: [7, 7, 7],
          }
        : {
            ...prev,
            children: 0,
            children_ages: [],
          };
    });
  };
  // console.log(room4);

  const handleSearch = (e) => {
    Axios.post(
      "https://api.dev.trawish.com/v1/services/hotels",
      {
        arrival_date: location.state.checkInDate,
        departure_date: location.state.checkOutDate,
        country_code: location.state.selectedCity.country_code,
        city: location.state.selectedCity.city_code,
        guest_nationality: "IN",
        hotel_ratings: [1, 2, 3, 4, 5],
        rooms:
          rooms === 1
            ? [room1]
            : rooms === 2
            ? [room1, room2]
            : rooms === 3
            ? [room1, room2, room3]
            : [room1, room2, room3, room4],
      },
      {
        headers: {
          Authorization: "Bearer " + location.state.token,
        },
      }
    )
      .then((resp) => {
        history.push("/hotels", resp.data.hotels);
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          alert(err.response.data.error);
        }
      });
  };

  return (
    <div className="top-area show-onload">
      <div
        className="container"
        style={{
          border: "thick solid #ed8323",
          padding: "1rem 2rem 2rem",
          margin: "3rem auto",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "1rem" }}>Room details</h1>
          <button
            className="btn btn-org btn-sm"
            style={{ marginRight: "1rem", width: "10rem" }}
            onClick={addRoom}
          >
            Add Room
          </button>
          <button
            className="btn btn-org btn-sm"
            style={{ marginLeft: "1rem", width: "10rem" }}
            onClick={removeRoom}
          >
            Remove Room
          </button>
        </div>
        {rooms === 1 ? (
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 1</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom1AdultsChange}
                value={room1.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom1ChildrenChange}
                value={room1.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room1.children === 2 || room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-4"></div>
          </div>
        ) : rooms === 2 ? (
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 1</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom1AdultsChange}
                value={room1.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom1ChildrenChange}
                value={room1.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room1.children === 2 || room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 2</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom2AdultsChange}
                value={room2.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom2ChildrenChange}
                value={room2.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room2.children === 2 || room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-3"></div>
          </div>
        ) : rooms === 3 ? (
          <div className="row">
            <div className="col-md-4">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 1</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom1AdultsChange}
                value={room1.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom1ChildrenChange}
                value={room1.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room1.children === 2 || room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-4">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 2</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom2AdultsChange}
                value={room2.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom2ChildrenChange}
                value={room2.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room2.children === 2 || room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-4">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 3</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom3AdultsChange}
                value={room3.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom3ChildrenChange}
                value={room3.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room3.children === 2 || room3.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room3.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 1</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom1AdultsChange}
                value={room1.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom1ChildrenChange}
                value={room1.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room1.children === 2 || room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room1.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 2</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom2AdultsChange}
                value={room2.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom2ChildrenChange}
                value={room2.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room2.children === 2 || room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room2.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 3</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom3AdultsChange}
                value={room3.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom3ChildrenChange}
                value={room3.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room3.children === 2 || room3.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room3.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
            <div className="col-md-3">
              <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Room 4</h3>
              <h6>Adults</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={1}
                max={3}
                defaultValue={1}
                onChange={handleRoom4AdultsChange}
                value={room4.adults}
              />
              <h6 style={{ marginTop: "1rem" }}>Children</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={0}
                max={3}
                defaultValue={0}
                onChange={handleRoom4ChildrenChange}
                value={room4.children}
              />
              <h6 style={{ marginTop: "1rem" }}>Children Ages</h6>{" "}
              <InputNumber
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                style={{ width: "100%" }}
                size="small"
                min={2}
                max={12}
                defaultValue={7}
                value={room1.children_ages[0]}
              />
              {room4.children === 2 || room4.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
              {room4.children === 3 ? (
                <InputNumber
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  style={{ width: "100%", marginTop: "0.5rem" }}
                  size="small"
                  min={2}
                  max={12}
                  defaultValue={7}
                  value={room1.children_ages[0]}
                />
              ) : null}
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Link
              to={{
                pathname: "/hotels",
              }}
            >
              <button
                type="button"
                onClick={handleSearch}
                className="btn btn-orange btn-lg"
                style={{ margin: "2rem auto 0", width: "100%" }}
              >
                Search for Hotels
              </button>
            </Link>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
