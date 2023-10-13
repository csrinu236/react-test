import { useEffect } from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  console.log({ window });
  const protocol = window.location.protocol;
  console.log('<===protocol:', protocol);

  useEffect(() => {
    document.addEventListener('webOSLaunch', function (e) {
      // Do something
      console.log('<=========webOSLaunch=========>', e);
    });
    document.addEventListener('webOSRelaunch', function (e) {
      console.log('<=========webOSRelaunch=========>', e);

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
      <Calculator></Calculator>
    </div>
  );
}

export default App;
