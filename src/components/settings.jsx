import React from "react";
import { Container } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";

export default function Settings({ settings, handleClick, UIDisable }) {
  console.log("Settings object in Settings comp: ", settings);

  if (settings.units) {
    return (
      <>
        <Container
          style={{
            width: "700px",
            display: "block",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         
          <br />
          <div>
            <h4>App Settings:</h4>
            <p style={{ marginBottom: "-4px" }}>Units: {settings.units}</p>
            <p style={{ marginBottom: "-4px" }}>Temperature: {settings.temp}</p>
            <p style={{}}>Speed: {settings.speed}</p>
          </div>

          <div>
            <Button size="sm" variant="info" onClick={handleClick} disabled={UIDisable}>
              Set units to {settings.units === "imperial" ? "metric" : "imperial"}
            </Button> 
          </div>
          <div className="centered">  {UIDisable ? (<Spinner animation="border" variant="dark" size="lg" />) : ""} </div>

        </Container>
      </>
    );
  } else return <div className="centered"> LOADING SETTINGS DATA </div>;;
}
