import React from "react";
import Location from "./Location";
import { Spinner } from "react-bootstrap";



export default function Locations({ locations }) {

    // console.log("Locations prop in Locations component: ", locations)
    // console.log("Location [0] from locations var: ", locations[0])
    // console.log("Locations length: ", locations.length);

    function renderMultipleLocations() {
        locations.map(item => {
            console.log("Creating location number: ", item.id);
            return (

                <Location location={item} />
            )
        })
    }

    if (locations.length > 0) {
        

     

        return locations.map((item, index) => (<Location location={item} key={index} />))
        // return null;



    } else return <div className="centered"><Spinner animation="border" variant="dark" size="lg" key={"1"} /></div>;


}