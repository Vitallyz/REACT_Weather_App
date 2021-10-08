import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
// import "./App.css";
import { Link, Route } from "react-router-dom";

import Current from "./components/Current";
import Settings from "./components/settings";

const APIKey = "4c7de2a60072a31c247adb245b9a407c";

// const Home = () => {
//   return (
//     <div>
//       <h1>Home Page</h1>
//     </div>
//   );
// };

const Category = () => {
  return (
    <div>
      <h2>Category Page</h2>
    </div>
  );
};



function App() {
  const [weatherData, setWeatherData] = useState({});
  console.log("WeatherData when declared", weatherData);

  // units setting state initialize + set default
  const [ settings, setSettings] = useState({
    units: "metric",
    speed: "km/h",
    speedFactor: 3.6,
    temp: "°C"
  })

// example of imperial units:
// const [ units, setUnits] = useState({
//   type: "imperial",
//   speed: "miles/h",
//   speedFactor: 1,
//   temp: "°F"
// })

  useEffect(() => {
    
    
    // const cityName = "Melbourne";

    // melbourne
    const cord = {
      lat: -37.813999,
      lon: 144.963318,
    };

    // jerusalem
    // const cord = {
    //   lat: 31.0461,
    //   lon: 34.8516,
    // };

    // adelaide
    // const cord = {
    //   lat: -34.905168,
    //   lon: 138.558693,
    // };

    // perth
    // const cord = {
    //   lat: -32.053001,
    //   lon: 115.872271,
    // };

    // new york
    // const cord = {
    //   lat: 40.695157,
    //   lon: -73.943979,
    // };

    // toronto
    // const cord = {
    //   lat: 43.778908,
    //   lon:-79.746223,
    // };

    // london
    // const cord = {
    //   lat: 51.462597,
    //   lon: -0.096517,
    // };

    //indonesia
    // const cord = {
    //   lat: -1.878772,
    //   lon: 102.930753,
    // };


    // grab settings from server

    fetch("http://localhost:3009/settings")
      .then(response => response.json())
      .then(data => {
        console.log("Settings data that we got from server", data)
        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${cord.lat}&lon=${cord.lon}&units=${settings.units}&exclude=none&appid=${APIKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Data from API: ", data);
            // const [ weatherData, setWeatherData] = useState(data);
            setWeatherData(data);
      
            let returnedTime = new Date(data.current.dt * 1000);
            console.log(
              "Data received time stamp UTC: ",
              returnedTime.toUTCString()
            );
            console.log(
              "Data received time stamp Local: ",
              returnedTime.toString()
            );
          })
      
          .catch((e) => console.log("Error happened!!!", e));
    })
      .catch(e => console.log("Error happend when getting settings from server: ", e));



      
    
  }, [settings]);

  function handleSettingsUnitToggle() {
    if (settings.units === "metric") {
      setSettings({
        units: "imperial",
        speed: "miles/h",
        speedFactor: 1,
        temp: "°F",
      });
    } else
      setSettings({
        units: "metric",
        speed: "km/h",
        speedFactor: 3.6,
        temp: "°C",
      });
  }

  return (
    <>
      <Navbar bg="light" expand="sm">
        <Container className="">
          <Navbar.Brand as={Link} to="/">
            My Weather App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Current
              </Nav.Link>
              <Nav.Link as={Link} to="/8-days-forecast">
                8 Days Forecast
              </Nav.Link>
              <Nav.Link as={Link} to="/settings">
                Settings
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route exact path="/">
        <Current weatherData={weatherData} settings={settings} />
      </Route>
      <Route path="/category">
        <Category />
      </Route>
      <Route path="/settings">
        <Settings settings={settings} handleClick={handleSettingsUnitToggle} />
      </Route>
    </>
  );
}

export default App;
