import { useEffect, useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { Route, Routes } from 'react-router-dom';
import About from './components/About';
import { useNavigate } from 'react-router-dom';
import Contact from './components/Contact';
import Settings from './components/Settings';

function App() {
  const [value, setValue] = useState({});
  const navigate = useNavigate();
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
      const {
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      };
      setValue(logs);
      navigate(`/${launchParams.target}`);
      // Do something
      console.log('<=========webOSLaunch=========>', e);
    });

    document.addEventListener('webOSRelaunch', function (e) {
      console.log('<=========webOSRelaunch=========>', e);
      const {
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      } = e;
      const logs = {
        launchParams,
        location: window.location,
        e,
        // bubbles,
        // cancelable,
        // currentTarget,
        // composed,
        // defaultPrevented,
        detail,
        // eventPhase,
      };
      setValue(logs);
      // Do something
      navigate(`/${launchParams.target}`);
    });
  }, [navigate]);

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
      <h1>Simple Calculator App123</h1>
      <h4 style={{ width: '500px' }}>{JSON.stringify(value)}</h4>
      <Calculator></Calculator>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
