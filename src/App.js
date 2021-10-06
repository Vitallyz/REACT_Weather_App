import React, { useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
// import "./App.css";
import { Link, Route } from "react-router-dom";

import Current from "./components/Current";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

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
      <Route exact path="/products/subproduct"><SubProducts /></Route>
    </div>
  );
};

const SubProducts = () => {
  return (
    <div><h2>Sub Products</h2></div> 
  )
}

const APIKey = "4c7de2a60072a31c247adb245b9a407c";

function App() {
  useEffect(() => {
    const cityName = "Melbourne";
    const cord = {
      lat: -37.813999,
      lon: 144.963318,
    };

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${cord.lat}&lon=${cord.lon}&units=metric&exclude=none&appid=${APIKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API: ", data);

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
          <Navbar.Brand as={Link} to="/">My Weather App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Current</Nav.Link>
              <Nav.Link as={Link} to="/8-days-forecast">8 Days Forecast</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
              <Nav.Link as={Link} to="/settings">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Route exact path="/">
        <Current />
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
