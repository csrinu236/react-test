import { useEffect, useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';

function App() {
  const [value, setValue] = useState({});
  console.log({ window });
  const protocol = window.location.protocol;
  const href = window.location.href;
  const location = window.location;
  console.log('<===protocol:', protocol);
  console.log('<===href:', href);
  console.log('<===location:', location);

  useEffect(() => {
    const launchParams = window.webOSDev.launchParams();
    console.log('<====launchParams===>', { launchParams });

    document.addEventListener('webOSLaunch', function (e) {
      const launchParams = window.webOSDev.launchParams();
      console.log('<====Inside launchParams===>', launchParams);
      const logs = {
        launchParams,
        location: window.location,
      };
      setValue(logs);

      // Do something
      console.log('<=========webOSLaunch=========>', e);
    });
    document.addEventListener('webOSRelaunch', function (e) {
      console.log('<=========webOSRelaunch=========>', e);
      const logs = {
        launchParams,
        location: window.location,
      };
      setValue(logs);
      // Do something
    });
  }, []);

  useEffect(() => {
    // Parse the query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Initialize an object to store the query parameters
    const paramsObj = {};

    // Iterate through the parameters and store them in the object
    for (const [key, value] of params.entries()) {
      paramsObj[key] = value;
    }

    console.log({ paramsObj });

    // Update state with the query parameters
  }, []);

  return (
    <div className="App">
      <h1>Simple Calculator App</h1>
      <h4 style={{ width: '500px' }}>{JSON.stringify(value)}</h4>
      <Calculator></Calculator>
      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
