import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
// import "./App.css";
import { Link, Route } from "react-router-dom";

import Current from "./components/Current";
import Settings from "./components/settings";

import EightDaysForecast from "./components/EightDaysForecast";

const APIKey = "4c7de2a60072a31c247adb245b9a407c";


const serverCall = {
  settingsLoaded: false,
  weatherLoaded: false,
};

function App() {

  const [ UIDisable, setUIDisable] = useState(true);

  // const [ locations, setLocations ] = useState({});

  const [weatherData, setWeatherData] = useState({});
  // console.log("WeatherData when declared", weatherData);

  // console.log("Initializing Settings");
  // units setting state initialize + set default
  const [settings, setSettings] = useState({});

  // const [ newLocation, setNewLocation ] = useState({});



  // const [ serverData, setServerData ] = useState();

  function setSettingsTo (unitsType) {
    // console.log("Settings var before setSettingTo(units): ", settings)
    if (unitsType === "metric") {
      setSettings (prevState => ({
        ...prevState,
        units: "metric",
        speed: "km/h",
        speedFactor: 3.6,
        temp: "°C",
        
      }));
    }

    if (unitsType === "imperial") {
      setSettings (prevState => ({
        ...prevState,
        units: "imperial",
        speed: "miles/h",
        speedFactor: 1,
        temp: "°F",
      }));
    }
  }


  function fetchWeatherData(fetchData) {
    if(!serverCall.weatherLoaded){
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${fetchData.lat}&lon=${fetchData.long}&units=${fetchData.units}&exclude=none&appid=${APIKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          
          serverCall.weatherLoaded = true;
          setUIDisable(false);
  
          setWeatherData(data);
          console.log(`WEATHER from server (fetched with units ${fetchData.defaultUnits}): `, data);
        })
  
        .catch((e) => console.log("Error happened while getting Weather Data", e));  
    }
    
  }





  useEffect(() => {


    // grab settings from server
    // console.log("serverCall variable before fetch: ", serverCall)
    if (!serverCall.settingsLoaded) {
      fetch("http://localhost:3009/settings")
      .then((response) => response.json())
      .then((settings) => {
        // console.log("serverCall variable after fetch: ", serverCall)
        serverCall.settingsLoaded =  true;
        setSettings(settings);
        // console.log("serverCall variable after settingsLoaded updated to true : ", serverCall)
        console.log("SETTINGS from server: ", settings);
        setSettingsTo(settings.units);
        // console.log("serverCall variable after updated to fetched units settings: ", serverCall)
        // console.log("Will fetch from settings: ", settings);
        
          // console.log("Fettcing the weather data now, serverCall is: ", serverCall)
          fetchWeatherData(settings);
          // fetchLocations();
        
        
      })
      .catch((e) =>
        console.log("Error happend when getting Settings Data from mock server: ", e)
      );
    }
    
  }, [settings, weatherData]);


  function unitsServerUpdate(units) {
    let newData = {};
    // fetch current settings data
    fetch("http://localhost:3009/settings")
      .then((response) => response.json())
      .then((data) => {
        if (data.units === units) {
          //no need to update
          // console.log("Server is already set to use units: ", units);
          return null;
        } else {
          //lets toggle the default units:
          // console.log("Changing defaultUnits to:  ", units);
          newData = {
            ...data,
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
          // Sending new settings to the Settings Server
          // console.log("Sending new settings to the Server");
          fetch("http://localhost:3009/settings", configObj)
            .then(response => response.json())
            .then(data => {
              serverCall.settingsLoaded = false;
              serverCall.weatherLoaded = false;
              setSettingsTo(data.units);
              // console.log("Server Response from update:", data)
          })
            .catch(e => console.log("Error happened when sending data to server: ", e));
        }
      })
      .catch((e) => console.log("Error fetching settings: ", e));
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
    // fetch current settings data
    fetch("http://localhost:3009/settings")
      .then((response) => response.json())
      .then((data) => {
        
          //lets create new data with updated location info
          // console.log("Changing defaultUnits to:  ", units);
          newData = {
            ...data,
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
          // Sending new settings to the Settings Server
          // console.log("Sending new settings to the Server");
          fetch("http://localhost:3009/settings", configObj)
            .then(response => response.json())
            .then(data => {
              serverCall.settingsLoaded = false;
              serverCall.weatherLoaded = false;
              setSettingsTo(data.units);
              // console.log("Server Response from update:", data)
          })
            .catch(e => console.log("Error happened when sending data to server: ", e));
        
      })
      .catch((e) => console.log("Error fetching settings: ", e));
  }

  function handleLocationUpdate (event) {
    const name = event.target[0].value;
    const lat = event.target[1].value;
    const long =event.target[2].value
    locationServerUpdate(name, lat, long);
    
    
  }

  return (
    <>
      <Navbar className="justify-content-center" bg="light" variant="light" >
          <Navbar.Brand as={Link} to="/">
            My Weather App
          </Navbar.Brand>
            <Nav  variant="light" defaultActiveKey="/">
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
