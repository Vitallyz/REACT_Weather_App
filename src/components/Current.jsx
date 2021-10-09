import React from "react";
import { Spinner } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import Header from "./Header";
import Hourly from "./Hourly";
import Minutely from "./Minutely";

export default function Current({ weatherData, settings }) {
  if (weatherData.current) {
    return (
      <div style={{ color: "#48484A", marginTop: "20px", marginLeft: "-50px"}} >
        {/* <div>This is CURRENT WEATHER PAGE right here</div>
        <p title="wind (gust) km/h">
          <small>
            Wind: {(weatherData.wind_speed * 3.6).toFixed(0)} (
            {(weatherData.wind_gust * 3.6).toFixed(0)})
          </small>
        </p> */}
        <Header className="justify-content-center" weatherData={weatherData} settings={settings} />
        {/* <Minutely />
        <Hourly />
         */}
      </div>
    );
  } else return <div className="centered"><Spinner animation="border" variant="dark" size="lg" /></div>;
}
