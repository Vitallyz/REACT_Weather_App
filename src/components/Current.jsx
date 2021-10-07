import React from "react";
import Header from "./Header";
import Hourly from "./Hourly";
import Minutely from "./Minutely";

export default function Current({ weatherData }) {
  if (weatherData.current) {
    return (
      <div style={{ width: "700px", color: "#48484A", marginTop: "10px"}}>
        {/* <div>This is CURRENT WEATHER PAGE right here</div>
        <p title="wind (gust) km/h">
          <small>
            Wind: {(weatherData.wind_speed * 3.6).toFixed(0)} (
            {(weatherData.wind_gust * 3.6).toFixed(0)})
          </small>
        </p> */}
        <Header weatherData={weatherData} />
        <Minutely />
        <Hourly />
        
      </div>
    );
  } else return <div> LOADING DATA </div>;
}
