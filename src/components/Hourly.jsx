import React from "react";
import Hour from "./Hour";

export default function Hourly() {
  return (
    <div style={{ backgroundColor: "green", width: "800px" }}>
      <div>Hourly Forecust for the next 48 hours:</div>
      <Hour />
  
    </div>
  );
}
