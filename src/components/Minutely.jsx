import React from "react";
import Minute from "./Minute";

export default function Minutely () {

    return (
        <div style={{ backgroundColor: "orange", display: 'flex',  justifyContent:'center',  alignItems:'center'}}>
            <div>Rain Forecust my minute for the next hour:</div>
            <Minute />
          
            
        </div>
    )
}