import React from "react";

export default function Location({ location, key }) {

    return (
        <div>{location.name} {location.lat} {location.long} </div>
    )
}