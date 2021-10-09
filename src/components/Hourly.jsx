import React from "react";
import Hour from "./Hour";

export default function Hourly() {
  return (
    <div style={{ backgroundColor: "green", display: 'flex',  justifyContent:'center',  alignItems:'center' }}>
      <div>Hourly Forecust for the next 48 hours:</div>
      <Hour />
  
    </div>
  );
}
