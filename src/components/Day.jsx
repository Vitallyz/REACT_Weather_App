import React from "react";

export default function Day ({ dayWeather, settings }) {
    // console.log("Day weather: ", dayWeather)
    const UTCTime = new Date(dayWeather.dt*1000);
    // console.log("Current day is: ", UTCTime.toDateString().split(" ")[0])

    return (
        <>
        <br/>
        <p style={{textAlign: "center"}}><strong>{UTCTime.toDateString().split(" ")[0]}</strong></p>
            <img
                style={{ marginTop: "-10px", width: "70px" }}
                alt={dayWeather.weather[0].description + " icon"}
                src={`http://openweathermap.org/img/wn/${dayWeather.weather[0].icon}@2x.png`}
              />
              <p><small><span>{dayWeather.temp.day.toFixed(0)}{settings.temp}</span> <span style={{color: "gray"}}>{dayWeather.temp.night.toFixed(0)}{settings.temp}</span></small></p>
        </>
    )
}