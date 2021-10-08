import React from "react";


export default function Settings ({ settings, handleClick }) {

    console.log("Settings object in Settings comp: ", settings);


    if (settings) {
        return (
            <>
            <div>SETTINGS PAGE</div>
            <button onClick={handleClick}> Togle Units</button>
            <br />
            Current units: {settings.units}
            </>
        )
    } else return (
        <div>Loading...</div>
    )
    
}