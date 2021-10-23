
import { Container } from "react-bootstrap";
import { Button, Spinner } from "react-bootstrap";

import LocationForm from "./LocationForm";

export default function Settings({ settings, handleClick, handleLocationUpdate, UIDisable }) {
  // console.log("Settings object in Settings comp: ", settings);

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
        ><br />
          <div>
            <Button size="sm" variant="info" onClick={handleClick} disabled={UIDisable}>
              Set units to {settings.units === "imperial" ? <strong>metric</strong> : <strong>imperial</strong>}
            </Button>
          </div><br />

          <div>
            <h6>App Settings:</h6>
            <p style={{ marginBottom: "-4px" }}>Units: <strong>{settings.units}</strong></p>
            <p style={{ marginBottom: "-4px" }}>Temperature: <strong>{settings.temp}</strong></p>
            <p style={{}}>Speed: <strong>{settings.speed}</strong></p>
          </div>
          <div>
            <h6>Deafult Location:</h6>
            {console.log("Settings object within Settings Component: ", settings)}
            <p style={{ marginBottom: "-4px" }}>{settings.locationName} (Lat: {settings.lat} Long: {settings.long})</p>
          </div> <br />
          <LocationForm disabled={UIDisable} handleLocationUpdate={handleLocationUpdate} />

          <div className="centered">  {UIDisable ? (<Spinner animation="border" variant="dark" size="lg" />) : ""} </div>

        </Container>
      </>
    );
  } else return <div className="centered"><Spinner animation="border" variant="dark" size="lg" /></div>;
}
