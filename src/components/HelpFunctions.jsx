import React from "react";

export function getTimeAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

export function getUVIndexString(UVIndex) {

  switch (UVIndex) {
    case "0":
    case "1":
    case "2":
      return <span style={{ color: "#89C98E" }}>LOW</span>;
    case "3":
    case "4":
    case "5":
      return <span style={{ color: "#FBDD1C" }}>MODERATE</span>;
    case "6":
    case "7":
      return <span style={{ color: "#F19C1C", fontWeight: "normal" }}>HIGH</span>;
    case "8":
    case "9":
    case "10":
      return (
        <span style={{ color: "#E51416", fontWeight: "normal" }}>VERY HIGH</span>
      );
    default:
      return (
        <span style={{ color: "#D12F81", fontWeight: "normal" }}>EXTREME</span>
      );
  }
}

export function firstCharToUpperCase (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
