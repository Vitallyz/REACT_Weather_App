import React from "react";
import { Row, Col } from "react-bootstrap";

import { Spinner } from "react-bootstrap";

import Day from "./Day";


export default function EightDaysForecast({ weatherData, settings }) {

    // console.log("EightDayWeather:", weatherData)

    if (weatherData.current) {
        return (
            <div style={{ color: "#48484A", marginTop: "40px", margin: "auto", width: "900px" }} >

                <Row style={{margin: "20px"}}>
                    {weatherData.daily.map((dayWeather, index) => {
                        return (
                            <Col key={index} style={{ margin: "5px", backgroundColor: "#F8F9FA", borderRadius: "5px" }}><Day className="justify-content-center" dayWeather={weatherData.daily[index]} settings={settings}  /></Col>
                        )
                    })}
                </Row>
            </div>
        );
    } else return <div className="centered"><Spinner animation="border" variant="dark" size="lg" /></div>;



}