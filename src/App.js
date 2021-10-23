import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
// import "./App.css";
import { Link, Route } from "react-router-dom";

import Current from "./components/Current";
import Settings from "./components/settings";

import EightDaysForecast from "./components/EightDaysForecast";

const APIKey = "4c7de2a60072a31c247adb245b9a407c";



function App() {
  const [UIDisable, setUIDisable] = useState(true);

  const [weatherData, setWeatherData] = useState({});

  const [settings, setSettings] = useState({});

  useEffect(() => {
    // grab settings from server and weather data from weather API
    fetch("http://localhost:3009/settings")
      .then((response) => response.json())
      .then((settings) => {

        setSettings(prevSttings => ({ ...prevSttings, ...settings }));

        // initializing settings state based on what received from mock server
        setSettingsTo(settings.units);

        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${settings.lat}&lon=${settings.long}&units=${settings.units}&exclude=none&appid=${APIKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUIDisable(false);
            setWeatherData(data);
          })
      })
      .catch((e) =>
        console.log("Error happend when getting Settings or Weather Data from mock server: ", e)
      );
  }, [settings.units, settings.lat]);

  function setSettingsTo(unitsType) {
    if (unitsType === "metric") {
      setSettings(prevState => ({
        ...prevState,
        units: "metric",
        speed: "km/h",
        speedFactor: 3.6,
        temp: "°C",

      }));
    }

    if (unitsType === "imperial") {
      setSettings(prevState => ({
        ...prevState,
        units: "imperial",
        speed: "miles/h",
        speedFactor: 1,
        temp: "°F",
      }));
    }
  }

  function unitsServerUpdate(units) {
    let newData = {};
    newData = {
      ...settings,
      units: units,
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    };

    fetch("http://localhost:3009/settings", configObj)
      .then(response => response.json())
      .then(data => {
        setSettingsTo(data.units);
        // console.log("Server Response from update:", data)
      })
      .catch(e => console.log("Error happened when sending data to server: ", e));
  }


  function handleSettingsUnitToggle() {
    setUIDisable(true);
    if (settings.units === "metric") {
      unitsServerUpdate("imperial");
    } else
      unitsServerUpdate("metric");
  }

  function locationServerUpdate(name, lat, long) {
    let newData = {};
    newData = {
      ...settings,
      locationName: name,
      lat: lat,
      long: long,
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newData),
    };

    fetch("http://localhost:3009/settings", configObj)
      .then(response => response.json())
      .then(data => {

        setSettings(prevSettings => ({ ...prevSettings, ...data }))

      })
      .catch(e => console.log("Error happened when sending data to server: ", e));
  }

  function handleLocationUpdate(event) {
    const name = event.target[0].value;
    const lat = event.target[1].value;
    const long = event.target[2].value
    locationServerUpdate(name, lat, long);

  }

  return (
    <>
      <Navbar className="justify-content-center" bg="light" variant="light" >
        <Navbar.Brand as={Link} to="/">
          My Weather App
        </Navbar.Brand>
        <Nav variant="light" defaultActiveKey="/">
          <Nav.Item>
            <Nav.Link href="/" as={Link} to="/">
              Current
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="forecast" as={Link} to="/EightDaysForecast">
              8 Days Forecast
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="settings" as={Link} to="Settings">
              Settings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="about" as={Link} to="About">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>


      <Route exact path="/">
        <Current className="justify-content-center" weatherData={weatherData} settings={settings} />
      </Route>
      <Route path="/EightDaysForecast">
        <EightDaysForecast weatherData={weatherData} settings={settings} />
      </Route>

      <Route path="/settings">
        <Settings settings={settings} UIDisable={UIDisable} handleClick={handleSettingsUnitToggle} handleLocationUpdate={handleLocationUpdate} />

      </Route>

    </>
  );
}

export default App;
