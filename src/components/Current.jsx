import React from "react";
import { Spinner } from "react-bootstrap";
import Header from "./Header";

export default function Current({ weatherData, settings }) {
  if (weatherData.current) {
    return (
      <div style={{ color: "#48484A", marginTop: "20px", marginLeft: "-50px"}} >
       
        <Header className="justify-content-center" weatherData={weatherData} settings={settings} />
       
      </div>
    );
  } else return <div className="centered"><Spinner animation="border" variant="dark" size="lg" /></div>;
}
