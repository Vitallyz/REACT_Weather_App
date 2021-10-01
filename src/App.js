import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';



const APIKey = "4c7de2a60072a31c247adb245b9a407c";


function App() {
 
 

  useEffect (() => {

    const cityName = "Melbourne";
    const cord = {
      lat: -37.813999,
      lon: 144.963318,
    }


    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cord.lat}&lon=${cord.lon}&units=metric&exclude=none&appid=${APIKey}`)
      .then(response => response.json())
      .then(data => {
        console.log("Data from API: ",data);

        let returnedTime = new Date(data.current.dt*1000);
        console.log("Data received time stamp UTC: ", returnedTime.toUTCString())
        console.log("Data received time stamp Local: ", returnedTime.toString())
        
      })
      
      .catch(e => console.log("Error happened!!!", e));



  }, []);
 
  
  
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
