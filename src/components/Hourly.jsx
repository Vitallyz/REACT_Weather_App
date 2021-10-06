import { width } from "dom-helpers";
import React from "react";
import Hour from "./Hour";

export default function Hourly () {

    return (
        <div style={{ backgroundColor: "green", width: "800px" }}>
            <div>This is HOURLY</div>
            <Hour />
            <Hour />
            <Hour />
            <Hour />
            <Hour />
            <Hour />
        </div>
    )
} 
