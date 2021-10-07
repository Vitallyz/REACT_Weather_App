import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
// import "./App.css";
import { Link, Route } from "react-router-dom";

import Current from "./components/Current";

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

const Products = () => {
  return (
    <div>
      <h2>Products Page</h2>
      <Route exact path="/products/subproduct">
        <SubProducts />
      </Route>
    </div>
  );
};

const SubProducts = () => {
  return (
    <div>
      <h2>Sub Products</h2>
    </div>
  );
};

function App() {
  const [weatherData, setWeatherData] = useState({});
  console.log("WeatherData when declared", weatherData);

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







    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cord.lat}&lon=${cord.lon}&units=metric&exclude=none&appid=${APIKey}`
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
  }, []);

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
              <Nav.Link as={Link} to="/settings">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route exact path="/">
        <Current weatherData={weatherData} />
      </Route>
      <Route path="/category">
        <Category />
      </Route>
      <Route path="/products">
        <Products />
      </Route>
    </>
  );
}

export default App;
