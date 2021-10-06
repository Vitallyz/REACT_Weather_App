import React from "react";
import Header from "./Header";
import Hourly from "./Hourly";
import Minutely from "./Minutely";

export default function Current() {
  return (
    <div style={{ backgroundColor: "red" }}>
      <div>This is CURRENT WEATHER PAGE right here</div>
      <Header />
      <Hourly />
      <Minutely />
    </div>
  );
}
