import { Container, Row, Col } from "react-bootstrap";
import React from "react";

import { getTimeAMPM, getUVIndexString } from "./HelpFunctions";

export default function Header({ weatherData }) {
  console.log("weatherData: ", weatherData);

  if (weatherData.current) {
    const UTCTime = weatherData.current.dt;
    const timezoneOffset = weatherData.timezone_offset;
    const localTimezoneOffset = new Date().getTimezoneOffset();

    const localDate = new Date(
      (UTCTime + timezoneOffset + localTimezoneOffset * 60) * 1000
    );
    const sunrise = new Date(
      (weatherData.current.sunrise +
        timezoneOffset +
        localTimezoneOffset * 60) *
        1000
    );
    const sunset = new Date(
      (weatherData.current.sunset + timezoneOffset + localTimezoneOffset * 60) *
        1000
    );

    console.log("Current time is: ", localDate.toUTCString());

    //   test by changing the values:
    //   weatherData.current.uvi = 5;
    //   weatherData.current.wind_deg = 0;

    return (
      <div>
        <Container>
          <Row>
            <Col xs={3}>
              <img
                style={{ marginTop: "-20px", width: "150px" }}
                alt={weatherData.current.weather[0].description + " icon"}
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`} 
              />
            </Col>

            <Col xs={4}>
              <h2 style={{ marginBottom: "0px" }}>
                {weatherData.current.temp.toFixed(1)}°C{" "}
                <span title="Feels Like" style={{ color: "lightGray" }}>
                  {weatherData.current.feels_like.toFixed(1)}°C
                </span>
              </h2>
              <p style={{ marginBottom: "-6px" }}>
                <small style={{ marginBottom: "-5px" }}>
                  Precipitation: {(weatherData.hourly[0].pop * 100).toFixed(0)}%
                  {weatherData.hourly[0].rain
                    ? ", " + weatherData.hourly[0].rain.toFixed(1) + " mm"
                    : ""}
                </small>
              </p>
              <p style={{ marginBottom: "-6px" }}>
                <small>Humidity: {weatherData.current.humidity}%</small>
              </p>
              <p style={{ marginBottom: "-6px" }}>
                <small>
                  <span title="Wind Speed">
                    Wind: {(weatherData.current.wind_speed * 3.6).toFixed(0)}{" "}
                    km/h{" "}
                  </span>
                  <span title="Wind Gust">
                    {" "}
                    {weatherData.current.wind_gust
                      ? " (" +
                        (weatherData.current.wind_gust * 3.6).toFixed(0) +
                        " km/h)"
                      : ""}
                  </span>{" "}
                  
                    <i
                      title="Wind Direction"
                      style={{
                        transform: `rotate(${
                          weatherData.current.wind_deg - 90
                        }deg)`,
                      }}
                      className="far fa-arrow-alt-circle-right"
                    ></i>
                  
                </small>
              </p>
              <p style={{ marginBottom: "-6px" }}>
                <small>
                  UV Index: {weatherData.current.uvi.toFixed(0)}{" "}
                  {getUVIndexString(weatherData.current.uvi.toFixed(0))}
                </small>
              </p>
            </Col>
            <Col>
              <h4 style={{ textAlign: "right", marginBottom: "0px" }}>
                {weatherData.timezone.split("/")[1] +
                  ", " +
                  weatherData.timezone.split("/")[0]}
                {/* {console.log("Location: ", location)} */}
              </h4>
              <h6 style={{ textAlign: "right", marginBottom: "0px" }}>
                {localDate.toString().split(" ")[0] +
                  " " +
                  localDate.toString().split(" ")[1] +
                  " " +
                  localDate.toString().split(" ")[2]}
                , {getTimeAMPM(localDate)}
              </h6>
              <p style={{ textAlign: "right", marginBottom: "-5px" }}>
                <small>Sunrise: {getTimeAMPM(sunrise)}</small>
              </p>
              <p style={{ textAlign: "right", marginBottom: "-5px" }}>
                <small>Sunset: {getTimeAMPM(sunset)}</small>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else return <div>LOADING ...</div>;
}
